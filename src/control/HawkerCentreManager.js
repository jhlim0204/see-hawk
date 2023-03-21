import { DataManager } from './DataManager.js';

export class HawkerCentreManager {
    /**
     * Constructor for HawkerCentreManager
     * @throws Will throw an error is this static class is istantiated
     */
    constructor() {
        throw Error('A static class cannot be instantiated.');
    }
    /**
     * Method to retrieve HawkerCentreDetails
     * Calls DataManager.retrieveHawkerCentreDetails
     * @param {Number} - hawkerCentreID
     */
    static async retrieveHawkerCentreDetails(hawkerCentreId) {
       return await DataManager.retrieveHawkerCentreDetails(hawkerCentreId);
    }
    /**
     * Method to retrieve searchHawkerCentre
     * Calls DataManager.searchawkerCentre
     * @param {Number} - hawkerCentreID
     */
    static async searchHawkerCentre(subString) {
       return await DataManager.searchHawkerCentre(subString);
    }
}
