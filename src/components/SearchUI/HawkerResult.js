import React, {Component} from 'react';
import {Card, CardImg, CardBody, CardTitle, CardText, Col, Row} from 'reactstrap';
import StarsRating from 'react-star-rate';
import { Link } from 'react-router-dom';

class HawkerPreview extends Component{  
    render() {
        return(
            <Link to="/view/123" style={{ color: 'inherit', textDecoration: 'inherit'}}>
            <Card className="mb-3 text-start border-0 shadow-sm clickable-card">
                <Row>
                    <Col xs="3">
                        <CardImg
                        alt="Card image cap"
                        src="https://picsum.photos/900/180"
                        style={{
                            height: 125
                        }}
                        className="card-left"
                        />
                    </Col>
                    <Col xs="6">
                        <CardBody>
                        <CardTitle tag="h4">
                            Boon Lay Hawker Centre
                        </CardTitle>
                        <CardText>
                            <p className='mb-1'>Location: Boon Lay</p>
                            <p className='mb-1'>Opening Hours:</p>
                        </CardText>
                        </CardBody>
                    </Col>
                    <Col xs="3" className="text-center align-items-center mt-auto mb-auto">
                        <h2 className='mb-0'>4.5</h2>
                        <StarsRating classNamePrefix="small-rating" value={4.5} disabled={true}/>
                    </Col>
            </Row>
            </Card>
            </Link>
        )
    }
}

export default HawkerPreview;