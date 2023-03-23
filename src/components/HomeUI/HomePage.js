import React, { Component } from 'react';
import SearchBar from '../SearchUI/SearchBar';
import { Col, Row } from 'reactstrap';

/**
 * Class component representing the home page.
 */
class HomePage extends Component {
    /**
     * ReactJS method to render the component. 
     */
    render() {
        return (
            <Row>
                <Col xs={2} />
                <Col xs={8} className='text-center'>
                    <img
                        className='mt-5 mb-4 img-fluid'
                        src='/assets/images/logo_large.png'
                        alt='SeeHawk'
                    />
                    <SearchBar shadow />
                </Col>
                <Col xs={2} />
            </Row>
        );
    }

    /**
     * ReactJS method that will be called when the component has mounted.
     */
    componentDidMount() {
        document.title = 'Home - SeeHawk';
    }
}

export default HomePage;
