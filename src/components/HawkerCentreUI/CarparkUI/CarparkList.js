import React, {Component} from 'react';
import CarkparkDetail from './CarparkDetail';
import { CarfetchData,CarfetchDataWithQuery,fetchCarParkAvailability } from "../../../control/APIManager";
import proj4 from 'proj4';

// Define the EPSG:3414 and EPSG:4326 projections
proj4.defs("EPSG:3414","+proj=tmerc +lat_0=1.366666666666667 +lon_0=103.8333333333333 +k=1 +x_0=28001.642 +y_0=38744.572 +ellps=WGS84 +datum=WGS84 +units=m +no_defs");
proj4.defs("EPSG:4326","+proj=longlat +datum=WGS84 +no_defs");


class CarkparkList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data: [],
          svy21Coords: [28001.642, 38744.572]
        };
      }

      async componentDidMount() {
        const data = await CarfetchData();
        this.setState({ data });
      }

      transformCoords = (x, y) => {
        const svy21Coords = [x, y];
        const wgs84Coords = proj4("EPSG:3414", "EPSG:4326", svy21Coords);
        return wgs84Coords;
      };

      render() {
        return (
          <div>
            {this.state.data.map((record) => {
              const x = parseInt(record.x_coord);
              const y = parseInt(record.y_coord);
              const transformedCoords = this.transformCoords(x, y);
              return (
                <p key={record._id}>
                  {record.car_park_no} - Transformed Coordinates: {transformedCoords[0]}, {transformedCoords[1]}
                </p>
              );
            })}
          </div>
        );
      }
      

   
}

export default CarkparkList;
