import React, {Component} from 'react';
import { Form, Input, InputGroup, InputGroupText } from 'reactstrap';
import { withRouter } from "../Utility/withRouter";

class SearchBar extends Component {
    constructor (props) {
        super (props);

        const { search } = this.props.location;
        const urlQuery = new URLSearchParams(search);
        const qParam = urlQuery.get('q') || "";

        this.state = {
            q: qParam
        }
    }

    handleFocus = (event) => {
        event.target.select();
    }

    handleInput = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.q && this.state.q.trim()) {
            this.props.navigate("/search/?q=" + this.state.q.replace(/ /g, '+'));
            window.location.reload();
        }
    }
    
    render() {
        return(
            <Form className={this.props.shadow === true ? "shadow-sm" : ""} onSubmit={this.handleSubmit}>
                <InputGroup>
                    <InputGroupText className="bg-white pe-0">
                        <i className="bi bi-search"></i>
                    </InputGroupText>
                    <Input 
                        name="q" 
                        value={this.state.q} 
                        onChange={this.handleInput} 
                        bsSize='lg' type="text" 
                        className='shadow-none border-start-0' 
                        placeholder='Search for Hawker Centres' 
                        onFocus={this.handleFocus}
                    />
                </InputGroup>
            </Form>
        )
    }
}

export default withRouter(SearchBar);