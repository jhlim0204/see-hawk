/* View Component*/
import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Tooltip } from 'reactstrap';
import StarsRating from 'react-star-rate';
import Lottie from 'lottie-react';
import ReviewSubmittedAnimation from '../../Animation/reviewSubmitted.json';
import { UserContext } from '../../UserContext';

/* Controller*/
import { ReviewManager } from '../../../control/ReviewManager';

/**
 * Class component representing the button to give review.
 * @property {Object} props - A functionality provided by ReactJS representing the information passed by parent.
 * @property {Object} state - A functionality provided by ReactJS representing the current state of the component.
 */
class GiveReview extends Component {
    static contextType = UserContext;

    /**
     * Create a GiveReview component.
     * @param {Object} props - The props object that is passed to the component.
     */
    constructor(props) {
        super(props);

        this.state = {
            reviewStar: this.props.ownReview ? this.props.ownReview.reviewStar : 0,
            reviewText: this.props.ownReview ? this.props.ownReview.reviewText : '',
            isLoading: false,
            isModalOpen: false,
            isReviewTooltipOpen: false,
            isSubmitTooltipOpen: false,
            prepareToClose: false,
            submitSuccess: false
        };
    }

    /**
     * Toggles the review submission modal state.
     */
    toggleModal = () => {
        if (this.state.isModalOpen === true) {
            this.setState({
                reviewStar: this.props.ownReview ? this.props.ownReview.reviewStar : 0,
                reviewText: this.props.ownReview ? this.props.ownReview.reviewText : '',
                isModalOpen: false
            });
        } else {
            this.setState({ isModalOpen: true });
        }
    };

    /**
     * Toggles the state for the 'log in required' tooltip.
     */
    toggleReviewTooltip = () => {
        if (!this.context) {
            this.setState({ isReviewTooltipOpen: !this.state.isReviewTooltipOpen });
        }
    };

    /**
     * Toggles the state for the 'star rating required' tooltip .
     */
    toggleSubmitTooltip = () => {
        if (this.state.reviewStar === 0) {
            this.setState({ isSubmitTooltipOpen: !this.state.isSubmitTooltipOpen });
        }
    };

    /**
     * Method to set the number of review stars for hawker centre.
     * @param {int} reviewStar - The number of review stars.
     */
    setReviewStar = (reviewStar) => {
        this.setState({ reviewStar: reviewStar });
    };

    /**
     * Method to handle review input from user.
     * @param {Event} event - Event object from HTML DOM.
     */
    handleInput = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    /**
     * Method to handle user submission of review.
     * @param {Event} event - Event object from HTML DOM.
     */
    handleSubmit = async (event) => {
        event.preventDefault();
        //Calling controller
        this.setState({ isLoading: true });
        let updateSuccess = await ReviewManager.addReview(
            this.props.hawkerID,
            this.context,
            this.state.reviewStar,
            this.state.reviewText
        );
        if (updateSuccess) {
            this.setState({ isLoading: false });
            this.setState({ submitSuccess: true }, () => {
                window.setTimeout(() => {
                    this.setState({ isModalOpen: false });
                }, 2800);
                window.setTimeout(() => {
                    this.props.updateParent();
                }, 3000);
            });
        } else {
            window.alert('Error submitting the review, please try again.');
        }
    };

    /**
     * ReactJS method to render the component.
     */
    render() {
        return (
            <>
                <span id='review'>
                    <Button
                        type='button'
                        onClick={this.toggleModal}
                        size='sm'
                        outline
                        disabled={!this.context}
                    >
                        <b>
                            <i className='bi bi-pen' />{' '}
                            {this.props.ownReview ? 'Edit Review' : 'Give Review'}
                        </b>
                    </Button>
                </span>
                <Tooltip
                    placement='top'
                    isOpen={this.state.isReviewTooltipOpen}
                    target='review'
                    toggle={this.toggleReviewTooltip}
                >
                    You have to log in first to use this feature.
                </Tooltip>
                <Modal
                    className='text-center'
                    toggle={this.toggleModal}
                    isOpen={this.state.isModalOpen}
                >
                    <ModalHeader toggle={this.toggleModal}>Review Submission</ModalHeader>
                    {this.state.submitSuccess ? (
                        <>
                            <Lottie
                                className='mt-3'
                                animationData={ReviewSubmittedAnimation}
                                style={{ height: 100 }}
                            />
                            <p className='text-center mt-2 fs-5'>Review Submitted Successfully</p>
                        </>
                    ) : (
                        <>
                            <ModalBody>
                                <StarsRating
                                    value={this.state.reviewStar}
                                    onChange={this.setReviewStar}
                                    allowHalf={false}
                                />
                                <Input
                                    value={this.state.reviewText}
                                    maxLength={200}
                                    id='reviewText'
                                    className='mt-2'
                                    name='reviewText'
                                    type='textarea'
                                    style={{ resize: 'none' }}
                                    onChange={this.handleInput}
                                    onKeyDown={this.handleKeyDown}
                                    rows='5'
                                    placeholder='Share details of your own experience at this hawker centre (optional, max 200 words)'
                                />
                            </ModalBody>
                            <ModalFooter className='border-0 pt-0'>
                                <div id='submit'>
                                    <Button
                                        color='primary'
                                        disabled={
                                            this.state.reviewStar === 0 || this.state.isLoading
                                        }
                                        onClick={this.handleSubmit}
                                    >
                                        Submit
                                    </Button>
                                </div>
                                <Tooltip
                                    placement='top'
                                    isOpen={this.state.isSubmitTooltipOpen}
                                    target='submit'
                                    toggle={this.toggleSubmitTooltip}
                                >
                                    Star rating is required
                                </Tooltip>
                                <Button onClick={this.toggleModal}>Cancel</Button>
                            </ModalFooter>
                        </>
                    )}
                </Modal>
            </>
        );
    }
}

export default GiveReview;
