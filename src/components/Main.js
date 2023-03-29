/* View Component */
import React, { Component } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { withRouter } from './Utility/withRouter';
import HawkerPage from './HawkerCentreUI/HawkerPage';
import Header from './NavUI/Header';
import HomePage from './HomeUI/HomePage';
import FavouritePage from './FavouriteUI/FavouritePage';
import SearchPage from './SearchUI/SearchPage';
import { UserContext } from './UserContext';

/* Controller */
import SessionManager from '../control/SessionManager';

/**
 * A main class component representing the whole application.
 */
class Main extends Component {
    /**
     * Initializes the state of the main component.
     * @param {Object} props - The props object that is passed to the component.
     */
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        };
    }

    /**
     * The method to update the user status.
     * @param {Object} user - The dicitionary containing relevant information about a user.
     */
    updateUserStatus = (user) => {
        if (user) {
            this.setState({ username: user.email.substring(0, user.email.length - 12) });
        } else {
            this.setState({ username: '' });
        }
    };

    /**
     * ReactJS method to render the component.
     */
    render() {
        return (
            <UserContext.Provider value={this.state.username}>
                <div className='container'>
                    <Header />
                    <Routes>
                        <Route path='/' element={<HomePage />} />

                        <Route path='/search/*' element={<SearchPage />} />

                        <Route path='/view' element={<Navigate to='/' replace />} />
                        <Route path='/view/:id' element={<HawkerPage />} />

                        {this.state.username && (
                            <Route path='/favourites' element={<FavouritePage />} />
                        )}
                        <Route path='*' element={<Navigate to='/' replace />} />
                    </Routes>
                </div>
            </UserContext.Provider>
        );
    }

    /**
     * ReactJS method that will be called when the component has mounted.
     */
    componentDidMount() {
        SessionManager.authListener(this.updateUserStatus);
    }
}

export default withRouter(Main);
