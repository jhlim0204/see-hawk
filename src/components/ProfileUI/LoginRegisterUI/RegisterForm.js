import React, {Component} from 'react';
import { Col, Form, Label, Input, FormGroup, Row, Button, FormFeedback } from 'reactstrap';
import Lottie from "lottie-react";
import SuccessTickAnimation from '../../Animation/successTick.json';

class Register extends Component {
    constructor (props) {
        super (props);

        this.state = {
            username: '',
            password: '',
            rePassword: '',
            invalidUsername: false,
            validUsername: false,
            invalidPassword: false,
            invalidRePassword: false,
            errMessUser: '',
            isLoading: false,
            checkingUsername: false,
            loginSuccess: false
        }
    }

    /*handleSubmit = (event) => {
        event.preventDefault();
        this.checkUsername();
        this.checkPassword();
        this.checkRePassword();
        if (this.state.validUsername && this.state.validPassword && this.state.validRePassword){
            const user = {username: this.state.username, password: this.state.password}
            this.setState({isLoading: true});
            fetch('/reguser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user),
                credentials: 'same-origin'
            })
            .then(response => {
                if (response.ok){
                    return response.json();
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    throw error;
                }   
            })
            .then(data => {
                if (data.success){
                    alert("Registration Successful");
                    this.setState({
                        username: '',
                        password: '',
                        invalidUsername: false,
                        validUsername: false,
                        invalidPassword: false,
                        validPassword: false,
                        invalidRePassword: false,
                        validRePassword: false,
                        errMessUser: '',
                        errMessPass: '',
                        isLoading: false
                    });
                    this.props.switchTab();
                } else {
                    alert("An error has occured. Please try again.")
                }
            })
            .catch(error => {
                this.setState({invalidUsername: true, validUsername: false, errMessUser: `An error has occured, message: ${error.message}`});
            });
        } else {
            return;
        }
    }*/

    handleInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = () => {
        //call controller here
        this.checkPassword();
        this.checkRePassword();

        this.setState({loginSuccess: true}, ()=>{
            window.setTimeout(()=>{
                this.props.switchTab()
            }, 2800)
            window.setTimeout(()=>{
                this.setState({loginSuccess: false})
            }, 3000)
        });
    }

    checkUsername = () => {
        this.setState({checkingUsername: false, validUsername:false, invalidUsername:false});
        if (this.state.username === ''){
            this.setState({invalidUsername: true, errMessUser: "Username cannot be empty!"});
        } else if (! /^[A-Za-z_0-9]*$/i.test(this.state.username)){
            this.setState({invalidUsername: true, errMessUser: "Username can only contain letters, numbers, and underscores!"});
        } else if (this.state.username.length > 13){
            this.setState({invalidUsername: true, errMessUser: "Username cannot be more than 13 characters!"});
        } else
        {
            const username = {username: this.state.username};
            this.setState({checkingUsername: true});

            fetch('/checkusername', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(username),
                credentials: 'same-origin'
                })
            .then(response => {
                if (response.ok){
                    return (response.json());
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    throw error;
                }   
            })
            .then(data => {
                if (data.taken){
                    this.setState({invalidUsername: true, checkingUsername: false, errMessUser: "Oh no! This username has already been taken"});
                } else {
                    this.setState({validUsername: true, checkingUsername: false});
                }
            })
            .catch(error => {
                this.setState({invalidUsername: true, checkingUsername:false, errMessUser: `An error has occured, message: ${error.message}`});
            });
        }
    }

    checkPassword = () => {
        this.setState({invalidPassword: this.state.password.length < 8});
    }

    checkRePassword = () => {
        this.setState({invalidRePassword: this.state.rePassword !== this.state.password});
    }

    render (){
        if (this.state.loginSuccess){
            return (
            <>
                <Lottie animationData={SuccessTickAnimation} style={{height: 100}}/>
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
                                    valid={this.state.validUsername} 
                                    autoComplete="off" 
                                    spellCheck="false" 
                                    maxLength={13}
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
                                    onBlur={this.checkPassword}
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
                                    onBlur={this.checkRePassword}
                                    invalid={this.state.invalidRePassword}
                                />
                                <FormFeedback>
                                    Passwords do no match
                                </FormFeedback>
                            </FormGroup>
                        </div>
                        <div className="col">
                        <FormGroup className="mt-2 float-end">
                            <Button className="me-2" type="submit" color="primary" disabled={this.state.isLoading}>
                                <div className={this.state.isLoading?"d-inline":"d-none"}><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span></div> Register
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