import proj4 from 'proj4';

/**
 * Class for managing the interaction with API
 */
export class APIManager {
    
    /**
     * Constructor for APIManager
     * @throws Will throw an error if this static class is instantiated
     */
    constructor() {
        throw Error('A static class cannot be instantiated.');
    }

    /**
     * Method to fetch dictionary containing attributes of hawker centres
     * @return {Object[]} The fetched list of hawker centres
     */
    static async fetchhawkerCentre() {
        const responseHawker = await fetch(
            'https://data.gov.sg/api/action/datastore_search?resource_id=b80cb643-a732-480d-86b5-e03957bc82aa&limit=500'
        );
        const jsonHawker = await responseHawker.json();
        let hawkerCentreList = jsonHawker.result.records;
        
        hawkerCentreList = hawkerCentreList.map((item) => {
            /* Extract name*/
            var regExp = /\(([^)]+)\)/;
            var match = regExp.exec(item.name);
            if (match) {
                item.name = match[1];
            }

            return {
                id: item.serial_no,
                name: item.name,
                cleaningStartDate1: item.q1_cleaningstartdate,
                cleaningEndDate1: item.q1_cleaningenddate,
                cleaningStartDate2: item.q2_cleaningstartdate,
                cleaningEndDate2: item.q2_cleaningenddate,
                cleaningStartDate3: item.q3_cleaningstartdate,
                cleaningEndDate3: item.q3_cleaningenddate,
                cleaningStartDate4: item.q4_cleaningstartdate,
                cleaningEndDate4: item.q4_cleaningenddate,
                latitude: Number(item.latitude_hc),
                longitude: Number(item.longitude_hc),
                photoURL: item.photourl,
                address: item.address_myenv,
                noOfStall: Number(item.no_of_food_stalls),
                description: item.description_myenv
            };
        });
        return hawkerCentreList;
    }

    /**
     * Method to transform coordinates from longitude to suitable formats for Google Places
     * @param {number} x - The x coordinate
     * @param {number} y - The y coordinate
     * @return {Object} The transformed coordinates
     */
    static transformCoords = (x, y) => {
        const svy21Coords = [x, y];
        // Define the EPSG:3414 and EPSG:4326 projections
        proj4.defs(
            'EPSG:3414',
            '+proj=tmerc +lat_0=1.366666666666667 +lon_0=103.8333333333333 +k=1 +x_0=28001.642 +y_0=38744.572 +ellps=WGS84 +datum=WGS84 +units=m +no_defs'
        );
        proj4.defs('EPSG:4326', '+proj=longlat +datum=WGS84 +no_defs');
        const wgs84Coords = proj4('EPSG:3414', 'EPSG:4326', svy21Coords);
        return wgs84Coords;
    };

    /**
     * Method to clean the address of the carpark
     * @param {string} address - The address to be cleaned
     * @return {string} The cleaned address
     */
    static cleanAddress(address) {
        address = address.replace(
            /\b[a-zA-Z]+\b/g,
            (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
        return address.replace('Blk', 'Block');
    }

    /**
     * Method to fetch carpark details from API
     * @return {Object[]} The fetched list of carparks
     */
    static async fetchCarpark() {
        const responseCarparkInfo = await fetch(
            'https://data.gov.sg/api/action/datastore_search?resource_id=139a3035-e624-4f56-b63f-89ae28d4ae4c&limit=5000'
        );
        const responseCarparkAvail = await fetch(
            'https://api.data.gov.sg/v1/transport/carpark-availability'
        );

        const jsonCarparkInfo = await responseCarparkInfo.json();
        const jsonCarparkAvail = await responseCarparkAvail.json();

        const carparkInfoData = jsonCarparkInfo.result.records;
        const carparkAvailData = jsonCarparkAvail.items[0].carpark_data;

        let combinedData = carparkInfoData.map((item) => {
            let matchedData = carparkAvailData.find(
                (carpark) => carpark.carpark_number === item.car_park_no
            );

            if (matchedData) {
                let lat, lng;
                [lng, lat] = APIManager.transformCoords(Number(item.x_coord), Number(item.y_coord));
                return {
                    carparkNumber: item.car_park_no,
                    address: APIManager.cleanAddress(item.address),
                    totalSlots: matchedData.carpark_info[0].total_lots,
                    availableSlots: matchedData.carpark_info[0].lots_available,
                    lat: lat,
                    lng: lng
                };
            } else {
                return null;
            }
        });

        combinedData = combinedData.filter(Boolean);
        return combinedData;
    }
}
