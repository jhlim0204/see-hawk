import React, {Component} from 'react';
import ReviewDetail from "./ReviewUI/ReviewDetail";
import CarparkList from "./CarparkUI/CarparkList";
import {
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Row,
    Col
  } from 'reactstrap';
import ViewOnMap from './ViewOnMapUI/ViewOnMap';
import FavouriteToggle from './FavouriteToggle';
import ReviewPage from './ReviewUI/ReviewPage';
import { HawkerCentreManager } from '../../control/HawkerCentreManager';

class HawkerPage extends Component {
    constructor (props){
        super(props);

        this.state = {
            hawkerData: {
                name: "",
                cleaningStartDate1: "",
                cleaningEndDate1: "",
                cleaningStartDate2: "",
                cleaningEndDate2: "",
                cleaningStartDate3: "",
                cleaningEndDate3: "",
                cleaningStartDate4: "",
                cleaningEndDate4: "",
                latitude: "",
                longitude: "",
                photoURL: "",
                address: "",
                noOfStall: "",
                description: "",
                status: ""
            },
            currentActiveTab: "review"
        }
    }

    toggleTab = tab => {
        if (this.state.currentActiveTab !== tab) {
            this.setState({currentActiveTab: tab});
        }
    }

    async getHawkerCenterDetail(){
        let hawkerData = await HawkerCentreManager.retrieveHawkerCentreDetails("105")
        this.setState({hawkerData: hawkerData});
    }

    render() {
        return(
            <div className="background page-transition">
            <Row className="mb-3">
                <Col xs={3}>
                    <img 
                        src={this.state.hawkerData.photoURL}
                        className="img-thumbnail img-fluid border-1 shadow-sm float-left" 
                        alt="Hawker Centre"
                    />
                </Col>
                <Col xs={9} className="mt-auto mb-2 d-flex align-items-center">
                    <h1 className='me-auto fw-bold'>{this.state.hawkerData.name}</h1><FavouriteToggle/><ViewOnMap/>
                </Col>
            </Row>
            <div className="content rounded shadow-sm">
                <Row className="mt-2">
                    <Col xs={4} className="hawker-detail border-end">
                        <p><b>Address:</b> {this.state.hawkerData.address}</p>
                        <p><b>No. of Stalls:</b> {this.state.hawkerData.noOfStall}</p>
                        <p><b>Opening Hours:</b> 6:00 am - 9:00 pm</p>
                        <p><b>Closure Date:</b> {this.state.hawkerData.cleaningEndDate1}</p>
                    </Col>
                    <Col xs={8} className="mt-auto mb-auto">
                        <p className="lead mb-0">
                            {this.state.hawkerData.description}
                        </p>
                    </Col>
                </Row>

                    <Nav tabs className='my-4'>
                        <NavItem>
                            <NavLink role="button" className={this.state.currentActiveTab === 'review' && "active"} onClick={() => this.toggleTab("review")}>
                                <h5 className={this.state.currentActiveTab === 'review' ? "fw-bold" : "text-muted"}>Reviews</h5>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink role="button" className={this.state.currentActiveTab === 'carpark' && "active"} onClick={() => this.toggleTab("carpark")}>
                                <h5 className={this.state.currentActiveTab === 'carpark' ? "fw-bold" : "text-muted"}>Nearby Carparks</h5>
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.currentActiveTab}>
                        <TabPane tabId="review">
                            <ReviewPage/>
                        </TabPane>
                        <TabPane tabId="carpark">
                            <div className="d-flex align-items-center">
                                <h3>List of Nearby Carparks</h3>
                                <ViewOnMap carpark/>
                            </div>
                            <CarparkList/>
                        </TabPane>
                    </TabContent>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.getHawkerCenterDetail();
        document.title = "Hawker Centre - SeeHawk"
    }
}

export default HawkerPage;