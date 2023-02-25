import React, {Component} from 'react';
import {Card, CardImg, CardBody, CardTitle, CardText, Col, Row} from 'reactstrap';
import StarsRating from 'react-star-rate';
import { Link } from 'react-router-dom';

class HawkerPreview extends Component{  
    constructor (props) {
        super (props)
    }

    render() {
        return(
            <Link to={"/view/"+this.props.id} style={{ color: 'inherit', textDecoration: 'inherit'}}>
            <Card className="mb-3 text-start border-0 shadow-sm clickable-card">
                <Row>
                    <Col xs="3">
                        <CardImg
                        alt="Card image cap"
                        src={this.props.photoURL}
                        style={{
                            height: 125
                        }}
                        className="card-left"
                        />
                    </Col>
                    <Col xs="6">
                        <CardBody>
                        <CardTitle tag="h4">
                            {this.props.name}
                        </CardTitle>
                        <CardText>
                            <p className='mb-1'>Address: {this.props.address}</p>
                            <p className='mb-1'>Number of stalls: {this.props.noOfStall}</p>
                        </CardText>
                        </CardBody>
                    </Col>
                    <Col xs="3" className="text-center align-items-center mt-auto mb-auto">
                        <h2 className='mb-0'>{this.props.averageRating}</h2>
                        <StarsRating classNamePrefix="small-rating" value={this.props.averageRating} disabled={true}/>
                    </Col>
            </Row>
            </Card>
            </Link>
        )
    }
}

export default HawkerPreview;