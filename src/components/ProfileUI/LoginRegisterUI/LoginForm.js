import React, {Component} from 'react';
import { Col, Form, Label, Input, FormGroup, FormFeedback, Row, Button} from 'reactstrap';
import Lottie from "lottie-react";
import SuccessTickAnimation from '../../Animation/successTick.json';

class Login extends Component {
    constructor (props) {
        super (props);

        this.state = {
            username: '',
            password: '',
            isLoading: false,
            invalidUsername: false,
            invalidPassword: false,
            loginSuccess: false
        }
    }

    handleInput = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    /*handleSubmit = (event) => {
        event.preventDefault();
        const user = {username: this.state.username, password: this.state.password}
        this.setState({isLoading: true, invalidPassword: false, invalidUsername: false,});
        fetch('/loginuser', {
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
                if (Cookies.get('username')){
                    alert (Cookies.get('username')+', you have previously logged in before.');
                    this.setState({
                        isLoading: false
                    })
                }
                else if (!data.username){
                    this.setState({
                        invalidUsername: true,
                        isLoading: false
                    })
                } else if (!data.password){
                    this.setState({
                        invalidPassword: true,
                        isLoading: false
                    })
                } else {
                    this.setState({
                        username: '',
                        password: '',
                        isLoading: false
                    });
                    alert("Logged in successfully");
                    Cookies.set('username', user.username, { expires: 7 });
                    this.props.updateStatus();
                }
            })
            .catch(error => {
                alert(`An error has occured, message: ${error.message}`);
            });
    }*/

    handleSubmit = () => {
        //call controller here

        this.setState({loginSuccess: true}, ()=>{
            window.setTimeout(()=>{
                this.props.toggleModal("close")
            }, 2800)
            window.setTimeout(()=>{
                this.setState({loginSuccess: false})
            }, 3000)
        });
    }

    render (){
        if (this.state.loginSuccess){
            return (
            <>
                <Lottie animationData={SuccessTickAnimation} style={{height: 100}}/>
                <p className="text-center mt-2 fs-5">Logged in Successfully</p>
            </>
            )
        } else {
            return (
                <>
                    <Row className='justify-content-sm-center'>
                        <Col sm={11}>
                            <Form id="loginForm" onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Label className="text-start" htmlFor="username">Username: </Label>
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
                                        Username not found.
                                    </FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="password">Password: </Label>
                                    <Input 
                                        type="password" 
                                        name="password" 
                                        value={this.state.password} 
                                        invalid={this.state.invalidPassword} 
                                        onChange={this.handleInput}
                                    />
                                    <FormFeedback>
                                        The password that you've entered is incorrect.
                                    </FormFeedback>
                                </FormGroup>
                                <FormGroup className="float-end mt-2">
                                    <Button className="me-2" form="loginForm" type="submit" color="primary" disabled={this.state.isLoading} onClick={this.handleSubmit}>
                                        <div className={this.state.isLoading?"d-inline":"d-none"}><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span></div> Login
                                    </Button>
                                    <Button onClick={this.props.toggleModal}>Cancel</Button>
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
                </>
            )
        }
    }
}

export default Login;