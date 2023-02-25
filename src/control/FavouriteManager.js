import {db} from '../firebase.js'
import {getDoc, doc, setDoc, arrayRemove, arrayUnion} from 'firebase/firestore'
import { HawkerCentreManager } from './HawkerCentreManager.js';

export class FavouriteManager{
    static async getFavourite(accountName){
        const docRef = doc(db, 'Account', accountName);
        const favouriteList = (await getDoc(docRef)).data().favList;
        
        const returnList = [];
        for (let favourite of favouriteList){
            let tempFavouriteDetail = await HawkerCentreManager.retrieveHawkerCentreDetails(favourite);
            let favouriteDetail = (({ name, address, photoURL, noOfStall }) => ({ name, address, photoURL, noOfStall }))(tempFavouriteDetail);
            favouriteDetail.id = favourite;
            returnList.push(favouriteDetail);
        }

        return returnList;
    }

    static async isFavourite(accountName, hawkerID){
        const docRef = doc(db, 'Account', accountName);
        const favouriteList = (await getDoc(docRef)).data().favList;
        return (favouriteList.includes(hawkerID));
    }

    static async addFavourite(accountName, hawkerID){
        const docRef = doc(db, 'Account', accountName);
        await setDoc(docRef, {
            favList: arrayUnion(hawkerID)
        })
        .then(() => {
            console.log("Succesfully added favourite");
            return true;
        }) 
        .catch(() => {
            console.log("Error Adding favourite");
            return false;
        })
    }

    static async deleteFavourite(accountName, hawkerID){
        const docRef = doc(db, 'Account', accountName);
        await setDoc(docRef, {
            favList: arrayRemove(hawkerID)
        })
        .then(() => {
            console.log("Sucessfully deleted favourite");
            return true;
        })
        .catch(() =>{
            console.log("Error deleting favourite");
            return false;
        })
    }
}