import React, {Component} from 'react';
import {Card, CardImg, CardBody, CardTitle, CardText, Col, Row} from 'reactstrap';

class HawkerPlaceholder extends Component{  
    render() {
        return(
            <Card className="my-2 text-start border-0 shadow-sm">
                <Row>
                    <Col xs="3">
                        <CardImg className="card-left placeholder" height={125}>
                        </CardImg>
                    </Col>
                    <Col xs="7">
                        <CardBody>
                        <CardTitle className="placeholder-glow" tag="h4">
                            <span className="placeholder col-12 rounded-1"></span>
                        </CardTitle>
                        <CardText className="placeholder-glow" >
                            <span className="placeholder col-7 rounded-1"></span>
                            <span className="placeholder col-7 rounded-1"></span>
                        </CardText>
                        </CardBody>
                    </Col>
            </Row>
            </Card>
        )
    }
}

export default HawkerPlaceholder;