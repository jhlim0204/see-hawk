import{ db } from '../firebase.js';
import { collection, getDocs, doc, setDoc, serverTimestamp, query, where, getDoc, updateDoc } from 'firebase/firestore';

export class HawkerCentreManager{
    static async retrieveHawkerCentreDetails(hawkerCentreId){
        // return hawkerCentre object with attributes:
        //name, type, noOfStall, address, reviewList, imageURL
        let retrievedHawkerCentre
        const hawkerCentreRef = doc(db, 'HawkerCentre', hawkerCentreId)
         await getDoc(hawkerCentreRef)
             .then(async (hawkerCentre) =>{
                retrievedHawkerCentre = {
                    name: hawkerCentre.data().name,
                    cleaningStartDate1: hawkerCentre.data().cleaningStartDate1,
                    cleaningEndDate1: hawkerCentre.data().cleaningEndDate1,
                    cleaningStartDate2:hawkerCentre.data().cleaningStartDate2,
                    cleaningEndDate2:hawkerCentre.data().cleaningEndDate2,
                    cleaningStartDate3:hawkerCentre.data().cleaningStartDate3,
                    cleaningEndDate3: hawkerCentre.data().cleaningEndDate3,
                    cleaningStartDate4:hawkerCentre.data().cleaningStartDate4,
                    cleaningEndDate4:hawkerCentre.data().cleaningEndDate4,
                    latitude:hawkerCentre.data().latitude,
                    longitude:hawkerCentre.data().longitude,
                    photoURL:hawkerCentre.data().photoURL,
                    address:hawkerCentre.data().address,
                    noOfStall:hawkerCentre.data().noOfStall,
                    description:hawkerCentre.data().description,
                    status:hawkerCentre.data().status
                }
             })

             return retrievedHawkerCentre;
    }

    static async searchHawkerCentre(subAddress){
        // get all the hawker centre where address contains subAddress
        // return array of hawkercentres with: id, name, address, imageURL
        const hawkerCentreRef = collection(db, 'HawkerCentre')
        const q = query(hawkerCentreRef, where("name", '!=', null))
        let returnList = []
        await getDocs(q)
        .then((snapshot)=>{
        snapshot.docs.forEach((doc)=>{
            if(doc.data().name.toUpperCase().trim().includes(subAddress.toUpperCase()) ||
            doc.data().address.toUpperCase().trim().includes(subAddress.toUpperCase())){
                returnList.push({
                    id:doc.id, 
                    name:doc.data().name, 
                    address: doc.data().address, 
                    url: doc.data().imageURL,
                    status: doc.data().status
                })
            }
        }) 
        })
        return returnList
    }

    static async checkIfIDExist(hawkerCentreID){
        const hawkerCentreRef = collection(db, 'HawkerCentre')
        let exist = 0;
        await getDocs(hawkerCentreRef)
            .then((snapshot)=>{
                snapshot.docs.forEach((doc)=>{
                    if(doc.id == hawkerCentreID){
                        exist = 1;
                    }
                })
                
            })
        return exist;
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
            if(exist == 1){
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