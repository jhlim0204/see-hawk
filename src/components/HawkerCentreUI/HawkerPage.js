/* View Component*/
import React, { Component } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane, Row, Col } from 'reactstrap';
import CarparkPage from './CarparkUI/CarparkPage';
import ViewOnMap from './ViewOnMapUI/ViewOnMap';
import FavouriteToggle from './FavouriteToggle';
import ReviewPage from './ReviewUI/ReviewPage';
import { withRouter } from '../Utility/withRouter';

/* Placeholder Component*/
import HawkerPagePlaceholder from '../PlaceholderUI/HawkerPagePlaceholder';

/* Controller*/
import { HawkerCentreManager } from '../../control/HawkerCentreManager';

/**
 * Class component representing the hawker centre page.
 * Use case - UC05
 * @property {Object} props - A functionality provided by ReactJS representing the information passed by parent.
 * @property {Object} state - A functionality provided by ReactJS representing the current state of the component.
 * @author Lim Jun Hern
 */
class HawkerPage extends Component {
    /**
     * Create a hawker page component.
     * @param {Object} props - The props object that is passed to the component.
     */
    constructor(props) {
        super(props);

        this.state = {
            hawkerData: {
                name: '',
                cleaningStartDate1: '',
                cleaningEndDate1: '',
                cleaningStartDate2: '',
                cleaningEndDate2: '',
                cleaningStartDate3: '',
                cleaningEndDate3: '',
                cleaningStartDate4: '',
                cleaningEndDate4: '',
                latitude: '',
                longitude: '',
                photoURL: '',
                address: '',
                noOfStall: '',
                description: '',
                status: ''
            },
            isLoading: true,
            currentActiveTab: 'review'
        };
    }

    /**
     * Method to toggle the review or carpark tab.
     * @param {string} tab - The string containing either "review" or "carpark".
     */
    toggleTab = (tab) => {
        if (this.state.currentActiveTab !== tab) {
            this.setState({ currentActiveTab: tab });
        }
    };

    /**
     * Method to get hawker centre detail.
     */
    async getHawkerCenterDetail() {
        this.setState({ isLoading: true });
        let hawkerData = await HawkerCentreManager.retrieveHawkerCentreDetails(
            this.props.params.id
        );
        if (hawkerData === null) {
            this.props.navigate('/');
        } else {
            this.setState(
                { hawkerData: hawkerData, isLoading: false },
                () => (document.title = this.state.hawkerData.name + ' - SeeHawk')
            );
        }
    }

    /**
     * ReactJS method to render the component.
     */
    render() {
        let hawkerData = this.state.hawkerData;

        if (this.state.isLoading) {
            return <HawkerPagePlaceholder />;
        } else {
            return (
                <div className='background page-transition'>
                    <Row className='mb-3'>
                        <Col xs={3}>
                            <img
                                src={hawkerData.photoURL}
                                className='img-thumbnail img-fluid border-1 shadow-sm float-left'
                                alt='Hawker Centre'
                            />
                        </Col>
                        <Col xs={9} className='mt-auto mb-2'>
                            <Row>
                                <Col className='px-0'>
                                    <h1
                                        className='me-auto'
                                        style={{ fontFamily: 'Open Sans', fontWeight: 700 }}
                                    >
                                        {hawkerData.name}
                                    </h1>
                                </Col>
                                <Col className='col-auto ps-0 mt-2'>
                                    <FavouriteToggle />
                                    <ViewOnMap
                                        lat={hawkerData.latitude}
                                        lng={hawkerData.longitude}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <div className='content rounded shadow-sm'>
                        <Row className='mt-2'>
                            <Col xs={12} lg={5} className='hawker-detail border-end-lg'>
                                <p>
                                    <b>Address:</b> {hawkerData.address}
                                </p>
                                <p>
                                    <b>No. of Stalls:</b> {hawkerData.noOfStall}
                                </p>
                                <p>
                                    <b>Opening Hours:</b> 6:00 am - 9:00 pm
                                </p>
                                <p className='mb-0'>
                                    <b>Closure Date:</b>
                                </p>
                                <ul>
                                    <li>
                                        {hawkerData.cleaningStartDate1} -{' '}
                                        {hawkerData.cleaningEndDate1}
                                    </li>
                                    <li>
                                        {hawkerData.cleaningStartDate2} -{' '}
                                        {hawkerData.cleaningEndDate2}
                                    </li>
                                    <li>
                                        {hawkerData.cleaningStartDate3} -{' '}
                                        {hawkerData.cleaningEndDate3}
                                    </li>
                                    <li>
                                        {hawkerData.cleaningStartDate4} -{' '}
                                        {hawkerData.cleaningEndDate4}
                                    </li>
                                </ul>
                            </Col>
                            <Col
                                xs={12}
                                lg={7}
                                className='pt-3 pt-lg-0 mt-auto mb-auto border-top border-top-lg-0'
                            >
                                <p className='lead mb-0'>{hawkerData.description}</p>
                            </Col>
                        </Row>
                        <Nav tabs className='my-4'>
                            <NavItem>
                                <NavLink
                                    role='button'
                                    className={
                                        this.state.currentActiveTab === 'review' ? 'active' : ''
                                    }
                                    onClick={() => this.toggleTab('review')}
                                >
                                    <h5
                                        className={
                                            this.state.currentActiveTab === 'review'
                                                ? 'fw-bold'
                                                : 'text-muted'
                                        }
                                    >
                                        Reviews
                                    </h5>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    role='button'
                                    className={
                                        this.state.currentActiveTab === 'carpark' ? 'active' : ''
                                    }
                                    onClick={() => this.toggleTab('carpark')}
                                >
                                    <h5
                                        className={
                                            this.state.currentActiveTab === 'carpark'
                                                ? 'fw-bold'
                                                : 'text-muted'
                                        }
                                    >
                                        Nearby Carparks
                                    </h5>
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.currentActiveTab}>
                            <TabPane tabId='review'>
                                <ReviewPage />
                            </TabPane>
                            <TabPane tabId='carpark'>
                                <CarparkPage lat={hawkerData.latitude} lng={hawkerData.longitude} />
                            </TabPane>
                        </TabContent>
                    </div>
                </div>
            );
        }
    }

    /**
     * ReactJS method that will be called when the component has mounted.
     */
    componentDidMount() {
        this.getHawkerCenterDetail();
        document.title = 'Hawker Centre - SeeHawk';
    }
}

export default withRouter(HawkerPage);
