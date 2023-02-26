import{ db } from '../firebase.js';
import { collection, getDocs, doc, setDoc, 
    query, where, getDoc, updateDoc } from 'firebase/firestore';
import { ReviewManager } from './ReviewManager.js';
import{APIManager} from './APIManager.js';

export class HawkerCentreManager{
    constructor(){
        throw Error('A static class cannot be instantiated.');
    }
    
    static async retrieveHawkerCentreDetails(hawkerCentreId){
        // update firebase if needed
        HawkerCentreManager.updateFireBaseHawkerCentreList()
        //Return hawkerCentre object with relevant attributes
        let retrievedHawkerCentre;
        const hawkerCentreRef = doc(db, 'HawkerCentre', hawkerCentreId);
        try {
            const hawkerCentre = await getDoc(hawkerCentreRef);
            retrievedHawkerCentre = hawkerCentre.data();
            delete retrievedHawkerCentre.reviewList;
            
            return retrievedHawkerCentre;
        } catch (error) {
            return null;
        }
    }

    static async searchHawkerCentre(subString){
        // update firebase if needed
        HawkerCentreManager.updateFireBaseHawkerCentreList()
        //Get all the hawker centre where address contains subString or name contains subString
        const hawkerCentreRef = collection(db, 'HawkerCentre')
        const q = query(hawkerCentreRef, where("name", '!=', null))
        let returnList = []

        //Firebase doesn't support query by substring. Since our database is not very large we decided to fetch all documents and filter them, as a workaround.
        
        const hawkerCentreList = await getDocs(q);

        hawkerCentreList.forEach((doc)=>{
            if(doc.data().name.toUpperCase().replace(/\s/g,'').includes(subString.toUpperCase().replace(/\s/g,''))){
                returnList.push({
                    id: doc.id,
                    name: doc.data().name, 
                    address: doc.data().address,
                    noOfStall: doc.data().noOfStall,
                    photoURL: doc.data().photoURL
                })
               }
        })

        for (const hawkerCentre of returnList){
            let reviewList = await ReviewManager.getReview(hawkerCentre.id);
            let averageRating = ReviewManager.calculateAverage(reviewList);
            hawkerCentre.averageRating = averageRating;
        }

        return returnList
    }

    static async checkIfIDExist(hawkerCentreID){
        const hawkerCentreRef = doc(db, "HawkerCentre", hawkerCentreID)
        const hawkerCentre = await getDoc(hawkerCentreRef);

        return hawkerCentre.exists();
    }

    static async updateTime(){
        const timeRef = doc(db, 'Time', 'updateTime')
        let previousTime
        await setDoc(timeRef,{
            time: Date.now()
        })

        return previousTime 
    }

    static async shouldUpdate(){
        let currentTime = Date.now()
        const previousTimeRef = doc(db, 'Time', 'updateTime')
        const pTime = await getDoc(previousTimeRef);
        let previousUpdateTime = pTime.data().time;

        return ((previousUpdateTime + 604800000) <= currentTime);
    }

    static async updateFireBaseHawkerCentreList(){
        
        if(await HawkerCentreManager.shouldUpdate()){
            await HawkerCentreManager.updateTime();

            const updatedHawkerCentreArray = await APIManager.fetchhawkerCentre();
            for(var i = 0; i < updatedHawkerCentreArray.length; i++){
                var exist = await HawkerCentreManager.checkIfIDExist(updatedHawkerCentreArray[i].id)

                if(exist){
                    var hawkerCentreRef = doc(db, "HawkerCentre", updatedHawkerCentreArray[i].id)
                    await updateDoc(hawkerCentreRef, updatedHawkerCentreArray[i]);
                }
                else{
                    await setDoc(doc(db, "HawkerCentre", updatedHawkerCentreArray[i].id), {
                        ...updatedHawkerCentreArray[i],
                        reviewList: {}
                });
                }
            }
        }
    }
}