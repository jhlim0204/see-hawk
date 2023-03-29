import { DataManager } from './DataManager.js';
import { ReviewManager } from './ReviewManager.js';

/**
 * Class for managing hawker centre
 */
export class HawkerCentreManager {
    /**
     * Constructor for HawkerCentreManager
     * @throws Will throw an error is this static class is instantiated
     */
    constructor() {
        throw Error('A static class cannot be instantiated.');
    }

    /**
     * Method to retrieve the details of the hawker centre
     * @param {string} hawkerCentreID - The ID of the hawker centre
     * @return {Object} The details of the hawker centre
     */
    static async retrieveHawkerCentreDetails(hawkerCentreID) {
        return await DataManager.retrieveHawkerCentreDetails(hawkerCentreID);
    }

    /**
     * Method to search hawker centre and calculate the average rating
     * @param {string} subString - The sub string to be searched
     * @return {Object[]} The matched hawker centres with calculated average rating
     */
    static async searchHawkerCentre(subString) {
        let returnList = await DataManager.searchHawkerCentre(subString);
        for (const hawkerCentre of returnList) {
            let reviewList = await DataManager.getReview(hawkerCentre.id);
            let averageRating = ReviewManager.calculateAverage(reviewList);
            hawkerCentre.averageRating = averageRating;
        }
        return returnList;
    }
}
