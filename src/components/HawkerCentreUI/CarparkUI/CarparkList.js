import React, {Component} from 'react';
import CarkparkDetail from './CarparkDetail';
import { CarfetchData,CarfetchDataWithQuery,fetchCarParkAvailability } from "../../Utility/APIManager";

class CarkparkList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data: []
        };
      }

      async componentDidMount() {
        const data = await fetchCarParkAvailability();
        this.setState({ data });
      }


   render() {
    return (
    //   <div>
    //     {this.state.data.map((record) => (
    //       <p key={record._id}>{record.address}</p>
    //     ))}
    //   </div>
    <div>
        {this.state.data.map((carpark) => (
          <p key={carpark.carpark_number}>{carpark.carpark_number} - Available Lots: {carpark.carpark_info[0].lots_available}</p>
        ))}
      </div>

      
    );
  }

   
}

export default CarkparkList;
