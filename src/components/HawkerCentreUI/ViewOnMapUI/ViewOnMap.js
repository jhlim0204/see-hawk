import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody} from 'reactstrap';
import { GoogleMap, LoadScript} from '@react-google-maps/api';
import CarparkMarker from './CarparkMarker';
import HawkerMarker from './HawkerMarker';

class ViewOnMap extends Component {
    constructor (props) {
        super (props);

        this.state = {
            isModalOpen: false,
            infoWindowOpen: false,
            center: {
                lat: Number(this.props.lat), 
                lng: Number(this.props.lng)
            },
            zoom: 13
        }

    }

    toggleModal = () => {
        this.setState({isModalOpen: !this.state.isModalOpen});
    }

    openInfoWindow = () => {
        this.setState({infoWindowOpen: !this.state.infoWindowOpen});
    }

    render() {
        return(
            <>
            <Button color="primary" onClick={this.toggleModal} outline={this.props.carpark} size={this.props.carpark && "sm"} className="ms-2"><i className="bi bi-map-fill"></i> View on Map</Button>
            <Modal className="text-center modal-xl" toggle={this.toggleModal} isOpen={this.state.isModalOpen}>
            <ModalHeader toggle={this.toggleModal}>View on Map</ModalHeader>
            <ModalBody className="px-0 py-0">
                <div style={{ height: '80vh', width: '100%' }}>
                <LoadScript
                    googleMapsApiKey=""
                >
                <GoogleMap
                    mapContainerStyle= {{
                        width: '100%',
                        height: '100%'
                      }}
                    center={this.state.center}
                    zoom={this.state.zoom}
                    clickableIcons={false}
                >
                    { /* Child components, such as markers, info windows, etc. */ }
                    {this.props.carpark ?
                        this.props.carparkList.map((carpark)=> 
                            <CarparkMarker 
                                position= { {lat:carpark.lat, lng:carpark.lng} }
                                address = {carpark.address}
                                availableSlots = {carpark.availableSlots}
                            />
                        )
                    :
                        <HawkerMarker position={
                            {
                                lat: Number(this.props.lat),
                                lng: Number(this.props.lng)
                            }
                        }/>
                    }
                </GoogleMap>
                </LoadScript>
                </div>
            </ModalBody>
            </Modal>
            </>
        )
    }
}

export default ViewOnMap;