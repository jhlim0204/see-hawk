import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import SessionManager from '../../../control/SessionManager';

class Logout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false
        }
    }

    logout = (event) => {
        event.preventDefault();
        //logout logic here
        SessionManager.logout();
        this.props.toggleModal();
    }

    render() {
        return (
            <Modal toggle={this.props.toggle} isOpen={this.props.isOpen}>
                <ModalHeader toggle={this.props.toggle}>Log out</ModalHeader>
                <ModalBody>Are you sure you want to log out?</ModalBody>
                <ModalFooter>
                    <Button onClick={this.logout} color="primary" disabled={this.state.isLoading}>Yes</Button>
                    <Button onClick={this.props.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

export default Logout;