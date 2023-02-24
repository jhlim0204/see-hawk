import {db} from './firebase.js'
import {getDoc, doc, updateDoc} from 'firebase/firestore'


export class FavouriteManager{
   
    static async getFavourite(accountName){
        const docRef = doc(db, 'Account', accountName);
        const acc = (await getDoc(docRef)).data;
        
        return acc.favList;
    }

    static async isFavourite(accountName, hawkerID){
        const docRef = doc(db, 'Account', accountName);
        const favouriteList = (await getDoc(docRef)).data();

        return hawkerID in favouriteList;
    }

    static async addFavourite(accountName, hawkerID){
        const docRef = doc(db, 'Account', accountName);
        await updateDoc(docRef, {
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
        await updateDoc(docRef, {
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