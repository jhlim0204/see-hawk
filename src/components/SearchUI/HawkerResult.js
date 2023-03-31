import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Col, Row } from 'reactstrap';
import StarsRating from 'react-star-rate';
import { Link } from 'react-router-dom';

/**
 * A class component representing a hawker result card that displays information about a hawker center,
 * including its name, photo, address, and rating.
 * Use case - UC04
 * @author Lim Jun Hern
 */
class HawkerResult extends Component {
    /**
     * ReactJS method to render the component.
     */
    render() {
        return (
            <Link
                to={'/view/' + this.props.id}
                style={{ color: 'inherit', textDecoration: 'inherit' }}
            >
                <Card className='mb-4 text-start border-0 shadow-sm clickable-card'>
                    <Row>
                        <Col xs='3' className='pe-0'>
                            <CardImg
                                alt='Card image cap'
                                src={this.props.photoURL}
                                style={{
                                    height: 155
                                }}
                                className='card-left'
                            />
                        </Col>
                        <Col xs='9' xl='7' className='px-0'>
                            <CardBody>
                                <CardTitle tag='h4'>{this.props.name}</CardTitle>
                                <CardText className='mt-2'>
                                    <span className='d-block mb-1'>
                                        <b>Address:</b> {this.props.address}
                                    </span>
                                    <span className='d-none d-lg-block'>
                                        <b>Number of stalls:</b> {this.props.noOfStall}
                                    </span>
                                </CardText>
                            </CardBody>
                        </Col>
                        <Col
                            xs='0'
                            xl='2'
                            className='text-center align-items-center mt-auto mb-auto ps-0 d-none d-xl-block'
                        >
                            {this.props.averageRating === 'Unrated' ? (
                                <h4 className='mb-0 fst-italic'>Unrated</h4>
                            ) : (
                                <h2 className='mb-0'>{this.props.averageRating}</h2>
                            )}
                            <StarsRating
                                classNamePrefix='small-rating'
                                value={this.props.averageRating}
                                disabled={true}
                            />
                        </Col>
                    </Row>
                </Card>
            </Link>
        );
    }
}

export default HawkerResult;
