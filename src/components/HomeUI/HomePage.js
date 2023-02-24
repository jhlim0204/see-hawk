import React, {Component} from 'react';
import SearchBar from '../SearchUI/SearchBar';
import { Col, Row } from 'reactstrap';

class HomePage extends Component {
    render() {
        return(
            <Row>
                <Col xs={2}/>
                <Col xs={8} className="text-center">
                    <img className='mt-5 mb-4 img-fluid' src='/assets/images/logo_large.png'/>
                    <SearchBar shadow/>
                </Col>
                <Col xs={2}/>
            </Row>
        )
    }

    componentDidMount() {
        document.title = "Home - SeeHawk"
    }
}

export default HomePage;