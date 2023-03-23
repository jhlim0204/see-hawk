import { db } from '../firebase.js';
import { doc, 
    getDoc, 
    updateDoc, 
    setDoc, 
    arrayRemove, 
    arrayUnion,
    collection,
    getDocs,
    query,
    where} from 'firebase/firestore';
import { ReviewManager } from './ReviewManager.js';
import { APIManager } from './APIManager.js';
    
/**
 * Class for interacting with database
 */
export class DataManager {
    /**
     * Constructor for DataManager
     * @throw Will throw an error if this static class is instantiated
     */
    constructor() {
        throw Error('A static class cannot be instantiated.');
    }
    
    /**
     * Method to get the review of hawker centre through its ID
     * @param {string} hawkerCentreID - The ID of the hawker centre
     * @return {Object[] | boolean} If target hawker centre exists, the list of reviews is returned. Else false is returned.
     */
    static async getReview(hawkerCentreID) {
        const hawkerCentreRef = doc(db, 'HawkerCentre', hawkerCentreID);
        const hawkerCentre = await getDoc(hawkerCentreRef);
        if (hawkerCentre.exists()) {
            return hawkerCentre.data().reviewList;
        } else {
            console.log('No such document!');
            return false;
        }
    }

    /**
     * Method to add review to hawker centre
     * @param {string} hawkercentreID - The ID of the hawker centre
     * @param {string} accoundID - The ID of the account
     * @param {number} reviewStar - The numerical rating of the review
     * @param {string} reviewText - The text rating of the review
     * @return {boolean} Whether review is succesfully added
     */
    static async addReview(hawkerCentreID, accountID, reviewStar, reviewText) {
        let retrievedReviewList = await DataManager.getReview(hawkerCentreID);
        console.log(retrievedReviewList);
        retrievedReviewList[accountID] = { reviewStar: reviewStar, reviewText: reviewText };
        const hawkerCentreRef = doc(db, 'HawkerCentre', hawkerCentreID);

        try {
            await updateDoc(hawkerCentreRef, {
                reviewList: retrievedReviewList
            });
            return true;
        } catch (error) {
            console.log('Error adding review');
            return false;
        }
    }

    /**
     * Method to get favourites of an account
     * @param {string} accountName - The name of the account
     * @return {Object[]} The list of favourites of that account
     */
    static async getFavourite(accountName) {
        const docRef = doc(db, 'Account', accountName);
        const favouriteList = (await getDoc(docRef)).data().favList;

        const returnList = [];
        for (let favourite of favouriteList) {
            let tempFavouriteDetail = await DataManager.retrieveHawkerCentreDetails(
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
    }

    /**
     * Method to check if hawker centre is the favourite of an account
     * @param {string} accountName - The name of the account
     * @param {string} hawkerID- The ID of the hawker centre
     * @return {boolean} Whether the hawker centre is the favourite of the account
     */
    static async isFavourite(accountName, hawkerID) {
        if (!accountName) {
            return false;
        }

        const docRef = doc(db, 'Account', accountName);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const favouriteList = docSnap.data().favList;
            return favouriteList.includes(hawkerID);
        } else {
            return false;
        }
    }

    /**
     * Method to add favourite to an account
     * @param {string} accountName - The name of the account
     * @param {string} hawkerID- The ID of the hawker centre
     * @returns {boolean} Whether the favourite is succesfully added
     */
    static async addFavourite(accountName, hawkerID) {
        const docRef = doc(db, 'Account', accountName);
        const account = await getDoc(docRef);

        if (account.exists()) {
            await updateDoc(docRef, {
                favList: arrayUnion(hawkerID)
            })
                .then(() => {
                    return true;
                })
                .catch(() => {
                    return false;
                });
        } else {
            await setDoc(docRef, {
                favList: arrayUnion(hawkerID)
            })
                .then(() => {
                    return true;
                })
                .catch(() => {
                    return false;
                });
        }
    }

    /**
     * Method to delete favourite from an account
     * @param {string} accountName - The name of the account
     * @param {string} hawkerID- The ID of the hawker centre
     * @returns {boolean} Whether the favourite is succesfully removed
     */
    static async deleteFavourite(accountName, hawkerID) {
        const docRef = doc(db, 'Account', accountName);
        await updateDoc(docRef, {
            favList: arrayRemove(hawkerID)
        })
            .then(() => {
                return true;
            })
            .catch(() => {
                return false;
            });
    }

    /**
     * Method to retrive the details of hawker centre
     * @param {string} hawkerCentreID - The ID of the hawker centre
     * @return {Object} The details of the hawker centre
     */
    static async retrieveHawkerCentreDetails(hawkerCentreID) {
        // update firebase if needed
        DataManager.updateFireBaseHawkerCentreList();
        //Return hawkerCentre object with relevant attributes
        let retrievedHawkerCentre;
        const hawkerCentreRef = doc(db, 'HawkerCentre', hawkerCentreID);
        try {
            const hawkerCentre = await getDoc(hawkerCentreRef);
            retrievedHawkerCentre = hawkerCentre.data();
            delete retrievedHawkerCentre.reviewList;

            return retrievedHawkerCentre;
        } catch (error) {
            return null;
        }
    }

    /**
     * Method to search for hawker centre
     * @param {string} subString - The sub string to be searched
     * @return {Object[]} The matched hawker centres
     */
    static async searchHawkerCentre(subString) {
        // update firebase if needed
        DataManager.updateFireBaseHawkerCentreList();
        //Get all the hawker centre where name contains subString
        const hawkerCentreRef = collection(db, 'HawkerCentre');
        const q = query(hawkerCentreRef, where('name', '!=', null));
        let returnList = [];

        //Firebase doesn't support query by substring. Since our database is not very large we decided to fetch all documents and filter them, as a workaround.

        const hawkerCentreList = await getDocs(q);

        hawkerCentreList.forEach((doc) => {
            if (
                doc
                    .data()
                    .name.toUpperCase()
                    .replace(/\s/g, '')
                    .includes(subString.toUpperCase().replace(/\s/g, ''))
            ) {
                returnList.push({
                    id: doc.id,
                    name: doc.data().name,
                    address: doc.data().address,
                    noOfStall: doc.data().noOfStall,
                    photoURL: doc.data().photoURL
                });
            }
        });

        for (const hawkerCentre of returnList) {
            let reviewList = await DataManager.getReview(hawkerCentre.id);
            let averageRating = ReviewManager.calculateAverage(reviewList);
            hawkerCentre.averageRating = averageRating;
        }

        return returnList;
    }

    /**
     * Method to check if the hawker centre exists in the database
     * @param {string} hawkerCentreID - The ID of the hawker centre
     * @return {boolean} Whether the hawker centre exists
     */
    static async checkIfIDExist(hawkerCentreID) {
        const hawkerCentreRef = doc(db, 'HawkerCentre', hawkerCentreID);
        const hawkerCentre = await getDoc(hawkerCentreRef);

        return hawkerCentre.exists();
    }

    /**
     * Method to update time
     */
    static async updateTime() {
        const timeRef = doc(db, 'Time', 'updateTime');
        await setDoc(timeRef, {
            time: Date.now()
        });
    }

    /**
     * Method to check if database should be updated
     * @return {boolean} Whether the database is last updated more than 7 days ago
     */
    static async shouldUpdate() {
        let currentTime = Date.now();
        const previousTimeRef = doc(db, 'Time', 'updateTime');
        const pTime = await getDoc(previousTimeRef);
        let previousUpdateTime = pTime.data().time;

        return previousUpdateTime + 604800000 <= currentTime;
    }

    /**
     * Method to update firestore hawker centre database
     */
    static async updateFireBaseHawkerCentreList() {
        if (await DataManager.shouldUpdate()) {
            await DataManager.updateTime();

            const updatedHawkerCentreList = await APIManager.fetchhawkerCentre();
            for (const hawkerCentre of updatedHawkerCentreList) {
                var exist = await DataManager.checkIfIDExist(hawkerCentre.id);

                if (exist) {
                    var hawkerCentreRef = doc(db, 'HawkerCentre', hawkerCentre.id);
                    await updateDoc(hawkerCentreRef, hawkerCentre);
                } else {
                    await setDoc(doc(db, 'HawkerCentre', hawkerCentre.id), {
                        ...hawkerCentre,
                        reviewList: {}
                    });
                }
            }
        }
    }
}