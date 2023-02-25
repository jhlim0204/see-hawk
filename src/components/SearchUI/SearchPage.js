import React, {Component} from 'react';
import { Col, FormGroup, Row, Label, Input, Form } from 'reactstrap';
import HawkerPreview from './HawkerResult';
import { withRouter } from "../Utility/withRouter";
import SidebarPlaceholder from '../PlaceholderUI/SidebarPlaceholder';
import DisplayStarsSmall from '../Utility/DisplayStarsSmall';
import { HawkerCentreManager } from '../../control/HawkerCentreManager';
import HawkerPlaceholder from '../PlaceholderUI/HawkerPlaceholder';
import { FilterManager } from '../../control/FilterManager';
import Lottie from "lottie-react";
import SearchEmptyAnimation from "../Animation/searchEmpty.json";

class SearchPage extends Component{
    constructor (props) {
        super (props)

        this.state = {
            isLoading: true,
            oriSearchResult: [],
            searchResult: [],
            openingNow: false,
            star: 0,
            region: {
                W: false,
                E: false,
                N: false,
                NE: false,
                C: false
            }
        }
    }

    handleSearch = async () => {
        this.setState({isLoading: true});

        const { search } = this.props.location;
        const urlQuery = new URLSearchParams(search);
        const qParam = urlQuery.get('q');
        let resultList = []
        if (qParam && qParam.trim()!==""){
            resultList = await HawkerCentreManager.searchHawkerCentre(qParam);
        }

        this.setState({searchResult: resultList, oriSearchResult: resultList});
        this.setState({isLoading: false});
    }

    handleFilter = () => {
        /* ori search result*/
        this.setState({searchResult: FilterManager.filter(this.state.oriSearchResult, {star: this.state.star, region: this.state.region})})
    }

    handleOpeningNow = () => {
        this.setState({openingNow: !this.state.openingNow}, ()=>{this.handleFilter()})
    }

    handleRating = (event) => {
        this.setState({star: parseInt(event.target.value)}, ()=>{this.handleFilter()})
    }

    handleRegion = (event) => {
        let regionCopy = {...this.state.region}
        regionCopy[event.target.name] = !regionCopy[event.target.name]
        this.setState({region: regionCopy}, ()=>{this.handleFilter()})
    }

    render() {
        if (this.state.isLoading){
            return(
                <div className="background page-transition">
                    <Row>
                        <SidebarPlaceholder/>                        
                        <Col xs={9}>
                            <HawkerPlaceholder/>
                        </Col>
                    </Row>
                </div>
            )
        } else {
            return(
                <div className="background">
                    <Row>
                        <Col xs={3} className="rounded-3 content shadow-sm">
                            <h5 className='mb-4'><i className="bi bi-funnel"></i> FILTERS</h5>
                            <h6 className='mb-3'>Opening Hours</h6>
                            <Form className="filter-form">
                                <FormGroup check>
                                    <Label check>
                                        <Input type="checkbox" onChange={this.handleOpeningNow} checked={this.state.openingNow}></Input>
                                        Opening Now
                                    </Label>
                                </FormGroup>
                            </Form>
                            <div className='line my-4'></div>
                            <h6 className='mb-3'>Star Rating</h6>
                            <Form className="filter-form">
                                <FormGroup check>
                                    <Label check>
                                        <Input name="star" type="radio" value={5} onChange={this.handleRating} checked={this.state.star === 5}></Input>
                                        <DisplayStarsSmall activeCount={5}/>
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input name="star" type="radio" value={4} onChange={this.handleRating} checked={this.state.star === 4}></Input>
                                        <DisplayStarsSmall activeCount={4}/> & Up
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input name="star" type="radio" value={3} onChange={this.handleRating} checked={this.state.star === 3}></Input>
                                        <DisplayStarsSmall activeCount={3}/> & Up
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input name="star" type="radio" value={2} onChange={this.handleRating} checked={this.state.star === 2}></Input>
                                        <DisplayStarsSmall activeCount={2}/> & Up
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input name="star" type="radio" value={1} onChange={this.handleRating} checked={this.state.star === 1}></Input>
                                        <DisplayStarsSmall activeCount={1}/> & Up
                                    </Label>
                                </FormGroup>
                            </Form>
                            <div className='line my-4'></div>
                            <h6 className='mb-3'>Located Region</h6>
                            <Form className="filter-form">
                                <FormGroup check>
                                    <Label check>
                                        <Input type="checkbox" name="W" checked={this.state.region.W} onChange={this.handleRegion}></Input>
                                        West Region
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="checkbox" name="E" checked={this.state.region.E} onChange={this.handleRegion}></Input>
                                        East Region
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="checkbox" name="N" checked={this.state.region.N} onChange={this.handleRegion}></Input>
                                        North Region
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="checkbox" name="NE" checked={this.state.region.NE} onChange={this.handleRegion}></Input>
                                        North-East Region
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="checkbox" name="C" checked={this.state.region.C} onChange={this.handleRegion}></Input>
                                        Central Region
                                    </Label>
                                </FormGroup>
                            </Form>
                        </Col>
                        <Col xs={9}>
                            {
                                this.state.searchResult.length !== 0 ?

                                this.state.searchResult.map((result) => (
                                    <HawkerPreview 
                                        name={result.name} 
                                        address={result.address} 
                                        noOfStall={result.noOfStall} 
                                        id={result.id} 
                                        photoURL={result.photoURL}
                                        averageRating={result.averageRating}
                                    />
                                ))
                                :
                                <>
                                    <div className='mt-5 d-flex justify-content-center'>
                                        <Lottie loop={false} animationData={SearchEmptyAnimation} style={{ height: 180 }} />
                                    </div>
                                    <div className='mt-2 d-flex justify-content-center'>
                                        <h4 className='fw-semibold text-center'>No results found.</h4>
                                    </div>  
                                </>
                            }
                        </Col>
                    </Row>
                </div>
            )
        }
    }

    componentDidMount() {
        this.handleSearch();
        document.title = "Search Results - SeeHawk"
    }
}

export default withRouter(SearchPage);