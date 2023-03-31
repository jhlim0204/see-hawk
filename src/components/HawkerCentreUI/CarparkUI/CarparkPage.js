/* View Component*/
import React, { Component } from 'react';
import Lottie from 'lottie-react';
import CarparkDetail from './CarparkDetail';
import ViewOnMap from '../ViewOnMapUI/ViewOnMap';
import RunningLoadingAnimation from '../../Animation/runningLoading.json';

/* Controller*/
import { CarparkManager } from '../../../control/CarparkManager';

/**
 * Class component representing the carpark page.
 * Use case - UC08
 * @property {Object} props - A functionality provided by ReactJS representing the information passed by parent.
 * @property {Object} state - A functionality provided by ReactJS representing the current state of the component.
 * @author Lim Jun Hern
 */
class CarparkPage extends Component {
    /**
     * Create a carpark page component.
     * @param {Object} props - The props object that is passed to the component.
     */
    constructor(props) {
        super(props);
        this.state = {
            carparkList: [],
            isLoading: true,
            updatedTime: 'Not available',
            updatedTimeKey: Math.random()
        };
    }

    /**
     * Method to fetch carparks near to selected hawker centre.
     */
    fetchNearbyCarpark = async () => {
        const carparkList = await CarparkManager.fetchNearbyCarpark(this.props.lat, this.props.lng);
        const dateString = new Date(Date.now())
            .toLocaleString('en-SG', { timeZone: 'Asia/Singapore' })
            .toUpperCase();
        this.setState({
            carparkList: carparkList,
            isLoading: false,
            updatedTime: dateString,
            updatedTimeKey: Math.random()
        });
    };

    /**
     * ReactJS method to render the component.
     */
    render() {
        if (this.state.isLoading) {
            return (
                <div className='mt-5 pt-5 page-transition d-flex align-items-center justify-content-center'>
                    <Lottie
                        className='mt-2'
                        animationData={RunningLoadingAnimation}
                        style={{ height: 200 }}
                    />
                </div>
            );
        } else {
            return (
                <>
                    <div className='d-flex align-items-center'>
                        <h3>List of Nearby Carparks</h3>
                        <ViewOnMap
                            lat={this.props.lat}
                            lng={this.props.lng}
                            carparkList={this.state.carparkList}
                            carpark
                        />
                        <p
                            key={this.state.updatedTimeKey}
                            className='text-muted ms-auto fst-italic mt-1 updated-date'
                        >
                            Last updated: {this.state.updatedTime}
                        </p>
                    </div>
                    <div>
                        {this.state.carparkList.length === 0 ? (
                            <h5 className='fst-italic'>No nearby carpark available</h5>
                        ) : (
                            this.state.carparkList.map((carpark) => (
                                <CarparkDetail
                                    key={carpark.carparkNumber}
                                    number={carpark.carparkNumber}
                                    address={carpark.address}
                                    totalSlots={carpark.totalSlots}
                                    availableSlots={carpark.availableSlots}
                                />
                            ))
                        )}
                    </div>
                </>
            );
        }
    }

    /**
     * ReactJS method that will be called when the component has mounted.
     */
    componentDidMount() {
        this.fetchNearbyCarpark();
        setInterval(this.fetchNearbyCarpark, 60001);
    }
}

export default CarparkPage;
