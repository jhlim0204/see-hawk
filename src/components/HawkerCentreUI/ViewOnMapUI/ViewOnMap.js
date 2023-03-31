import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import CarparkMarker from './CarparkMarker';
import HawkerMarker from './HawkerMarker';

/**
 * Class component representing a modal containing the map to view carparks or hawker centre locations.
 * Use case - UC09
 * @property {Object} props - A functionality provided by ReactJS representing the information passed by parent.
 * @property {Object} state - A functionality provided by ReactJS representing the current state of the component.
 * @author Lim Jun Hern
 */
class ViewOnMap extends Component {
    /**
     * Create a map component.
     * @param {Object} props - The props object that is passed to the component.
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
     * Toggles the view on map modal state.
     */
    toggleModal = () => {
        this.setState({ isModalOpen: !this.state.isModalOpen });
    };

    /**
     * Method to display the window containing more information.
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
