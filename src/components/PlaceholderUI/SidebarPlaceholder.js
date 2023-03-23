import React, { Component } from 'react';
import { Col } from 'reactstrap';
/**

React component for a placeholder sidebar with filters.
@class
@extends Component
/
class SidebarPlaceholder extends Component {
/*
Render method of the component.
*/
class SidebarPlaceholder extends Component {
    render() {
        return (
            <Col xs={3} className='rounded-3 content shadow-sm placeholder-glow'>
                <h5 className='mb-4'>
                    <i className='bi bi-funnel' /> FILTERS
                </h5>
                <h6 className='mb-3 col-12 rounded-1 placeholder'> </h6>
                <p className='col-7 rounded-1 placeholder' />

                <div className='line my-4' />
                <h6 className='mb-3 col-12 rounded-1 placeholder'> </h6>
                <p className='col-7 rounded-1 placeholder' />
                <p className='col-7 rounded-1 placeholder' />
                <p className='col-7 rounded-1 placeholder' />
                <p className='col-7 rounded-1 placeholder' />
                <p className='col-7 rounded-1 placeholder' />

                <div className='line my-4' />
                <h6 className='mb-3 col-12 rounded-1 placeholder'> </h6>
                <p className='col-7 rounded-1 placeholder' />
                <p className='col-6 rounded-1 placeholder' />
                <p className='col-8 rounded-1 placeholder' />
                <p className='col-7 rounded-1 placeholder' />
                <p className='col-7 rounded-1 placeholder' />
            </Col>
        );
    }
}

export default SidebarPlaceholder;
