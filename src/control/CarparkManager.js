import { APIManager } from './APIManager';
import haversine from 'haversine-distance';

export class CarparkManager {
    /**
     * Constructor for CarparkManager
     * @throw Will throw an error if this static class is instantiated
     */
    constructor() {
        throw Error('A static class cannot be instantiated.');
    }
    /**
     * Method to fetch nearby Carparks and sort them according to availbility
     * @param {Number} - latitude
     * @param {Number} - longitude
     * @return {carpark[]} 
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
