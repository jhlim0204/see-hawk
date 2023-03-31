import { DataManager } from './DataManager.js';

/**
 * Class for managing reviews
 * Use case - UC05, UC07
 * @author Oh Ding Ang
 */
export class ReviewManager {
    /**
     * Constructor for ReviewManager
     * @throws Will throw an error if this static class is instantiated
     */
    constructor() {
        throw Error('A static class cannot be instantiated.');
    }

    /**
     * Method to get reviews from hawker centre
     * @param {string} hawkerCentreID - The ID of the hawker centre
     * @return {Object[] | boolean} If target hawker centre exists, the list of reviews is returned. Else false is returned.
     */
    static async getReview(hawkerCentreID) {
        return await DataManager.getReview(hawkerCentreID);
    }

    /**
     * Method to add review to hawker centre
     * @param {string} hawkerCentreID - The ID of the hawker centre
     * @param {string} accountID - The ID of the account
     * @param {number} reviewStar - The numerical rating of review
     * @param {string} reviewText - The text rating of review
     * @return {boolean} Whether the review is succesfully added
     */
    static async addReview(hawkerCentreID, accountID, reviewStar, reviewText) {
        return await DataManager.addReview(hawkerCentreID, accountID, reviewStar, reviewText);
    }

    /**
     * Method to calculate average rating of a hawker centre
     * @param {Object[]} reviewList - The list of review of the hawker centre
     * @returns {number|string} Calculated average rating if there is any rating, else 'unrated' is returned
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
     * Method to calculate percentage of review stars
     * @param {Object[]} reviewList -  The list of review of the hawker centre
     * @return {number[]} Array of calculated percentage of review stars
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
