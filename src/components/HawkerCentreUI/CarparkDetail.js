import React, {Component} from 'react';
import {Card, CardBody, CardTitle, CardText, Progress} from 'reactstrap';

class CarkparkDetail extends Component {
    render() {
        return(
            <Card className='text-start my-2 grey-card shadow-sm'>
                <CardBody>
                    <CardTitle tag="h4">Carpark 1</CardTitle>
                    <CardText className='mb-0'>Address: </CardText>
                    <CardText>
                            No. of slots: 100/250
                    </CardText>
                </CardBody>
            </Card>
        )
    }
}

export default CarkparkDetail;