import { Marker } from '@react-google-maps/api';
import React, { Component } from 'react';

class HawkerMarker extends Component {
    render() {
        return (
            <>
                <Marker position={this.props.position} clickable={false} />
            </>
        );
    }
}

export default HawkerMarker;
