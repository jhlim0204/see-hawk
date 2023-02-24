import{db} from '../firebase.js';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export class ReviewManager{
    static async getReview(hawkerCentreId){
        let retrievedReviews
        const hawkerCentreRef = doc(db, 'HawkerCentre', hawkerCentreId)
        await getDoc(hawkerCentreRef)
             .then(async (hawkerCentre) =>{
                retrievedReviews = hawkerCentre.data().reviewList
             })
        return retrievedReviews;
    }

    static async addReview(hawkerCentreId, accountID, reviewStar, reviewText){
        let retrievedReviewList = await ReviewManager.getReview(hawkerCentreId)
        retrievedReviewList[accountID] = {reviewStar: reviewStar, reviewText: reviewText}
        const hawkerCentreRef = doc(db, 'HawkerCentre', hawkerCentreId)

        await updateDoc(hawkerCentreRef, {
            reviewList: retrievedReviewList
        })
        .then(() => {
            console.log("Document successfully updated!");
          })
          .catch((error) => {
            console.error("Error updating document: ", error);
          });
    }

    static async checkIfReviewIsMade(hawkerCentreId, accountID){
        let retrievedReviewList = await ReviewManager.getReview(hawkerCentreId)
        return (accountID in retrievedReviewList)
    }
}