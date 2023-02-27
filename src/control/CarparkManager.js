import { APIManager } from "./APIManager";
import haversine from 'haversine-distance'

export class CarparkManager {
    constructor(){
        throw Error('A static class cannot be instantiated.');
    }

    static async fetchNearbyCarpark(lat, lng){
        let carparks = await APIManager.fetchCarpark();
        carparks = carparks.filter((carpark) => {
            return (haversine({lat: carpark.lat, lng: carpark.lng}, {lat, lng}) <= 500)
        });
        carparks.sort((a,b) => b.availableSlots/b.totalSlots - a.availableSlots/a.totalSlots)
        return carparks;
    }
}