/* View Component*/
import React, { Component } from 'react';
import { Col, FormGroup, Row, Label, Input, Form } from 'reactstrap';
import HawkerResult from './HawkerResult';
import Lottie from 'lottie-react';
import SearchEmptyAnimation from '../Animation/searchEmpty.json';
import { withRouter } from '../Utility/withRouter';
import DisplayStarsSmall from '../Utility/DisplayStarsSmall';

/* Placeholder Component*/
import SidebarPlaceholder from '../PlaceholderUI/SidebarPlaceholder';
import HawkerPlaceholder from '../PlaceholderUI/HawkerPlaceholder';

/* Controller*/
import { HawkerCentreManager } from '../../control/HawkerCentreManager';
import { FilterManager } from '../../control/FilterManager';

/**
 * A class component representing the search page.
 * @property {Object} props - A functionality provided by ReactJS representing the information passed by parent.
 * @property {Object} state - A functionality provided by ReactJS representing the current state of the component.
 */
class SearchPage extends Component {
    /**
    * Initializes the state of the component with isLoading, oriSearchResult, searchResult, star, and region.
    * @param {Object} props - The props object that is passed to the component.
    */
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            oriSearchResult: [],
            searchResult: [],
            star: 0,
            region: {
                W: false,
                E: false,
                N: false,
                NE: false,
                C: false
            }
        };
    }

    /**
    * Handles the search function by calling the searchHawkerCentre function of the HawkerCentreManager controller
    * and setting the state of isLoading and searchResult accordingly.
    */
    handleSearch = async () => {
        this.setState({ isLoading: true });

        const { search } = this.props.location;
        const urlQuery = new URLSearchParams(search);
        const qParam = urlQuery.get('q');
        let resultList = [];
        if (qParam && qParam.trim() !== '') {
            resultList = await HawkerCentreManager.searchHawkerCentre(qParam);
        }

        this.setState({ searchResult: resultList, oriSearchResult: resultList, isLoading: false });
    };

    /**
    * Handles filtering the search results based on star rating and location.
    * Filters the oriSearchResult by passing it to the FilterManager's filter function and updating the state
    * of searchResult with the resulting array.
    */
    handleFilter = () => {
        /* ori search result*/
        this.setState({
            searchResult: FilterManager.filter(this.state.oriSearchResult, {
                star: this.state.star,
                region: this.state.region
            })
        });
    };

    /**
    * Handles updating the state of star based on the selected star rating.
    * Calls handleFilter to update the search results.
    * @param {Event} event the event object passed in from the onChange handler
    */
    handleRating = (event) => {
        this.setState({ star: parseInt(event.target.value) }, () => {
            this.handleFilter();
        });
    };

    /**
    * Handles updating the state of the location checkboxes based on which checkboxes were clicked.
    * Calls handleFilter to update the search results.
    * @param {Event} event the event object passed in from the onChange handler
    */
    handleRegion = (event) => {
        let regionCopy = { ...this.state.region };
        regionCopy[event.target.name] = !regionCopy[event.target.name];
        this.setState({ region: regionCopy }, () => {
            this.handleFilter();
        });
    };

    /**
    * ReactJS method to render the component.
    */
    render() {
        if (this.state.isLoading) {
            return (
                <div className='background page-transition'>
                    <Row>
                        <SidebarPlaceholder />
                        <Col xs={9}>
                            <HawkerPlaceholder />
                        </Col>
                    </Row>
                </div>
            );
        } else {
            return (
                <div className='background'>
                    <Row>
                        <Col xs={3} className='rounded-3 content shadow-sm'>
                            <h5 className='mb-4'>
                                <i className='bi bi-funnel' /> FILTERS
                            </h5>
                            <h6 className='mb-3'>Star Rating</h6>
                            <Form className='filter-form'>
                                <FormGroup check>
                                    <Label check>
                                        <Input
                                            name='star'
                                            type='radio'
                                            value={5}
                                            onChange={this.handleRating}
                                            checked={this.state.star === 5}
                                        />
                                        <DisplayStarsSmall activeCount={5} />
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input
                                            name='star'
                                            type='radio'
                                            value={4}
                                            onChange={this.handleRating}
                                            checked={this.state.star === 4}
                                        />
                                        <DisplayStarsSmall activeCount={4} /> & Up
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input
                                            name='star'
                                            type='radio'
                                            value={3}
                                            onChange={this.handleRating}
                                            checked={this.state.star === 3}
                                        />
                                        <DisplayStarsSmall activeCount={3} /> & Up
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input
                                            name='star'
                                            type='radio'
                                            value={2}
                                            onChange={this.handleRating}
                                            checked={this.state.star === 2}
                                        />
                                        <DisplayStarsSmall activeCount={2} /> & Up
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input
                                            name='star'
                                            type='radio'
                                            value={1}
                                            onChange={this.handleRating}
                                            checked={this.state.star === 1}
                                        />
                                        <DisplayStarsSmall activeCount={1} /> & Up
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input
                                            name='star'
                                            type='radio'
                                            value={0}
                                            onChange={this.handleRating}
                                            checked={this.state.star === 0}
                                        />
                                        <DisplayStarsSmall activeCount={0} /> & Up
                                    </Label>
                                </FormGroup>
                            </Form>
                            <div className='line my-4' />
                            <h6 className='mb-3'>Located Region</h6>
                            <Form className='filter-form'>
                                <FormGroup check>
                                    <Label check>
                                        <Input
                                            type='checkbox'
                                            name='W'
                                            checked={this.state.region.W}
                                            onChange={this.handleRegion}
                                        />
                                        West Region
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input
                                            type='checkbox'
                                            name='E'
                                            checked={this.state.region.E}
                                            onChange={this.handleRegion}
                                        />
                                        East Region
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input
                                            type='checkbox'
                                            name='N'
                                            checked={this.state.region.N}
                                            onChange={this.handleRegion}
                                        />
                                        North Region
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input
                                            type='checkbox'
                                            name='NE'
                                            checked={this.state.region.NE}
                                            onChange={this.handleRegion}
                                        />
                                        North-East Region
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input
                                            type='checkbox'
                                            name='C'
                                            checked={this.state.region.C}
                                            onChange={this.handleRegion}
                                        />
                                        Central Region
                                    </Label>
                                </FormGroup>
                            </Form>
                        </Col>
                        <Col xs={9}>
                            {this.state.searchResult.length !== 0 ? (
                                this.state.searchResult.map((result) => (
                                    <HawkerResult
                                        key={result.id}
                                        name={result.name}
                                        address={result.address}
                                        noOfStall={result.noOfStall}
                                        id={result.id}
                                        photoURL={result.photoURL}
                                        averageRating={result.averageRating}
                                    />
                                ))
                            ) : (
                                <>
                                    <div className='mt-5 d-flex justify-content-center'>
                                        <Lottie
                                            loop={false}
                                            animationData={SearchEmptyAnimation}
                                            style={{ height: 180 }}
                                        />
                                    </div>
                                    <div className='mt-2 d-flex justify-content-center'>
                                        <h4 className='fw-semibold text-center'>
                                            No results found.
                                        </h4>
                                    </div>
                                </>
                            )}
                        </Col>
                    </Row>
                </div>
            );
        }
    }

    /**
    * ReactJS method that will be called when the component has mounted.
    */
    componentDidMount() {
        this.handleSearch();
        document.title = 'Search Results - SeeHawk';
    }
}

export default withRouter(SearchPage);
