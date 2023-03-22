import { DataManager } from './DataManager.js';
/**
 * Class for managing hawkerCentre
 */
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
     * @param {number} hawkerCentreID - hawkerCentreID
     */
    static async retrieveHawkerCentreDetails(hawkerCentreId) {
       return await DataManager.retrieveHawkerCentreDetails(hawkerCentreId);
    }
    /**
     * Method to retrieve searchHawkerCentre
     * Calls DataManager.searchawkerCentre
     * @param {number} hawkerCentreID - hawkerCentreID
     */
    static async searchHawkerCentre(subString) {
       return await DataManager.searchHawkerCentre(subString);
    }
}
