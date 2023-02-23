import React, {Component} from 'react';
import {Card, Col, Row} from 'reactstrap';
import DisplayStarsSmall from '../../Utility/DisplayStarsSmall';

class ReviewDetail extends Component {
    render() {
        return(
            <Card className='my-2 grey-card shadow-sm'>
                <Row>
                    <Col xs="1" className="mt-1">
                        <div className="mt-2 ms-4"> <img className="profile-pic" src="/assets/images/profile-pic.png"/> </div>
                    </Col>
                    <Col xs="11" className="text-start mt-auto mb-auto">
                        <h4 className="mt-2 mb-0">Mukesh Kumar</h4>
                        <p className="mb-3"><DisplayStarsSmall activeCount={4}/></p>
                    </Col>
                </Row>
                <Row>
                    <Col xs="1">
                    </Col>
                    <Col xs="11">
                        <p>If you really enjoy spending your vacation 'on water' or would like to try something new and exciting for the first time.</p>
                    </Col>
                </Row>
            </Card>
        )
    }
}

export default ReviewDetail;