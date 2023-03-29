import React, { Component } from 'react';
import { Col, Progress } from 'reactstrap';
import { withRouter } from '../../Utility/withRouter';

/**
 * Class component representing the review page.
 * @property {Object} props - A functionality provided by ReactJS representing the information passed by parent.
 */
class ReviewSummary extends Component {
    /**
     * Create a review page component.
     * @param {Object} props - The props object that is passed to the component.
     */
    constructor(props) {
        super(props);
    }
    
    /**
     * ReactJS method to render the component.
     */
    render() {
        return this.props.length === 0 ? (
            <>
                <div className='mt-2 d-flex justify-content-center'>
                    <img src='/assets/images/empty-box.svg' height={'180px'} alt='Empty' />
                </div>
                <div className='mt-2 d-flex justify-content-center'>
                    <p className='fw-semibold text-center'>
                        It looks like we don&apos;t have any reviews available at the moment.
                        <br />
                        Why not be the first to share your review?
                    </p>
                </div>
            </>
        ) : (
            <>
                <div className='d-flex align-items-center'>
                    <span className='me-2'>5</span>
                    <Col>
                        <Progress
                            className='my-2'
                            color='warning'
                            value={this.props.percentage[4]}
                        />
                    </Col>
                </div>
                <div className='d-flex align-items-center'>
                    <span className='me-2'>4</span>
                    <Col>
                        <Progress
                            className='my-2'
                            color='warning'
                            value={this.props.percentage[3]}
                        />
                    </Col>
                </div>
                <div className='d-flex align-items-center'>
                    <span className='me-2'>3</span>
                    <Col>
                        <Progress
                            className='my-2'
                            color='warning'
                            value={this.props.percentage[2]}
                        />
                    </Col>
                </div>
                <div className='d-flex align-items-center'>
                    <span className='me-2'>2</span>
                    <Col>
                        <Progress
                            className='my-2'
                            color='warning'
                            value={this.props.percentage[1]}
                        />
                    </Col>
                </div>
                <div className='d-flex align-items-center'>
                    <span className='me-2'>1</span>
                    <Col>
                        <Progress
                            className='my-2'
                            color='warning'
                            value={this.props.percentage[0]}
                        />
                    </Col>
                </div>
            </>
        );
    }
}

export default withRouter(ReviewSummary);
