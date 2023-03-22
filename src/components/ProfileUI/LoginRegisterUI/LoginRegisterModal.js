
/**
 * @function LoginRegisterModal
 * @description allows the user to log in or register , switch between the tabs by clicking on the corresponding tab button.
 * @return form components ,one for the login form and one for the registration form.
 */


/**

A component that displays a modal containing a login and register form with tabs.
@extends Component
*/

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
    /*

Creates a LoginRegister component.

@constructor

@param {object} props - The props that were passed to the component.
*/
    constructor(props) {
        super(props);
/**

The state of the component.
@type {object}
@property {string} currentActiveTab - The currently active tab.
*/
        this.state = {
            currentActiveTab: 'login'
        };
    }
/**

Toggles the current active tab.
@param {string} tab - The tab to toggle to.
@returns {void}
*/
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
