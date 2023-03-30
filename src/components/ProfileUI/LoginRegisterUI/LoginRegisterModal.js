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

/**
 * A class component representing the modal containing a login and register form with tabs
 * @property {Object} props - A functionality provided by ReactJS representing the information passed by parent.
 * @property {Object} state - A functionality provided by ReactJS representing the current state of the component.
 * @author Lim Jun Hern
 */
class LoginRegister extends Component {
    /**
     * Create a LoginRegister component.
     * @param {Object} props - The props object that is passed to the component.
     */
    constructor(props) {
        super(props);

        this.state = {
            currentActiveTab: 'login'
        };
    }

    /**
     * Toggles the current active tab.
     * @param {string} tab - The tab to toggle to.
     */
    toggleTab = (tab) => {
        if (this.state.currentActiveTab !== tab) {
            this.setState({ currentActiveTab: tab });
        }
    };

    /**
     * ReactJS method to render the component.
     */
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
                <div className='line' />
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
