import React, { Component } from 'react';
import { Form, Input, InputGroup, InputGroupText } from 'reactstrap';
import { withRouter } from '../Utility/withRouter';


/**
 * Initializes the state of the component with the value of the search query parameter
 * extracted from the URL or an empty string.
 * @constructor
 * @param {Object} props - The props object that is passed to the component.
 */

class SearchBar extends Component {
    constructor(props) {
        super(props);

        const { search } = this.props.location;
        const urlQuery = new URLSearchParams(search);
        const qParam = urlQuery.get('q') || '';

        this.state = {
            q: qParam
        };
    }
/**
 * Selects the text in the input field when it receives focus.
 * @param {Object} event - The event object that triggered the method.
 */
    handleFocus = (event) => {
        event.target.select();
    };
/**
 * Updates the state with the name and value of the input field.
 * @param {Object} event - The event object that triggered the method.
 */
    handleInput = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };
/**
 * Submits the form and navigates to the search results page with the search query parameter.
 * Reloads the page to update the search results.
 * @param {Object} event - The event object that triggered the method.
 */
    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.q && this.state.q.trim()) {
            this.props.navigate('/search/?q=' + this.state.q.replace(/ /g, '+'));
            window.location.reload();
        }
    };
/**
 * Renders the search bar with input field and search icon.
 */
    render() {
        return (
            <Form
                className={this.props.shadow === true ? 'shadow-sm' : ''}
                onSubmit={this.handleSubmit}
            >
                <InputGroup>
                    <InputGroupText className='bg-white pe-0'>
                        <i className='bi bi-search' />
                    </InputGroupText>
                    <Input
                        name='q'
                        value={this.state.q}
                        onChange={this.handleInput}
                        bsSize='lg'
                        type='text'
                        className='shadow-none border-start-0'
                        placeholder='Search for Hawker Centres'
                        onFocus={this.handleFocus}
                    />
                </InputGroup>
            </Form>
        );
    }
}

export default withRouter(SearchBar);
