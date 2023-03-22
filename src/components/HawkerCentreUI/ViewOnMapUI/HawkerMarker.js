import { Marker } from '@react-google-maps/api';
import React, { Component } from 'react';

/**
 * Class to create component that marks hawker centre on map
 */
class HawkerMarker extends Component {
    /**
     * Method to render html components in React
     */
    render() {
        return (
            <>
                <Marker position={this.props.position} clickable={false} />
            </>
        );
    }
}

export default HawkerMarker;
