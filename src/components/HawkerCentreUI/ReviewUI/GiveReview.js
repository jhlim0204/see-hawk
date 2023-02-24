import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Tooltip} from 'reactstrap';
import StarsRating from 'react-star-rate';
import Lottie from "lottie-react";
import ReviewSubmittedAnimation from '../../Animation/reviewSubmitted.json';

class GiveReview extends Component {
    //props: hawker ID, state(for edit)    
    constructor (props) {
        super (props);

        this.state = {
            //todo: default val for edit, i.e this.props.value && this.props.reviewText
            value: 0,
            isModalOpen: false,
            isTooltipOpen: false,
            reviewText: '',
            prepareToClose: false,
            submitSuccess: false
        }
    }

    toggleModal = () => {
        //reset value if toggle without submit
        //temporary:
        if(this.state.isModalOpen === true){
            this.setState({value: 0, reviewText: '', isModalOpen: false});
        } else {
            this.setState({isModalOpen: true});
        }
    }

    toggleTooltip = () => {
        this.setState({isTooltipOpen: !this.state.isTooltipOpen});
    }

    setValue = (value) => {
        this.setState({value: value});
    }

    handleInput = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        //call controller here        
        
        //if success
        this.setState({submitSuccess: true}, ()=>{
            window.setTimeout(()=>{
                this.setState({isModalOpen: false})
            }, 2800)
            window.setTimeout(()=>{
                this.setState({submitSuccess: false})
            }, 3000)
        });
    }

    render() {
        return(
            <>
                <Button type="button" onClick={this.toggleModal} size="sm" outline><b><i className="bi bi-pen"></i> Give Review</b></Button>
                <Modal className="text-center" toggle={this.toggleModal} isOpen={this.state.isModalOpen}>
                        <ModalHeader toggle={this.toggleModal}>Review Submission</ModalHeader>
                        { this.state.submitSuccess ? 
                        <>
                            <Lottie className="mt-3" animationData={ReviewSubmittedAnimation} style={{height: 100}}/>
                            <p className="text-center mt-2 fs-5">Review Submitted Successfully</p>
                        </> 
                        :
                        <>
                            <ModalBody>
                                <StarsRating value={this.state.value} onChange={this.setValue} allowHalf={false}/>
                                <Input maxLength={200} id="reviewText" className="mt-2" name="reviewText" type="textarea"  style={{resize: 'none'}} onChange={this.handleInput} onKeyDown={this.handleKeyDown} rows="5" placeholder="Share details of your own experience at this hawker centre (optional, max 200 words)"/>
                            </ModalBody>
                            <ModalFooter className="border-0 pt-0">
                                <div id="submit">
                                    <Button color="primary" disabled={this.state.value === 0} onClick={this.handleSubmit}>Submit</Button>
                                </div>
                                <Tooltip placement="top" isOpen={this.state.isTooltipOpen} target="submit" toggle={this.state.value ===0 && this.toggleTooltip}>Star rating is required</Tooltip>
                                <Button onClick={this.toggleModal}>Cancel</Button>
                            </ModalFooter>
                        </>              
                        }
                </Modal>
            </>
        )
    }
}

export default GiveReview;