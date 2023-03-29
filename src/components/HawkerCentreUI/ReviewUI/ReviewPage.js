/* View Component*/
import React, { Component } from 'react';
import { Col, Row, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
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
            reviewList: {},
            reviewLength: 0,
            currentPage: 1,
            pageSize: 5,
            pageCount: 0
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
            this.setState(
                {
                    average: average,
                    percentage: percentage,
                    reviewList: reviewList,
                    isLoading: false
                },
                () =>
                    this.setState({
                        reviewLength: Object.keys(this.state.reviewList).length,
                        pageCount: Math.ceil(
                            Object.keys(this.state.reviewList).length / this.state.pageSize
                        )
                    })
            );
        }
    };

    /**
     * Method to be passed to the children to allow updating on parent element.
     */
    updateParent = () => {
        this.retrieveReview();
    };

    /**
     * Method to change the page.
     * @param {Event} event - The DOM Event object.
     * @param {number} page - The page number.
     */
    changePage = (event, page) => {
        event.preventDefault();

        this.setState({
            currentPage: page
        });
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
                        <Col xs={this.state.reviewLength === 0 ? 12 : 8}>
                            <div className='d-flex align-items-center'>
                                <h3 className='me-3'>Review Summary</h3>
                                <GiveReview
                                    hawkerID={this.props.params.id}
                                    ownReview={this.state.reviewList[this.context]}
                                    updateParent={this.updateParent}
                                />
                            </div>
                            <ReviewSummary
                                length={this.state.reviewLength}
                                percentage={this.state.percentage}
                            />
                        </Col>
                        {this.state.reviewLength !== 0 && (
                            <Col xs={4} className='text-center align-items-center'>
                                <h1 className='display-1 mb-0'>{this.state.average}</h1>
                                <StarsRating value={Number(this.state.average)} disabled={true} />
                                <p className='text-muted'>{this.state.reviewLength} reviews</p>
                            </Col>
                        )}
                    </Row>
                    <div className="page-transition" key={this.state.currentPage}>
                        {Object.entries(this.state.reviewList)
                            .slice(
                                (this.state.currentPage - 1) * this.state.pageSize,
                                this.state.currentPage * this.state.pageSize
                            )
                            .map(([userName, review]) => (
                                <ReviewDetail
                                    key={userName}
                                    userName={userName}
                                    reviewStar={review.reviewStar}
                                    reviewText={review.reviewText}
                                />
                            ))}
                    </div>

                    {this.state.pageCount != 0 && (
                        <>
                            <Pagination
                                aria-label='Page navigation'
                                className='d-flex mt-4 justify-content-center'
                                size="larger"
                            >
                                <PaginationItem disabled={this.state.currentPage <= 1}>
                                    <PaginationLink
                                        onClick={(e) => this.changePage(e, 1)}
                                        first
                                        href='#'
                                    />
                                </PaginationItem>

                                <PaginationItem disabled={this.state.currentPage <= 1}>
                                    <PaginationLink
                                        onClick={(e) =>
                                            this.changePage(e, this.state.currentPage - 1)
                                        }
                                        previous
                                        href='#'
                                    />
                                </PaginationItem>

                                <PaginationItem
                                        disabled
                                        className="center-text"
                                        key={this.state.currentPage}
                                    >
                                        <PaginationLink
                                            onClick={e => e.preventDefault()}
                                            href='#'
                                        >
                                            {this.state.currentPage}
                                        </PaginationLink>
                                    </PaginationItem>

                                <PaginationItem
                                    disabled={this.state.currentPage >= this.state.pageCount}
                                >
                                    <PaginationLink
                                        onClick={(e) =>
                                            this.changePage(e, this.state.currentPage + 1)
                                        }
                                        next
                                        href='#'
                                    />
                                </PaginationItem>

                                <PaginationItem
                                    disabled={this.state.currentPage >= this.state.pageCount}
                                >
                                    <PaginationLink
                                        onClick={(e) => this.changePage(e, this.state.pageCount)}
                                        last
                                        href='#'
                                    />
                                </PaginationItem>
                            </Pagination>
                        </>
                    )}
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
