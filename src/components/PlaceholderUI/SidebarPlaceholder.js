import React, {Component} from 'react';
import {Card, CardImg, CardBody, CardTitle, CardText, Col, Row} from 'reactstrap';

class SidebarPlaceholder extends Component{  
    render() {
        return(
            <Col xs={3} className="rounded-3 content shadow-sm placeholder-glow">
            <h5 className='mb-4'><i className="bi bi-funnel"></i> FILTERS</h5>
            <h6 className='mb-3 col-12 rounded-1 placeholder'></h6>
            <p className='col-7 rounded-1 placeholder'></p>
            
            <div className='line my-4'></div>
            <h6 className='mb-3 col-12 rounded-1 placeholder'></h6>
            <p className='col-7 rounded-1 placeholder'></p>
            <p className='col-7 rounded-1 placeholder'></p>
            <p className='col-7 rounded-1 placeholder'></p>
            <p className='col-7 rounded-1 placeholder'></p>
            <p className='col-7 rounded-1 placeholder'></p>
            
            <div className='line my-4'></div>
            <h6 className='mb-3 col-12 rounded-1 placeholder'></h6>
            <p className='col-7 rounded-1 placeholder'></p>
            <p className='col-6 rounded-1 placeholder'></p>
            <p className='col-8 rounded-1 placeholder'></p>
            <p className='col-7 rounded-1 placeholder'></p>
            <p className='col-7 rounded-1 placeholder'></p>
            </Col>
        )
    }
}

export default SidebarPlaceholder;