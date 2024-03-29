import { Marker } from '@react-google-maps/api';
import React, { Component } from 'react';

/**
 * Class component representing the marker for hawker centre on map.
 * Use case - UC09
 * @author Lim Jun Hern
 */
class HawkerMarker extends Component {
    /**
     * ReactJS method to render the component.
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
