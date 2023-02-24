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
import ReviewSummary from './ReviewUI/ReviewSummary';

class HawkerPage extends Component {
    constructor (props){
        super(props);

        this.state = {
            currentActiveTab: "review"
        }
    }

    toggleTab = tab => {
        if (this.state.currentActiveTab !== tab) {
            this.setState({currentActiveTab: tab});
        }
    }

    render() {
        return(
            <div className="background page-transition">
            <Row className="mb-3">
                <Col xs={3}>
                    <img 
                        src="http://www.nea.gov.sg/images/default-source/Hawker-Centres-Division/resize_1267438077554.jpg" 
                        className="img-thumbnail img-fluid border-1 shadow-sm float-left" 
                        alt="Hawker Centre"
                    />
                </Col>
                <Col xs={9} className="mt-auto mb-2 d-flex align-items-center">
                    <h1 className='me-auto' style={{fontFamily: 'Open Sans', fontWeight: 700}}>Boon Lay Hawker Centre</h1><FavouriteToggle/><ViewOnMap/>
                </Col>
            </Row>
            <div className="content rounded shadow-sm">
                <Row className="mt-2">
                    <Col xs={4} className="hawker-detail border-end">
                        <p><b>Address:</b> 221A Boon Lay Pl, Singapore 641221</p>
                        <p><b>Type:</b> Market and Hawker Centre</p>
                        <p><b>No. of Stalls:</b> 33</p>
                        <p><b>Opening Hours:</b> 6:00 am - 9:00 pm</p>
                        <p><b>Closure Date:</b> 11 Dec 2023</p>
                    </Col>
                    <Col xs={8} className="mt-auto mb-auto">
                        <p className="lead mb-0">
                            Also known as Hong Lim Food Centre, the hawker centre is famous for dishes such as Bak Ku Teh, Crayfish Hor Fun, Curry Chicken Noodles, Fish Head Bee Hoon etc. Expect to see long queues at different stalls, especially during lunch hours. Apart from the 103 cooked food stalls, the hawker centre also has 40 market stalls to serve the needs of the residents in the vicinity.
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
                            <ReviewSummary/>
                            <ReviewDetail/>
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
        document.title = "Hawker Centre - SeeHawk"
    }
}

export default HawkerPage;