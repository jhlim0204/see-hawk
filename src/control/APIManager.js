// Start of HDB Carpark Information
//https://data.gov.sg/dataset/hdb-carpark-information?view_id=398e65ae-e2cb-4312-8651-6e65d6f19ed1&resource_id=139a3035-e624-4f56-b63f-89ae28d4ae4c

export class APIManager{
  static async fetchhawkerCentre(){
    const response = await fetch(
      "https://data.gov.sg/api/action/datastore_search?resource_id=b80cb643-a732-480d-86b5-e03957bc82aa&limit=118"
    );
    const json = await response.json();
    return json.result.records;
  }
  static async CarfetchData() {
    const response = await fetch(
      "https://data.gov.sg/api/action/datastore_search?resource_id=139a3035-e624-4f56-b63f-89ae28d4ae4c&limit=5"
    );
    const json = await response.json();
    return json.result.records;
  }
static async CarfetchDataWithQuery() {
    const resource_id = "139a3035-e624-4f56-b63f-89ae28d4ae4c";
    const query = "yishun";
    const response = await fetch(
        `https://data.gov.sg/api/action/datastore_search?resource_id=${resource_id}&q=${query}`
    );
    const json = await response.json();
    return json.result.records;
}  
//end of HDB Carpark Information
//Carpark Availability
//https://data.gov.sg/dataset/carpark-availability?view_id=f89b0f89-4760-45a0-af61-30b1e27d0fc3&resource_id=4f4a57d1-e904-4326-b83e-dae99358edf9
//Temp
static async fetchCarParkAvailability() {
    const response = await fetch(
      "https://api.data.gov.sg/v1/transport/carpark-availability"
    );
    const json = await response.json();
    return json.items[0].carpark_data;
  }
  
  
}
