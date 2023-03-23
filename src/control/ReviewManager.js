//import { db } from '../firebase.js';
//import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { DataManager } from './DataManager.js';

export class ReviewManager {
    /**
     * Constructor for ReviewManager
     * @throw Willl throw an error if this static class  is instantiated
     */
    constructor() {
        throw Error('A static class cannot be instantiated.');
    }
    /**
     * Method to get hawkerCentre review
     * Calls DataManager.getReview
     * @param {number} hawkerCentreId - hawkerCentreId
     */
    static async getReview(hawkerCentreId) {
        return await DataManager.getReview(hawkerCentreId);
    }
     /**
     * Method to add hawkerCentre review
     * Calls DataManager.addReview
     * @param {number} hawkerCentreId - hawkerCentreId
     * @param {number} accountID - accountID
     * @param {number} reviewStar - reviewStar
     * @param {string} reviewText - reviewText
     */
    static async addReview(hawkerCentreId, accountID, reviewStar, reviewText) {
       return await DataManager.addReview(hawkerCentreId, accountID, reviewStar, reviewText);
    }
    /**
     * Method to calculate average rating of a hawkerCentre
     * @param {Object[]} reviewList - reviewList of hawkerCentre
     * @returns {number} - returns calculated average rating if there is any rating, else 'unrated' is returned
     */
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
    /**
     * Method to calculate percentage of reviewStar
     * @param {Object[]} reviewList -  reviewList of hawkerCentre
     * @return {number[]} - return array of calculated percentage of reviewStar
     */
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
