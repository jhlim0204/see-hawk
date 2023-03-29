import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import SessionManager from '../../../control/SessionManager';

/**
 * A class component that displays a modal to confirm logout and logs out the user on confirmation.
 * @property {Object} props - A functionality provided by ReactJS representing the information passed by parent.
 * @property {Object} state - A functionality provided by ReactJS representing the current state of the component.
 */
class Logout extends Component {
    /**
     * Create a Logout component.
     * @param {Object} props - The props object that is passed to the component.
     */
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false
        };
    }

    /**
     * Logs the user out and closes the modal on confirmation.
     * @param {Event} event - The click event.
     */
    logout = async (event) => {
        event.preventDefault();
        this.setState({ isLoading: true });

        await SessionManager.logout();
        this.setState({ isLoading: false });
        this.props.toggle();
    };

    /**
     * ReactJS method to render the component.
     */
    render() {
        return (
            <Modal toggle={this.props.toggle} isOpen={this.props.isOpen}>
                <ModalHeader toggle={this.props.toggle}>Log out</ModalHeader>
                <ModalBody>Are you sure you want to log out?</ModalBody>
                <ModalFooter>
                    <Button onClick={this.logout} color='primary' disabled={this.state.isLoading}>
                        Yes
                    </Button>
                    <Button onClick={this.props.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default Logout;
