import { DataManager } from './DataManager.js';

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
     * Method to search hawker centre
     * @param {string} subString - The sub string to be searched
     * @return {Object[]} The matched hawker centres
     */
    static async searchHawkerCentre(subString) {
       return await DataManager.searchHawkerCentre(subString);
    }
}