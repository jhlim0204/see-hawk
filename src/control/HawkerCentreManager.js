import{ db } from '../firebase.js';//'./firebase.js'//
import { collection, getDocs, doc, setDoc, 
    serverTimestamp, query, where, getDoc, updateDoc } from 'firebase/firestore';//'https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js';//
import { ReviewManager } from './ReviewManager.js';
import{APIManager} from './APIManager.js';

export class HawkerCentreManager{
    static async retrieveHawkerCentreDetails(hawkerCentreId){
        // update firebase if needed
        this.updateFireBaseHawkerCentreList()
        //Return hawkerCentre object with relevant attributes
        let retrievedHawkerCentre;
        const hawkerCentreRef = doc(db, 'HawkerCentre', hawkerCentreId);
        const hawkerCentre = await getDoc(hawkerCentreRef);
        retrievedHawkerCentre = hawkerCentre.data();
        delete retrievedHawkerCentre.reviewList;
        
        return retrievedHawkerCentre;
    }

    static async searchHawkerCentre(subString){
        // update firebase if needed
        this.updateFireBaseHawkerCentreList()
        //Get all the hawker centre where address contains subString or name contains subString
        const hawkerCentreRef = collection(db, 'HawkerCentre')
        const q = query(hawkerCentreRef, where("name", '!=', null))
        let returnList = []

        //Firebase doesn't support query by substring. Since our database is not very large we decided to fetch all documents and filter them, as a workaround.
        
        const hawkerCentreList = await getDocs(q);

        hawkerCentreList.forEach((doc)=>{
            if(doc.data().name.toUpperCase().replace(/\s/g,'').includes(subString.toUpperCase().replace(/\s/g,'')) ||
               doc.data().address.toUpperCase().replace(/\s/g,'').includes(subString.toUpperCase().replace(/\s/g,''))){

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
             
        console.log(previousTime)
        return previousTime 
    }

    static async shouldUpdate(){
        
        let currentTime = Date.now()
        const previousTimeRef = doc(db, 'Time', 'updateTime')
        const pTime = await getDoc(previousTimeRef);
        let previousUpdateTime = pTime.data().time;
        if((previousUpdateTime + 604800000)> currentTime){
            //console.log("No update")
            return false;
        }
        else{
            //console.log("Need Update")
            return true;
        }
        
    }

    static async updateFireBaseHawkerCentreList(){
        
        
        if(await this.shouldUpdate()){
            await this.updateTime()
            const updatedHawkerCentreArray = await APIManager.fetchhawkerCentre();
            for(var i = 0;i<updatedHawkerCentreArray.length;i++){
            var exist = await this.checkIfIDExist(updatedHawkerCentreArray[i].serial_no)
            if(exist){
                //console.log("If", i)
                var hawkerCentreRef = doc(db, "HawkerCentre", updatedHawkerCentreArray[i].serial_no)
                await updateDoc(hawkerCentreRef, {
            
                name: updatedHawkerCentreArray[i].name,
                cleaningStartDate1: updatedHawkerCentreArray[i].q1_cleaningstartdate,
                cleaningEndDate1: updatedHawkerCentreArray[i].q1_cleaningenddate,
                cleaningStartDate2:updatedHawkerCentreArray[i].q2_cleaningstartdate,
                cleaningEndDate2:updatedHawkerCentreArray[i].q2_cleaningenddate,
                cleaningStartDate3:updatedHawkerCentreArray[i].q3_cleaningstartdate,
                cleaningEndDate3: updatedHawkerCentreArray[i].q3_cleaningenddate,
                cleaningStartDate4:updatedHawkerCentreArray[i].q4_cleaningstartdate,
                cleaningEndDate4:updatedHawkerCentreArray[i].q4_cleaningenddate,
                latitude:updatedHawkerCentreArray[i].latitude_hc,
                longitude:updatedHawkerCentreArray[i].longitude_hc,
                photoURL:updatedHawkerCentreArray[i].photourl,
                address:updatedHawkerCentreArray[i].address_myenv,
                noOfStall:updatedHawkerCentreArray[i].no_of_food_stalls,
                description:updatedHawkerCentreArray[i].description_myenv,
                status:updatedHawkerCentreArray[i].status
            
            /*
                name: updatedHawkerCentreArray[i].name,
                address: updatedHawkerCentreArray[i].address,
            */
                });
            }
            else{
                //console.log("Else", i)
                await setDoc(doc(db, "HawkerCentre", updatedHawkerCentreArray[i].serial_no), {
            
            
                name: updatedHawkerCentreArray[i].name,
                cleaningStartDate1: updatedHawkerCentreArray[i].q1_cleaningstartdate,
                cleaningEndDate1: updatedHawkerCentreArray[i].q1_cleaningenddate,
                cleaningStartDate2:updatedHawkerCentreArray[i].q2_cleaningstartdate,
                cleaningEndDate2:updatedHawkerCentreArray[i].q2_cleaningenddate,
                cleaningStartDate3:updatedHawkerCentreArray[i].q3_cleaningstartdate,
                cleaningEndDate3: updatedHawkerCentreArray[i].q3_cleaningenddate,
                cleaningStartDate4:updatedHawkerCentreArray[i].q4_cleaningstartdate,
                cleaningEndDate4:updatedHawkerCentreArray[i].q4_cleaningenddate,
                latitude:updatedHawkerCentreArray[i].latitude_hc,
                longitude:updatedHawkerCentreArray[i].longitude_hc,
                photoURL:updatedHawkerCentreArray[i].photourl,
                address:updatedHawkerCentreArray[i].address_myenv,
                noOfStall:updatedHawkerCentreArray[i].no_of_food_stalls,
                description:updatedHawkerCentreArray[i].description_myenv,
                status:updatedHawkerCentreArray[i].status,
                reviewList: {}
            
            /*
                name: updatedHawkerCentreArray[i].name,
                address: updatedHawkerCentreArray[i].address,
                reviewList: []
            */
              });
            }
        }
        }
        
    }
}