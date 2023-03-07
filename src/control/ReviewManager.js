//import { db } from '../firebase.js';
//import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { DataManager } from './DataManager.js';

export class ReviewManager {
    constructor() {
        throw Error('A static class cannot be instantiated.');
    }

    static async getReview(hawkerCentreId) {
        return await DataManager.getReview(hawkerCentreId);
    }

    static async addReview(hawkerCentreId, accountID, reviewStar, reviewText) {
       return await DataManager.addReview(hawkerCentreId, accountID, reviewStar, reviewText);
    }

    static calculateAverage(reviewList) {
        if (Object.keys(reviewList).length === 0) {
            return 'Unrated';
        }

        let sumOfRating = 0;
        for (const userName in reviewList) {
            sumOfRating += reviewList[userName].reviewStar;
        }
        return (sumOfRating / Object.keys(reviewList).length).toFixed(1);
    }

    static calculatePercentage(reviewList) {
        let groupCount = [0, 0, 0, 0, 0];
        let groupPercentage = [0, 0, 0, 0, 0];

        reviewList = Object.values(reviewList);

        for (let i = 0; i < 5; i++) {
            groupCount[i] = reviewList.filter((review) => {
                return review.reviewStar === i + 1;
            }).length;
        }

        let maxCount = Math.max(...groupCount);

        for (let i = 0; i < 5; i++) {
            groupPercentage[i] = (groupCount[i] / maxCount) * 100;
        }

        return groupPercentage;
    }
}
