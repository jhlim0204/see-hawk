import React, { Component } from 'react';
import { Col, Form, Label, Input, FormGroup, Row, Button, FormFeedback } from 'reactstrap';
import Lottie from "lottie-react";
import SuccessTickAnimation from '../../Animation/successTick.json';
import RegisterManager from '../../../control/RegisterManager';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            rePassword: '',
            invalidUsername: false,
            invalidPassword: false,
            invalidRePassword: false,
            errMessUser: '',
            isLoading: false,
            loginSuccess: false
        }
    }

    handleInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (!(this.checkUsername() && this.checkPassword() && this.checkRePassword())) {
            return;
        }

        RegisterManager.register(this.state.username, this.state.password);

        this.setState({ loginSuccess: true }, () => {
            window.setTimeout(() => {
                this.props.switchTab()
            }, 2800)
            window.setTimeout(() => {
                this.setState({ loginSuccess: false })
            }, 3000)
        });
    }

    checkUsername = () => {
        const invalid = this.state.username.length > 13;

        if (invalid) {
            this.setState({ invalidUsername: true, errMessUser: "Username cannot be more than 13 characters!" });
        }
        return (!invalid)
    }

    checkPassword = () => {
        const invalid = this.state.password.length < 8;

        this.setState({ invalidPassword: invalid });
        return (!invalid)
    }

    checkRePassword = () => {
        const invalid = this.state.rePassword !== this.state.password;

        this.setState({ invalidRePassword: invalid });
        return (!invalid)
    }

    render() {
        if (this.state.loginSuccess) {
            return (
                <>
                    <Lottie animationData={SuccessTickAnimation} style={{ height: 100 }} />
                    <p className="text-center mt-2 fs-5">Registered Successfully</p>
                </>
            )
        } else {
            return (
                <Row className='justify-content-sm-center'>
                    <Col sm={11}>
                        <Form onSubmit={this.handleSubmit} className="row">
                            <FormGroup className="col-12">
                                <Label className="text-start" htmlFor="username">Username: </Label>
                                <div className="form-control-with-spinner">
                                    <Input
                                        type="text"
                                        name="username"
                                        value={this.state.username}
                                        onChange={this.handleInput}
                                        invalid={this.state.invalidUsername}
                                        autoComplete="off"
                                        spellCheck="false"
                                    />
                                    <FormFeedback>
                                        {this.state.errMessUser}
                                    </FormFeedback>
                                </div>
                            </FormGroup>
                            <div className="col-6 pe-1">
                                <FormGroup>
                                    <Label htmlFor="password">Password: </Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.handleInput}
                                        invalid={this.state.invalidPassword}
                                    />
                                    <FormFeedback>
                                        Password must be consist of {'>'}=8 alphanumeric characters!
                                    </FormFeedback>
                                </FormGroup>
                            </div>
                            <div className="col-6 ps-1">
                                <FormGroup>
                                    <Label htmlFor="rePassword">Confirm Password: </Label>
                                    <Input
                                        type="password"
                                        name="rePassword"
                                        value={this.state.rePassword}
                                        onChange={this.handleInput}
                                        invalid={this.state.invalidRePassword}
                                    />
                                    <FormFeedback>
                                        Passwords do no match!
                                    </FormFeedback>
                                </FormGroup>
                            </div>
                            <div className="col">
                                <FormGroup className="mt-2 float-end">
                                    {/* add invalid password logic*/}
                                    <Button
                                        className="me-2"
                                        type="submit"
                                        color="primary"
                                        disabled={this.state.isLoading || !(this.state.username && this.state.password && this.state.rePassword)}
                                    >
                                        Register
                                    </Button>
                                    <Button onClick={this.props.toggleModal}>Cancel</Button>
                                </FormGroup>
                            </div>
                        </Form>
                    </Col>
                </Row>
            )
        }
    }
}

export default Register;