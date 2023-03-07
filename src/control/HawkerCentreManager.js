import { DataManager } from './DataManager.js';

export class HawkerCentreManager {
    constructor() {
        throw Error('A static class cannot be instantiated.');
    }

    static async retrieveHawkerCentreDetails(hawkerCentreId) {
       return await DataManager.retrieveHawkerCentreDetails(hawkerCentreId);
    }

    static async searchHawkerCentre(subString) {
       return await DataManager.searchHawkerCentre(subString);
    }
}
