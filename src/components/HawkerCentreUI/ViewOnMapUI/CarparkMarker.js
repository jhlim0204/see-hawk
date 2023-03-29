import { Marker, InfoWindow } from '@react-google-maps/api';
import React, { Component } from 'react';

/**
 * Class component representing the marker for carpark on map.
 * @property {Object} props - A functionality provided by ReactJS representing the information passed by parent.
 * @property {Object} state - A functionality provided by ReactJS representing the current state of the component.
 */
class CarparkMarker extends Component {
    /**
     * Create a carpark marker component.
     * @param {Object} props - The props object that is passed to the component.
     */
    constructor(props) {
        super(props);

        this.state = {
            infoWindowOpen: false
        };
    }

    /**
     * Method to display the window containing more carpark information.
     */
    openInfoWindow = () => {
        this.setState({ infoWindowOpen: !this.state.infoWindowOpen });
    };

    /**
     * ReactJS method to render the component.
     */
    render() {
        return (
            <>
                <Marker position={this.props.position} onClick={this.openInfoWindow} />
                {this.state.infoWindowOpen && (
                    <InfoWindow position={this.props.position} onCloseClick={this.openInfoWindow}>
                        <>
                            <h6 className='text-start'>{this.props.number}</h6>
                            <p className='mb-0 text-start'>
                                <b>Address:</b> {this.props.address}
                            </p>
                            <p className='mb-0 text-start'>
                                <b>Available Slot:</b> {this.props.availableSlots}
                            </p>
                        </>
                    </InfoWindow>
                )}
            </>
        );
    }
}

export default CarparkMarker;
