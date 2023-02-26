import{db} from '../firebase.js';
import{
    doc, getDoc, updateDoc, setDoc
} from 'firebase/firestore';//from"https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

export class ReviewManager{
    static async getReview(hawkerCentreId){
        const hawkerCentreRef = doc(db, 'HawkerCentre', hawkerCentreId);
        const hawkerCentre = await getDoc(hawkerCentreRef);
        if (hawkerCentre.exists()){
            return hawkerCentre.data().reviewList;
        } else {
            console.log("No such document!");
            return false;
        }
    }

    static async addReview(hawkerCentreId, accountID, reviewStar, reviewText){
        let retrievedReviewList = await ReviewManager.getReview(hawkerCentreId)
        console.log(retrievedReviewList)
        retrievedReviewList[accountID] = {reviewStar: reviewStar, reviewText: reviewText}
        const hawkerCentreRef = doc(db, 'HawkerCentre', hawkerCentreId)
        await updateDoc(hawkerCentreRef, {
            reviewList: retrievedReviewList
        })
        return true;
    }

    static calculateAverage(reviewList){
        if (Object.keys(reviewList).length == 0){
            return "Unrated"
        }

        let sumOfRating = 0;
        for (const userName in reviewList){
            sumOfRating += reviewList[userName].reviewStar;
        }
        return (sumOfRating / Object.keys(reviewList).length).toFixed(1);
    }

    static calculatePercentage(reviewList){

        let groupCount = [0, 0, 0, 0, 0];
        let groupPercentage = [0, 0, 0, 0, 0];

        reviewList = Object.values(reviewList)

        for (let i=0; i<5; i++){        
            groupCount[i] = reviewList.filter(review => {
                return review.reviewStar === i+1
            }).length
        }

        let maxCount = Math.max(...groupCount);

        for (let i=0; i<5; i++){
            groupPercentage[i] = (groupCount[i] / maxCount)*100
        }

        return groupPercentage;
    }
}
