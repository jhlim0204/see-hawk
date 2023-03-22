import { APIManager } from './APIManager';
import haversine from 'haversine-distance';
/**
 * Class for managing carpark
 */
export class CarparkManager {
    /**
     * Constructor for CarparkManager
     * @throw Will throw an error if this static class is instantiated
     */
    constructor() {
        throw Error('A static class cannot be instantiated.');
    }
    /**
     * Method to fetch nearby Carparks dictionary and sort them according to availbility
     * @param {Number} latitude - latitude
     * @param {Number} longitude - longitude
     * @return {Object[]} carparks - returns fetched list of carpark
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
