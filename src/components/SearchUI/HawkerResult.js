import React, {Component} from 'react';
import {Card, CardImg, CardBody, CardTitle, CardText, Col, Row} from 'reactstrap';
import StarsRating from 'react-star-rate';
import { Link } from 'react-router-dom';

class HawkerResult extends Component{
    render() {
        return(
            <Link to={"/view/"+this.props.id} style={{ color: 'inherit', textDecoration: 'inherit'}}>
            <Card className="mb-4 text-start border-0 shadow-sm clickable-card">
                <Row>
                    <Col xs="3">
                        <CardImg
                        alt="Card image cap"
                        src={this.props.photoURL}
                        style={{
                            height: 155
                        }}
                        className="card-left"
                        />
                    </Col>
                    <Col xs="7" className='px-0'>
                        <CardBody>
                        <CardTitle tag="h4">
                            {this.props.name}
                        </CardTitle>
                        <CardText className='mt-2'>
                            <p className='mb-1'><b>Address:</b> {this.props.address}</p>
                            <p className='mb-1'><b>Number of stalls:</b> {this.props.noOfStall}</p>
                        </CardText>
                        </CardBody>
                    </Col>
                    <Col xs="2" className="text-center align-items-center mt-auto mb-auto ps-1">
                        {
                            this.props.averageRating === 'Unrated' ?
                            <h4 className='mb-0 fst-italic'>Unrated</h4> :
                            <h2 className='mb-0'>{this.props.averageRating}</h2>
                        }
                        <StarsRating classNamePrefix="small-rating" value={this.props.averageRating} disabled={true}/>
                    </Col>
            </Row>
            </Card>
            </Link>
        )
    }
}

export default HawkerResult;