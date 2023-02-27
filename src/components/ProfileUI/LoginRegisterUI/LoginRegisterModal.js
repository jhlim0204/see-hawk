import React, { Component } from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane
} from 'reactstrap';
import Login from './LoginForm';
import Register from './RegisterForm';

class LoginRegister extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentActiveTab: 'login'
        };
    }

    toggleTab = (tab) => {
        if (this.state.currentActiveTab !== tab) {
            this.setState({ currentActiveTab: tab });
        }
    };

    render() {
        return (
            <Modal toggle={this.props.toggle} isOpen={this.props.isOpen}>
                <ModalHeader toggle={this.props.toggle} className='mb-0 pt-2 pb-0 border-0'>
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                role='button'
                                className={
                                    this.state.currentActiveTab === 'login'
                                        ? 'active fw-bold'
                                        : 'text-muted'
                                }
                                onClick={() => {
                                    this.toggleTab('login');
                                }}
                            >
                                Log In
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                role='button'
                                className={
                                    this.state.currentActiveTab === 'register'
                                        ? 'active fw-bold'
                                        : 'text-muted'
                                }
                                onClick={() => {
                                    this.toggleTab('register');
                                }}
                            >
                                Register
                            </NavLink>
                        </NavItem>
                    </Nav>
                </ModalHeader>
                <div className='line'></div>
                <ModalBody className='pt-4 pb-2 bg-light'>
                    <TabContent activeTab={this.state.currentActiveTab}>
                        <TabPane tabId='login'>
                            <Login toggleModal={this.props.toggle} />
                        </TabPane>
                        <TabPane tabId='register'>
                            <Register
                                toggleModal={this.props.toggle}
                                switchTab={() => {
                                    this.toggleTab('login');
                                }}
                            />
                        </TabPane>
                    </TabContent>
                </ModalBody>
            </Modal>
        );
    }
}

export default LoginRegister;
