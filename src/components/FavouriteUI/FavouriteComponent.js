import React, {Component} from 'react';
import {Card, CardImg, CardBody, CardTitle, CardText, Col, Row, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { Link } from 'react-router-dom';

class FavouriteComponent extends Component{ 
    constructor (props) {
        super (props);

        this.state = {
            isModalOpen: false,
            isLoading: false
        }
    } 

    removeFavourite = () => {
        this.setState({isLoading:true});

        /* remove logic here*/

        this.updateList();
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
                            <Link to="/view/123" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                            <CardImg
                            alt="Card image cap"
                            src="https://picsum.photos/900/180"
                            className="rounded-start card-left"
                            style={{
                                height: 130
                            }}
                            />
                            </Link>
                        </Col>
                        <Col xs="8">
                            <Link to="/view/123" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                                <CardBody>
                                <CardTitle tag="h3">Hawker Centre</CardTitle>
                                <CardText>
                                    <p className='mb-1'>Location: Chinatown</p>
                                    <p className='mb-1'>Opening Hours: Chinatown</p>
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