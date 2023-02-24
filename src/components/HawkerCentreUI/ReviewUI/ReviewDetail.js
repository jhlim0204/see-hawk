import React, {Component} from 'react';
import {Card, Col, Row} from 'reactstrap';
import DisplayStarsSmall from '../../Utility/DisplayStarsSmall';

class ReviewDetail extends Component {
    constructor (props){
        super(props);
    }

    render() {
        return(
            <Card className='mb-3 grey-card shadow-sm'>
                <Row>
                    <Col className="col-auto mt-1">
                        <div className="mt-2 ms-4"> <img className="profile-pic" src="/assets/images/profile-pic.png"/> </div>
                    </Col>
                    <Col xs="11" className="text-start mt-1">
                        <h5 className="mt-3 mb-0">{this.props.userName}</h5>
                        <p className='mt-2 mb-0'><DisplayStarsSmall activeCount={this.props.reviewStar}/></p>
                        <p>{this.props.reviewText}</p>
                    </Col>
                </Row>
            </Card>
        )
    }
}

export default ReviewDetail;