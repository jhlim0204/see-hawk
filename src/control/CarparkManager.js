import { APIManager } from './APIManager';
import haversine from 'haversine-distance';

/**
 * Class for managing carpark information
 */
export class CarparkManager {
    /**
     * Constructor for CarparkManager
     * @throws Will throw an error if this static class is instantiated
     */
    constructor() {
        throw Error('A static class cannot be instantiated.');
    }

    /**
     * Method to fetch nearby carparks and sort them according to availability
     * @param {number} lat - The latitude
     * @param {number} lng - The longitude
     * @return {Object[]}  returns sorted list of carpark
     */
    static async fetchNearbyCarpark(lat, lng) {
        let carparks = await APIManager.fetchCarpark();
        carparks = carparks.filter((carpark) => {
            return haversine({ lat: carpark.lat, lng: carpark.lng }, { lat, lng }) <= 500;
        });
        carparks.sort((a, b) => b.availableSlots / b.totalSlots - a.availableSlots / a.totalSlots);
        return carparks;
    }
}