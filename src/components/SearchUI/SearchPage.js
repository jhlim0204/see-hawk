import React, {Component} from 'react';
import { Col, FormGroup, Row, Label, Input, Form } from 'reactstrap';
import HawkerPreview from './HawkerResult';
import HawkerPreviewPlaceholder from '../PlaceholderUI/HawkerPlaceholder';
import { withRouter } from "../Utility/withRouter";
import SidebarPlaceholder from '../PlaceholderUI/SidebarPlaceholder';
import DisplayStarsSmall from '../Utility/DisplayStarsSmall';
import { HawkerCentreManager } from '../../control/HawkerCentreManager';

class SearchPage extends Component{
    constructor (props) {
        super (props)

        this.state = {
            openingNow: false,
            star: "",
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
        const { search } = this.props.location;
        const urlQuery = new URLSearchParams(search);
        const qParam = urlQuery.get('q');
        if (qParam && qParam.trim()!==""){
            let resultList = [];

            resultList = await HawkerCentreManager.searchHawkerCentre(qParam);
            console.log(resultList);

        }
    }

    handleOpeningNow = () => {
        this.setState({openingNow: !this.state.openingNow})
    }

    handleRating = (event) => {
        this.setState({star: parseInt(event.target.value)})
    }

    handleRegion = (event) => {
        let regionCopy = {...this.state.region}
        regionCopy[event.target.name] = !regionCopy[event.target.name]
        this.setState({region: regionCopy})
    }

    render() {
        return(
            <div className="background page-transition">
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
                        <HawkerPreview/>
                        <HawkerPreviewPlaceholder/>
                    </Col>
                </Row>
            </div>
        )
    }

    componentDidMount() {
        this.handleSearch();
        document.title = "Search Results - SeeHawk"
    }
}

export default withRouter(SearchPage);