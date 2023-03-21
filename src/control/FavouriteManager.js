//import { db } from '../firebase.js';
//import { getDoc, doc, setDoc, arrayRemove, arrayUnion, updateDoc } from 'firebase/firestore';
//import { HawkerCentreManager } from './HawkerCentreManager.js';
import { DataManager } from './DataManager.js'; 
export class FavouriteManager {
    /**
     * Constructor for FavouriteManager
     * @throws Will throw an error if this static class is instantiated
     */
    constructor() {
        throw Error('A static class cannot be instantiated.');
    }
    /**
     * Method to get favourite from an account
     * Calls DatabaseManager.getFavourite
     * @param {String} - accountName
     */
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
    /**
     * Method to check if is favourite
     * Calls DataManager.isFavourite
     * @param {String} - accountName
     * @param {Number} - hawlkerID
     */
    static async isFavourite(accountName, hawkerID) {
       return await DataManager.isFavourite(accountName, hawkerID);
    }
    /**
     * Method to add favourite
     * Calls DataManager.addFavourite
     * @param {String} - accountName
     * @param {Number} - hawkerID
     */
    static async addFavourite(accountName, hawkerID) {
       return await DataManager.addFavourite(accountName, hawkerID);
    }

    /**
     * Method to delete favourite
     * Calls DataManager.deleteFavourite
     * @param {String} - accountName
     * @param {Number} - hawkerID
     */
    static async deleteFavourite(accountName, hawkerID) {
        return await DataManager.deleteFavourite(accountName, hawkerID);
    }
    
   
}
