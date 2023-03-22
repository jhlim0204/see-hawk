import React, { Component } from 'react';
import SearchBar from '../SearchUI/SearchBar';
import { Col, Row } from 'reactstrap';

/**
 * Class to create component for the home page
 */
class HomePage extends Component {
    /**
     * Method to render html components in React
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
     * This method is run if the component is mounted (React functionality)
     */
    componentDidMount() {
        document.title = 'Home - SeeHawk';
    }
}

export default HomePage;
