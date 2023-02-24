import{ db } from '../firebase.js';
import { collection, getDocs, doc, setDoc, serverTimestamp, query, where, getDoc, updateDoc } from 'firebase/firestore';

export class HawkerCentreManager{
    static async retrieveHawkerCentreDetails(hawkerCentreId){
        //Return hawkerCentre object with relevant attributes
        let retrievedHawkerCentre;
        const hawkerCentreRef = doc(db, 'HawkerCentre', hawkerCentreId);
        const hawkerCentre = await getDoc(hawkerCentreRef);
        retrievedHawkerCentre = hawkerCentre.data();
        delete retrievedHawkerCentre.reviewList;
        
        return retrievedHawkerCentre;
    }

    static async searchHawkerCentre(subString){
        //Get all the hawker centre where address contains subString or name contains subString
        const hawkerCentreRef = collection(db, 'HawkerCentre')
        const q = query(hawkerCentreRef, where("name", '!=', null))
        let returnList = []

        //Firebase doesn't support query by substring. Since our database is not very large we decided to fetch all documents and filter them, as a workaround.
        
        const hawkerCentreList = await getDocs(q);
        hawkerCentreList.forEach((doc)=>{
            if(doc.data().name.toUpperCase().trim().includes(subString.toUpperCase()) ||
               doc.data().address.toUpperCase().trim().includes(subString.toUpperCase())){
                returnList.push({
                    id:doc.id,
                    name:doc.data().name, 
                    address: doc.data().address, 
                    url: doc.data().imageURL,
                    status: doc.data().status
                })
               }
        })
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
            time: serverTimestamp()
        })
             
        console.log(previousTime)
        return previousTime 
    }

    static async updateFireBaseHawkerCentreList(updatedHawkerCentreArray){
        //console.log("In updateFireBaseHawkerCentre")
        await this.updateTime()
        for(var i = 0;i<updatedHawkerCentreArray.length;i++){
            var exist = await this.checkIfIDExist(updatedHawkerCentreArray[i].id)
            if(exist){
                //console.log("If", i)
                var hawkerCentreRef = doc(db, "HawkerCentre", updatedHawkerCentreArray[i].id)
                await updateDoc(hawkerCentreRef, {
            
                name: updatedHawkerCentreArray[i].name,
                cleaningStartDate1: updatedHawkerCentreArray[i].cleaningStartDate1,
                cleaningEndDate1: updatedHawkerCentreArray[i].cleaningEndDate1,
                cleaningStartDate2:updatedHawkerCentreArray[i].cleaningStartDate2,
                cleaningEndDate2:updatedHawkerCentreArray[i].cleaningEndDate2,
                cleaningStartDate3:updatedHawkerCentreArray[i].cleaningStartDate3,
                cleaningEndDate3: updatedHawkerCentreArray[i].cleaningEndDate3,
                cleaningStartDate4:updatedHawkerCentreArray[i].cleaningStartDate4,
                cleaningEndDate4:updatedHawkerCentreArray[i].cleaningEndDate4,
                latitude:updatedHawkerCentreArray[i].latitude,
                longitude:updatedHawkerCentreArray[i].longitude,
                photoURL:updatedHawkerCentreArray[i].photoURL,
                address:updatedHawkerCentreArray[i].address,
                noOfStall:updatedHawkerCentreArray[i].noOfStall,
                description:updatedHawkerCentreArray[i].description,
                status:updatedHawkerCentreArray[i].status
            
            /*
                name: updatedHawkerCentreArray[i].name,
                address: updatedHawkerCentreArray[i].address,
            */
                });
            }
            else{
                //console.log("Else", i)
                await setDoc(doc(db, "HawkerCentre", updatedHawkerCentreArray[i].id), {
            
            
                name: updatedHawkerCentreArray[i].name,
                cleaningStartDate1: updatedHawkerCentreArray[i].cleaningStartDate1,
                cleaningEndDate1: updatedHawkerCentreArray[i].cleaningEndDate1,
                cleaningStartDate2:updatedHawkerCentreArray[i].cleaningStartDate2,
                cleaningEndDate2:updatedHawkerCentreArray[i].cleaningEndDate2,
                cleaningStartDate3:updatedHawkerCentreArray[i].cleaningStartDate3,
                cleaningEndDate3: updatedHawkerCentreArray[i].cleaningEndDate3,
                cleaningStartDate4:updatedHawkerCentreArray[i].cleaningStartDate4,
                cleaningEndDate4:updatedHawkerCentreArray[i].cleaningEndDate4,
                latitude:updatedHawkerCentreArray[i].latitude,
                longitude:updatedHawkerCentreArray[i].longitude,
                photoURL:updatedHawkerCentreArray[i].photoURL,
                address:updatedHawkerCentreArray[i].address,
                noOfStall:updatedHawkerCentreArray[i].noOfStall,
                description:updatedHawkerCentreArray[i].description,
                status:updatedHawkerCentreArray[i].status,
                reviewList: []
            
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