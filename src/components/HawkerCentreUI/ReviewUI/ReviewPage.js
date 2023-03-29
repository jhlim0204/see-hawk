/* View Component*/
import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import StarsRating from 'react-star-rate';
import GiveReview from './GiveReview';
import ReviewDetail from './ReviewDetail';
import ReviewSummary from './ReviewSummary';
import { withRouter } from '../../Utility/withRouter';
import { UserContext } from '../../UserContext';

/* Placeeholder Component */
import ReviewPagePlaceholder from '../../PlaceholderUI/ReviewPagePlaceholder';

/* Controller*/
import { ReviewManager } from '../../../control/ReviewManager';

/**
 * Class component representing the review page.
 * @property {Object} props - A functionality provided by ReactJS representing the information passed by parent.
 * @property {Object} state - A functionality provided by ReactJS representing the current state of the component.
 */
class ReviewPage extends Component {
    static contextType = UserContext;

    /**
     * Create a review page component.
     * @param {Object} props - The props object that is passed to the component.
     */
    constructor(props) {
        super(props);

        this.state = {
            average: '',
            percentage: [],
            isLoading: true,
            reviewList: {}
        };
    }

    /**
     * Method to retrieve the review.
     */
    retrieveReview = async () => {
        this.setState({ isLoading: true });
        let reviewList = await ReviewManager.getReview(this.props.params.id);
        if (reviewList !== false) {
            let average = ReviewManager.calculateAverage(reviewList);
            let percentage = ReviewManager.calculatePercentage(reviewList);
            this.setState({
                average: average,
                percentage: percentage,
                reviewList: reviewList,
                isLoading: false
            });
        }
    };

    /**
     * Method to be passed to the children to allow updating on parent element.
     */
    updateParent = () => {
        this.retrieveReview();
    };

    /**
     * ReactJS method to render the component.
     */
    render() {
        if (this.state.isLoading) {
            return <ReviewPagePlaceholder />;
        } else {
            return (
                <>
                    <Row className='mb-3'>
                        <Col xs={Object.keys(this.state.reviewList).length === 0 ? 12 : 8}>
                            <div className='d-flex align-items-center'>
                                <h3 className='me-3'>Review Summary</h3>
                                <GiveReview
                                    hawkerID={this.props.params.id}
                                    ownReview={this.state.reviewList[this.context]}
                                    updateParent={this.updateParent}
                                />
                            </div>
                            <ReviewSummary
                                length={Object.keys(this.state.reviewList).length}
                                percentage={this.state.percentage}
                            />
                        </Col>
                        {Object.keys(this.state.reviewList).length !== 0 && (
                            <Col xs={4} className='text-center align-items-center'>
                                <h1 className='display-1 mb-0'>{this.state.average}</h1>
                                <StarsRating value={Number(this.state.average)} disabled={true} />
                                <p className='text-muted'>
                                    {Object.keys(this.state.reviewList).length} reviews
                                </p>
                            </Col>
                        )}
                    </Row>
                    {Object.entries(this.state.reviewList).map(([userName, review]) => (
                        <ReviewDetail
                            key={userName}
                            userName={userName}
                            reviewStar={review.reviewStar}
                            reviewText={review.reviewText}
                        />
                    ))}
                </>
            );
        }
    }

    /**
     * ReactJS method that will be called when the component has mounted.
     */
    componentDidMount = () => {
        this.retrieveReview();
    };
}

export default withRouter(ReviewPage);
