import React, { Component } from 'react';
import { Card, Col, Row } from 'reactstrap';
import DisplayStarsSmall from '../../Utility/DisplayStarsSmall';
import Avatar from 'react-avatar';

/**
 * Class component representing the card contining the details of review.
 * @author Lim Jun Hern
 */
class ReviewDetail extends Component {
    /**
     * ReactJS method to render the component.
     */
    render() {
        return (
            <Card className='mb-3 grey-card shadow-sm'>
                <Row>
                    <Col xs='1' className='mt-1 pe-0'>
                        <div className='mt-3 ms-4'>
                            {' '}
                            <Avatar
                                name={this.props.userName}
                                size='43'
                                textSizeRatio={2}
                                round
                            />{' '}
                        </div>
                    </Col>
                    <Col xs='11' className='text-start mt-1 ps-0'>
                        <h5 className='mt-3 mb-0'>{this.props.userName}</h5>
                        <p className='mt-1 mb-0'>
                            <DisplayStarsSmall activeCount={this.props.reviewStar} />
                        </p>
                    </Col>
                </Row>
                <Row>
                    <Col xs='1' className='mt-1 pe-0' />
                    <Col xs='11' className='text-start mt-1 ps-0'>
                        <p className='mt-1'>
                            {this.props.reviewText || (
                                <i>The user hasn&apos;t given any text review.</i>
                            )}
                        </p>
                    </Col>
                </Row>
            </Card>
        );
    }
}

export default ReviewDetail;
