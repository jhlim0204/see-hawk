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
    

export class DataManager {
    constructor() {
        throw Error('A static class cannot be instantiated.');
    }
    static async getReview(hawkerCentreId) {
        const hawkerCentreRef = doc(db, 'HawkerCentre', hawkerCentreId);
        const hawkerCentre = await getDoc(hawkerCentreRef);
        if (hawkerCentre.exists()) {
            return hawkerCentre.data().reviewList;
        } else {
            console.log('No such document!');
            return false;
        }
    }

    static async addReview(hawkerCentreId, accountID, reviewStar, reviewText) {
        let retrievedReviewList = await DataManager.getReview(hawkerCentreId);
        console.log(retrievedReviewList);
        retrievedReviewList[accountID] = { reviewStar: reviewStar, reviewText: reviewText };
        const hawkerCentreRef = doc(db, 'HawkerCentre', hawkerCentreId);

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
    static async retrieveHawkerCentreDetails(hawkerCentreId) {
        // update firebase if needed
        DataManager.updateFireBaseHawkerCentreList();
        //Return hawkerCentre object with relevant attributes
        let retrievedHawkerCentre;
        const hawkerCentreRef = doc(db, 'HawkerCentre', hawkerCentreId);
        try {
            const hawkerCentre = await getDoc(hawkerCentreRef);
            retrievedHawkerCentre = hawkerCentre.data();
            delete retrievedHawkerCentre.reviewList;

            return retrievedHawkerCentre;
        } catch (error) {
            return null;
        }
    }

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

    static async checkIfIDExist(hawkerCentreID) {
        const hawkerCentreRef = doc(db, 'HawkerCentre', hawkerCentreID);
        const hawkerCentre = await getDoc(hawkerCentreRef);

        return hawkerCentre.exists();
    }

    static async updateTime() {
        const timeRef = doc(db, 'Time', 'updateTime');
        let previousTime;
        await setDoc(timeRef, {
            time: Date.now()
        });

        return previousTime;
    }

    static async shouldUpdate() {
        let currentTime = Date.now();
        const previousTimeRef = doc(db, 'Time', 'updateTime');
        const pTime = await getDoc(previousTimeRef);
        let previousUpdateTime = pTime.data().time;

        return previousUpdateTime + 604800000 <= currentTime;
    }

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