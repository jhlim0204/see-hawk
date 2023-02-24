import { json } from "react-router-dom";
import {db, auth, provider} from './firebase.js'
import {getDoc,doc,updateDoc} from 'firebase/firestore'


export class FavouriteManager{
   
    static getFavourite(id){
        const docRef = doc(db,'Accounts',id);
        var acc;
        getDoc(docRef)
            .then((doc)=>{
                acc = doc.data();
            })
      
       fSet = Set();
        for (var i=0;i<acc.favList.length;i++){
            if (!fset.has(acc.favList[i])){
                fSet.prototype.add(acc.favList[i]);
            }   
      }
      return favSet;
    }

    static async addFavourite(id,hID){
        const docRef = doc(db,'Accounts',id);
        var favSet = this.getFavourite(id);
        if (!favSet.has(hID)){
            favSet.prototype.add(hID);
            var fList = Array.from(favSet);
            await updateDoc(docRef,{
                favList : fList
            })
            .then(() => {
                console.log("Succesfully added favourite");
            }) 
            .catch(() => {
                console.log("Error Adding favourite");
            })
            return true;
    }
    else return false;
}

    static async deleteFavourite(id,hID){
        const docRef = doc(db,'Accounts',id);
        let favSet = this.getFavourite(id);
        if (favSet.has(hID)){
            favSet.prototype.delete(hID);
            var fList = Array.from(favSet);
            await updateDoc(docRef,{
                favList : fList
            })
            .then(() => {
                console.log("Sucessfully deleted favourite");
            })
            .catch(() =>{
                console.log("Error deleting favourite");
            })
            return true;
        }
        else return false;
}
}