import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Col, Row } from 'reactstrap';

/**
 * A class component representing the placeholder card for a hawker centre
 */
class HawkerPlaceholder extends Component {
    /**
     * ReactJS method to render the component.
     */
    render() {
        return (
            <Card className='my-2 text-start border-0 shadow-sm'>
                <Row>
                    <Col xs='3'>
                        <CardImg className='card-left placeholder' height={125} />
                    </Col>
                    <Col xs='7'>
                        <CardBody>
                            <CardTitle className='placeholder-glow' tag='h4'>
                                <span className='placeholder col-12 rounded-1' />
                            </CardTitle>
                            <CardText className='placeholder-glow'>
                                <span className='placeholder col-7 rounded-1' />
                                <span className='placeholder col-7 rounded-1' />
                            </CardText>
                        </CardBody>
                    </Col>
                </Row>
            </Card>
        );
    }
}

export default HawkerPlaceholder;
