import{db} from './firebase.js';
import{HawkerCentreManager} from './HawkerCentreManager.js';
import{
    doc,arrayUnion, arrayRemove,
    getDoc, updateDoc, 
} from"https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

export class ReviewManager{
    static async getReview(hawkerCentreId){
        // return hawkerCentre object with attributes:
        //name, type, noOfStall, address, reviewList, imageURL
        let retrievedReviews
        const hawkerCentreRef = doc(db, 'HawkerCentre', hawkerCentreId)
         await getDoc(hawkerCentreRef)
             .then(async (hawkerCentre) =>{
                retrievedReviews = hawkerCentre.data().reviewList
             })

             return retrievedReviews;
    }
    static async deleteReview(hawkerCentreId, accountID){
        let retrievedHawkerCentre = await HawkerCentreManager.retrieveHawkerCentreDetails(hawkerCentreId)
        let removeReview
        let removeSuccessful = 0;
        //console.log(retrievedHawkerCentre.reviewList)
        for(var i = 0;i<retrievedHawkerCentre.reviewList.length;i++){
            if(retrievedHawkerCentre.reviewList[i].reviewOwner == accountID){
                removeReview = retrievedHawkerCentre.reviewList[i]
                const hawkerCentreRef = doc(db, 'HawkerCentre', hawkerCentreId)
                await updateDoc(hawkerCentreRef, {
                    reviewList: arrayRemove(removeReview)
                 })
                 removeSuccessful = 1
                break
            }
        }
        //console.log("removeSuccessful=", removeSuccessful)
    }

    static async addReview(hawkerCentreId, accountID, rs,rt){
        // create a dictionary with (reviewOwner, reviewStar, reviewtext) 
        //and add into HawkerCentre.reviewList
        const hawkerCentreRef = doc(db, 'HawkerCentre', hawkerCentreId)
        var tempDict = {
            reviewOwner: accountID,
            //review: 
            //{
                reviewStar: rs,
                reviewText: rt
            //}
            
        }
        await updateDoc(hawkerCentreRef, {
            reviewList: arrayUnion(tempDict) 
        })
        .then(() => {
            console.log("Document successfully updated!");
          })
          .catch((error) => {
            console.error("Error updating document: ", error);
          });
    }


    static async checkIfReviewIsMade(hawkerCentreId, accountID){
        let retrievedHawkerCentre = await HawkerCentreManager.retrieveHawkerCentreDetails(hawkerCentreId)
        let hasReview = 0;
        for(var i = 0;i<retrievedHawkerCentre.reviewList.length;i++){
            if(retrievedHawkerCentre.reviewList[i].reviewOwner == accountID){
                hasReview = 1
                break
            }
        }
        return hasReview
    }


    static async addEditReview(hawkerCentreId, accountId, reviewStar, reviewText){
        var reviewMade = await this.checkIfReviewIsMade(hawkerCentreId, accountId)
        if(reviewMade == 1){
            //delete 
            await this.deleteReview(hawkerCentreId, accountId)
        }
        // remake the review
        await this.addReview(hawkerCentreId, accountId, reviewStar,reviewText)
    }
    
}