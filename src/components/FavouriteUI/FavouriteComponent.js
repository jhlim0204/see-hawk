import React, {Component} from 'react';
import {Card, CardImg, CardBody, CardTitle, CardText, Col, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { Link } from 'react-router-dom';
import { FavouriteManager } from '../../control/FavouriteManager';
import { UserContext } from '../UserContext';

class FavouriteComponent extends Component{ 
    static contextType = UserContext;

    constructor (props) {
        super (props);

        this.state = {
            isModalOpen: false,
            isLoading: false
        }
    } 

    removeFavourite = async() => {
        this.setState({isLoading:true});
        await FavouriteManager.deleteFavourite(this.context, String(this.props.id));
        this.setState({isLoading:false});
        this.toggleModal();
        await this.props.updateList();
    }

    toggleModal = () => {
        this.setState({isModalOpen: !this.state.isModalOpen});
    }

    render() {
        return(
            <>
                <Card className="my-3 text-start border-0 shadow-sm clickable-card">
                    <Row>
                        <Col xs="3">
                            <Link to={"/view/"+this.props.id} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                            <CardImg
                            alt="Hawker Centre"
                            src={this.props.photoURL}
                            className="rounded-start card-left img-fluid"
                            style={{
                                height: 165,
                                width: 270
                            }}
                            />
                            </Link>
                        </Col>
                        <Col xs="8" className='ps-0'>
                            <Link to={"/view/"+this.props.id} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                                <CardBody>
                                <CardTitle tag="h3" className='mb-3'>{this.props.name}</CardTitle>
                                <CardText>
                                    <span className='d-block mb-1'><b>Address:</b> {this.props.address}</span>
                                    <span><b>Number of stalls:</b> {this.props.noOfStall}</span>
                                </CardText>
                                </CardBody>
                            </Link>
                        </Col>
                        <Col xs="1">
                            <Button className='w-100 h-100 border-0 card-right' color="danger" onClick={this.toggleModal} outline>
                                <i className="bi bi-trash3"></i>
                            </Button>
                        </Col>
                </Row>
                </Card>
                <Modal toggle={this.toggleModal} isOpen={this.state.isModalOpen}>
                    <ModalHeader toggle={this.toggleModal}>Remove from Favorite List</ModalHeader>
                    <ModalBody>Are you sure you want to remove this hawker centre?</ModalBody>
                    <ModalFooter>
                        <Button onClick={this.removeFavourite} disabled={this.state.isLoading} color="primary">Yes</Button>
                        <Button onClick={this.toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </>
        )
    }
}

export default FavouriteComponent;