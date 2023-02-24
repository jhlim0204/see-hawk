import React, {Component} from 'react';
import {Card, Col, Row} from 'reactstrap';
import DisplayStarsSmall from '../../Utility/DisplayStarsSmall';

class ReviewDetail extends Component {
    constructor (props){
        super(props);
    }

    render() {
        return(
            <Card className='my-2 grey-card shadow-sm'>
                <Row>
                    <Col xs="1" className="mt-1">
                        <div className="mt-2 ms-4"> <img className="profile-pic" src="/assets/images/profile-pic.png"/> </div>
                    </Col>
                    <Col xs="11" className="text-start mt-auto mb-auto">
                        <h4 className="mt-2 mb-0">{this.props.userName}</h4>
                        <p className="mb-3"><DisplayStarsSmall activeCount={this.props.reviewStar}/></p>
                    </Col>
                </Row>
                <Row>
                    <Col xs="1">
                    </Col>
                    <Col xs="11">
                        <p>{this.props.reviewText}</p>
                    </Col>
                </Row>
            </Card>
        )
    }
}

export default ReviewDetail;