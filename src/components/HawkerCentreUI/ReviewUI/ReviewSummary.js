import React, {Component} from 'react';
import {Col, Row, Progress} from 'reactstrap';
import GiveReview from './GiveReview';
import StarsRating from 'react-star-rate';

class ReviewSummary extends Component {
    render() {
        return(
            <Row className="mb-3">
            <Col xs={8}>
                <div className="d-flex align-items-center">
                    <h3 className="me-3">Review Summary</h3><GiveReview/>
                </div>

                <div className="d-flex align-items-center">
                    <span className="me-2">5</span> 
                    <Col>
                        <Progress className="my-2" color="warning" value={100}/>
                    </Col>
                </div>
                <div className="d-flex align-items-center">
                    <span className="me-2">4</span> 
                    <Col>
                        <Progress className="my-2" color="warning" value={75}/>
                    </Col>
                </div>
                <div className="d-flex align-items-center">
                    <span className="me-2">3</span> 
                    <Col>
                        <Progress className="my-2" color="warning" value={50}/>
                    </Col>
                </div>
                <div className="d-flex align-items-center">
                    <span className="me-2">2</span> 
                    <Col>
                        <Progress className="my-2" color="warning" value={10}/>
                    </Col>
                </div>
                <div className="d-flex align-items-center">
                    <span className="me-2">1</span> 
                    <Col>
                        <Progress className="my-2" color="warning" value={10}/>
                    </Col>
                </div>
            </Col>
            <Col xs={4} className="text-center align-items-center">
                <h1 className="display-1 mb-0">4.5</h1>
                <StarsRating value={4.5} disabled={true}/>
                <p className='text-muted'>10000 reviews</p>
            </Col>
            </Row>
        )
    }
}

export default ReviewSummary;

