import React, {Component} from 'react';
import {Col, Row, Progress} from 'reactstrap';
import GiveReview from './GiveReview';
import StarsRating from 'react-star-rate';
import { ReviewManager } from '../../../control/ReviewManager';
import ReviewDetail from './ReviewDetail';
import { withRouter } from "../../Utility/withRouter";
import ReviewPagePlaceholder from '../../PlaceholderUI/ReviewPagePlaceholder';
import { UserContext } from '../../UserContext';

class ReviewPage extends Component {
    static contextType = UserContext;

    constructor (props){
        super(props);

        this.state = {
            average: "",
            percentage: [],
            isLoading: true,
            reviewList: {}
        }
    }

    retrieveReview = async() => {
        this.setState({isLoading: true});
        let reviewList = await ReviewManager.getReview(this.props.params.id);
        if (reviewList !== false){
            let average = ReviewManager.calculateAverage(reviewList);
            let percentage = ReviewManager.calculatePercentage(reviewList);
            this.setState({average: average, percentage: percentage, reviewList: reviewList, isLoading: false});
        }
    }

    updateParent = () => {
        this.retrieveReview();
    }

    render() {
        if (this.state.isLoading){
            return (<ReviewPagePlaceholder/>)
        } else {
            return(
                <>
                <Row className="mb-3">
                <Col xs={Object.keys(this.state.reviewList).length === 0 ? 12: 8}>
                    <div className="d-flex align-items-center">
                        <h3 className="me-3">Review Summary</h3><GiveReview hawkerID={this.props.params.id} ownReview={this.state.reviewList[this.context]} updateParent={this.updateParent}/>
                    </div>
                    {Object.keys(this.state.reviewList).length === 0 ?
                    <>
                        <div className='mt-2 d-flex justify-content-center'>
                            <img src="/assets/images/empty-box.svg" height={"180px"} alt="Empty"/>
                        </div>
                        <div className='mt-2 d-flex justify-content-center'>
                            <p className='fw-semibold text-center'>It looks like we don't have any reviews available at the moment.<br/>Why not be the first to share your review?</p>
                        </div>
                    </>
                    :
                    <>
                    <div className="d-flex align-items-center">
                        <span className="me-2">5</span> 
                        <Col>
                            <Progress className="my-2" color="warning" value={this.state.percentage[4]}/>
                        </Col>
                    </div>
                    <div className="d-flex align-items-center">
                        <span className="me-2">4</span> 
                        <Col>
                            <Progress className="my-2" color="warning" value={this.state.percentage[3]}/>
                        </Col>
                    </div>
                    <div className="d-flex align-items-center">
                        <span className="me-2">3</span> 
                        <Col>
                            <Progress className="my-2" color="warning" value={this.state.percentage[2]}/>
                        </Col>
                    </div>
                    <div className="d-flex align-items-center">
                        <span className="me-2">2</span> 
                        <Col>
                            <Progress className="my-2" color="warning" value={this.state.percentage[1]}/>
                        </Col>
                    </div>
                    <div className="d-flex align-items-center">
                        <span className="me-2">1</span> 
                        <Col>
                            <Progress className="my-2" color="warning" value={this.state.percentage[0]}/>
                        </Col>
                    </div>
                    </>
                    }
                </Col>
                {Object.keys(this.state.reviewList).length !== 0 &&
                    <Col xs={4} className="text-center align-items-center">
                        <h1 className="display-1 mb-0">{this.state.average}</h1>
                        <StarsRating value={Number(this.state.average)} disabled={true}/>
                        <p className='text-muted'>{Object.keys(this.state.reviewList).length} reviews</p>
                    </Col>
                }
                </Row>
                {
                    Object.entries(this.state.reviewList).map( ([userName, review]) => 
                    <ReviewDetail userName={userName} reviewStar={review.reviewStar} reviewText={review.reviewText}/>
                    )
                }
                </>
            )
        }
    }

    componentDidMount = () => {
        this.retrieveReview();
    }
}

export default withRouter(ReviewPage);

