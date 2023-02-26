import proj4 from 'proj4';

export class APIManager {
	static async fetchhawkerCentre() {
		const response = await fetch(
			"https://data.gov.sg/api/action/datastore_search?resource_id=b80cb643-a732-480d-86b5-e03957bc82aa"
		);
		const json = await response.json();
		return json.result.records;
	}

	static transformCoords = (x, y) => {
		const svy21Coords = [x, y];
		// Define the EPSG:3414 and EPSG:4326 projections
		proj4.defs("EPSG:3414", "+proj=tmerc +lat_0=1.366666666666667 +lon_0=103.8333333333333 +k=1 +x_0=28001.642 +y_0=38744.572 +ellps=WGS84 +datum=WGS84 +units=m +no_defs");
		proj4.defs("EPSG:4326", "+proj=longlat +datum=WGS84 +no_defs");
		const wgs84Coords = proj4("EPSG:3414", "EPSG:4326", svy21Coords);
		return wgs84Coords;
	}

	static async fetchCarpark() {
		const responseCarparkInfo = await fetch(
			"https://data.gov.sg/api/action/datastore_search?resource_id=139a3035-e624-4f56-b63f-89ae28d4ae4c&limit=5000"
		);
		const responseCarparkAvail = await fetch(
			"https://api.data.gov.sg/v1/transport/carpark-availability"
		);

		const jsonCarparkInfo = await responseCarparkInfo.json();
		const jsonCarparkAvail = await responseCarparkAvail.json();

		const carparkInfoData = jsonCarparkInfo.result.records;
		const carparkAvailData = jsonCarparkAvail.items[0].carpark_data;

		let combinedData = carparkInfoData.map(item => {
			let matchedData = carparkAvailData.find((carpark) => carpark.carpark_number === item.car_park_no)

			if (matchedData){
				let lat, lng;
				[lng, lat] = APIManager.transformCoords(Number(item.x_coord), Number(item.y_coord))
				return ({
					carparkNumber: item.car_park_no,
					address: item.address,
					totalSlots: matchedData.carpark_info[0].total_lots,
					availableSlots: matchedData.carpark_info[0].lots_available,
					lat: lat,
					lng: lng
				})
			}
		})

		combinedData = combinedData.filter( Boolean );
		return combinedData;
	}
}