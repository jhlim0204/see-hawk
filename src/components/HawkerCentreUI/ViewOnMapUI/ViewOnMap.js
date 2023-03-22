import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import CarparkMarker from './CarparkMarker';
import HawkerMarker from './HawkerMarker';

/**
 * Class to create a map component to view carpark and hawker centre locations
 */
class ViewOnMap extends Component {
    /**
     * Props - property functionality in React to pass data between functions/classes
     */
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
            infoWindowOpen: false,
            center: {
                lat: Number(this.props.lat),
                lng: Number(this.props.lng)
            },
            zoom: this.props.carpark ? 15 : 13
        };
    }

    /**
     * Method that opens and closes the modal window (React functionality)
     */
    toggleModal = () => {
        this.setState({ isModalOpen: !this.state.isModalOpen });
    };

    /**
     * Method to display the window containing more information
     * @param {void}
     * @return {void}
     */
    openInfoWindow = () => {
        this.setState({ infoWindowOpen: !this.state.infoWindowOpen });
    };

    /**
     * Method to render html components in React
     */
    render() {
        return (
            <>
                <Button
                    color='primary'
                    onClick={this.toggleModal}
                    outline={this.props.carpark}
                    size={this.props.carpark && 'sm'}
                    className='ms-2'
                >
                    <i className='bi bi-map-fill' /> View on Map
                </Button>
                <Modal
                    className='text-center modal-xl'
                    toggle={this.toggleModal}
                    isOpen={this.state.isModalOpen}
                >
                    <ModalHeader toggle={this.toggleModal}>View on Map</ModalHeader>
                    <ModalBody className='px-0 py-0'>
                        <div style={{ height: '80vh', width: '100%' }}>
                            <LoadScript googleMapsApiKey='AIzaSyBLYQy-AtpqQjTyBRO1Wu6lxmORkwNihGI'>
                                <GoogleMap
                                    mapContainerStyle={{
                                        width: '100%',
                                        height: '100%'
                                    }}
                                    options={{
                                        mapTypeControlOptions: { mapTypeIds: [] },
                                        streetViewControl: false
                                    }}
                                    center={this.state.center}
                                    zoom={this.state.zoom}
                                    clickableIcons={false}
                                >
                                    {/* Child components, such as markers, info windows, etc. */}
                                    {this.props.carpark ? (
                                        this.props.carparkList.map((carpark) => (
                                            <CarparkMarker
                                                key={carpark.carparkNumber}
                                                number={carpark.carparkNumber}
                                                position={{ lat: carpark.lat, lng: carpark.lng }}
                                                address={carpark.address}
                                                availableSlots={carpark.availableSlots}
                                            />
                                        ))
                                    ) : (
                                        <HawkerMarker
                                            position={{
                                                lat: Number(this.props.lat),
                                                lng: Number(this.props.lng)
                                            }}
                                        />
                                    )}
                                </GoogleMap>
                            </LoadScript>
                        </div>
                    </ModalBody>
                </Modal>
            </>
        );
    }
}

export default ViewOnMap;
