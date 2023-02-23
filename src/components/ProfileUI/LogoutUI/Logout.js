import React, {Component} from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

class Logout extends Component{
    constructor(props){
        super(props);
    }

    logout = () => {
        this.props.toggleModal();
        //logout logic here
    }

    render(){
        return(
            <Modal toggle={this.props.toggle} isOpen={this.props.isOpen}>
            <ModalHeader toggle={this.props.toggle}>Log out</ModalHeader>
            <ModalBody>Are you sure you want to log out?</ModalBody>
            <ModalFooter>
                <Button onClick={this.logout} color="primary">Yes</Button>
                <Button onClick={this.props.toggle}>Cancel</Button>
            </ModalFooter>
            </Modal>
        )
    }
}

export default Logout;