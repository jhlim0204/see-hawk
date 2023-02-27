import { Marker, InfoWindow } from '@react-google-maps/api';
import React, { Component } from 'react';

class CarparkMarker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            infoWindowOpen: false
        };
    }

    openInfoWindow = () => {
        this.setState({ infoWindowOpen: !this.state.infoWindowOpen });
    };

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
