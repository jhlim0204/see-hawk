//import { db } from '../firebase.js';
//import { getDoc, doc, setDoc, arrayRemove, arrayUnion, updateDoc } from 'firebase/firestore';
//import { HawkerCentreManager } from './HawkerCentreManager.js';
import { DataManager } from './DataManager.js';

export class FavouriteManager {
    constructor() {
        throw Error('A static class cannot be instantiated.');
    }

    static async getFavourite(accountName) {
        /*
        const docRef = doc(db, 'Account', accountName);
        const favouriteList = (await getDoc(docRef)).data().favList;

        const returnList = [];
        for (let favourite of favouriteList) {
            let tempFavouriteDetail = await HawkerCentreManager.retrieveHawkerCentreDetails(
                favourite
            );
            let favouriteDetail = (({ name, address, photoURL, noOfStall }) => ({
                name,
                address,
                photoURL,
                noOfStall
            }))(tempFavouriteDetail);
            favouriteDetail.id = favourite;
            returnList.push(favouriteDetail);
        }

        return returnList;
        */
       return await DataManager.getFavourite(accountName);
    }

    static async isFavourite(accountName, hawkerID) {
       return await DataManager.isFavourite(accountName, hawkerID);
    }

    static async addFavourite(accountName, hawkerID) {
       return await DataManager.addFavourite(accountName, hawkerID);
    }

    static async deleteFavourite(accountName, hawkerID) {
        return await DataManager.deleteFavourite(accountName, hawkerID);
    }
    
   
}
