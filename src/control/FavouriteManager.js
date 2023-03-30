import { DataManager } from './DataManager.js';

/**
 * Class for managing favourites
 * @author Oh Ding Ang
 */
export class FavouriteManager {
    /**
     * Constructor for FavouriteManager
     * @throws Will throw an error if this static class is instantiated
     */
    constructor() {
        throw Error('A static class cannot be instantiated.');
    }

    /**
     * Method to get the list of favourites from an account
     * @param {string} accountName - The account name
     * @return {Object[]} The list of favourites for that account
     */
    static async getFavourite(accountName) {
        return await DataManager.getFavourite(accountName);
    }

    /**
     * Method to check if the hawker centre is the favourite of the account
     * @param {string} accountName - The account name
     * @param {string} hawkerID - The ID of the hawker centre
     * @return {boolean} Whether the hawker centre is the favourite of the account
     */
    static async isFavourite(accountName, hawkerID) {
        return await DataManager.isFavourite(accountName, hawkerID);
    }

    /**
     * Method to add favourite
     * @param {string} accountName - The account name
     * @param {string} hawkerID - The ID of the hawker centre
     * @returns {boolean} Whether the favourite is succesfully added
     */
    static async addFavourite(accountName, hawkerID) {
        return await DataManager.addFavourite(accountName, hawkerID);
    }

    /**
     * Method to delete favourite
     * @param {string} accountName - The account name
     * @param {string} hawkerID - The ID of the hawker centre
     * @returns {boolean} Whether the favourite is succesfully removed
     */
    static async deleteFavourite(accountName, hawkerID) {
        return await DataManager.deleteFavourite(accountName, hawkerID);
    }
}
