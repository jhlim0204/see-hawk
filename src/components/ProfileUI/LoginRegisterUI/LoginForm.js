import React, { Component } from 'react';
import { Col, Form, Label, Input, FormGroup, FormFeedback, Row, Button } from 'reactstrap';
import Lottie from 'lottie-react';
import SuccessTickAnimation from '../../Animation/successTick.json';
import SessionManager from '../../../control/SessionManager';

/**
 * A class component representing login form allowing users to input their username and password
 * and submit them to log in.
 * Use case - UC02
 * @property {Object} props - A functionality provided by ReactJS representing the information passed by parent.
 * @property {Object} state - A functionality provided by ReactJS representing the current state of the component.
 * @author Lim Jun Hern
 */
class Login extends Component {
    /**
     * Create a Login component.
     * @param {Object} props - The props object that is passed to the component.
     */
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            isLoading: false,
            invalidPassword: false,
            loginSuccess: false
        };
    }

    /**
     * Handle changes to the input fields.
     * @param {Event} event - The event object generated by the input field.
     */
    handleInput = (event) => {
        if (this.state.invalidPassword) {
            this.setState({ invalidPassword: false });
        }
        this.setState({ [event.target.name]: event.target.value });
    };

    /**
     * Handle the submission of the login form.
     * @param {Event} event - The event object generated by the login form.
     */
    handleSubmit = async (event) => {
        event.preventDefault();
        this.setState({ isLoading: true });

        const loginSuccess = await SessionManager.login(this.state.username, this.state.password);
        if (loginSuccess) {
            this.setState({ loginSuccess: true }, () => {
                window.setTimeout(() => {
                    this.props.toggleModal('close');
                }, 2800);
                window.setTimeout(() => {
                    this.setState({ loginSuccess: false, isLoading: false });
                }, 3000);
            });
        } else {
            this.setState({ invalidPassword: true, isLoading: false });
        }
    };

    /**
     * ReactJS method to render the component.
     */
    render() {
        if (this.state.loginSuccess) {
            return (
                <>
                    <Lottie animationData={SuccessTickAnimation} style={{ height: 100 }} />
                    <p className='text-center mt-2 fs-5'>Logged in Successfully</p>
                </>
            );
        } else {
            return (
                <Row className='justify-content-sm-center'>
                    <Col sm={11}>
                        <Form id='loginForm' onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label className='text-start' htmlFor='username'>
                                    Username:{' '}
                                </Label>
                                <Input
                                    type='text'
                                    name='username'
                                    value={this.state.username}
                                    onChange={this.handleInput}
                                    autoComplete='off'
                                    spellCheck='false'
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor='password'>Password: </Label>
                                <Input
                                    type='password'
                                    name='password'
                                    value={this.state.password}
                                    invalid={this.state.invalidPassword}
                                    onChange={this.handleInput}
                                />
                                <FormFeedback>
                                    The password that you&apos;ve entered is incorrect.
                                </FormFeedback>
                            </FormGroup>
                            <FormGroup className='float-end mt-2'>
                                <Button
                                    className='me-2'
                                    form='loginForm'
                                    type='submit'
                                    color='primary'
                                    disabled={
                                        this.state.isLoading ||
                                        !(this.state.username && this.state.password)
                                    }
                                    onClick={this.handleSubmit}
                                >
                                    Login
                                </Button>
                                <Button onClick={this.props.toggleModal}>Cancel</Button>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            );
        }
    }
}

export default Login;
