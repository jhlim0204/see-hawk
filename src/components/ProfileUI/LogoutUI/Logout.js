import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import SessionManager from '../../../control/SessionManager';
/**

A React component that displays a modal to confirm logout and logs out the user on confirmation.
@component
*/
class Logout extends Component {
    /**
* Create a Logout component.
* @constructor
* @param {Object} props - The component properties.
*/
    constructor(props) {
        super(props);
/**
     * The component's state.
     * @type {Object}
     * @property {boolean} isLoading - Indicates if a logout request is in progress.
     */
        this.state = {
            isLoading: false
        };
    }
/**
 * Logs the user out and closes the modal on confirmation.
 * @async
 * @param {Event} event - The click event.
 */
    logout = async (event) => {
        event.preventDefault();
        this.setState({ isLoading: true });

        await SessionManager.logout();
        this.setState({ isLoading: false });
        this.props.toggle();
    };

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
