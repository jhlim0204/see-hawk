import React, {Component} from "react";
import {Route, Routes, Navigate} from 'react-router-dom';
import { withRouter } from "./Utility/withRouter";

//temp
import HawkerPage from "./HawkerCentreUI/HawkerPage";
import Header from "./NavUI/Header";
import HomePage from "./HomeUI/HomePage";
import FavouritePage from "./FavouriteUI/FavouritePage";
import SearchPage from "./SearchUI/SearchPage";
import { UserContext } from "./UserContext";

import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ""
        };
    }

    render() {
        return (
            <UserContext.Provider value={this.state.username}>
                <div className="container">
                    <Header></Header>
                    <Routes>
                        <Route path="/" element={<HomePage />}/>
                        <Route path="/search/*" element={<SearchPage />}/>

                        {/*
                            to be grouped
                        */}

                        <Route path="/view" element={<Navigate to="/" replace />} />
                        <Route path="/view/:id" element={<HawkerPage />}/>

                        {this.state.username && <Route path="/favourites" element={<FavouritePage />}/>}
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </div>
            </UserContext.Provider>
        )
    }

    componentDidMount() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.setState({username: user.email.substring(0, user.email.length - 12)});
            } else {
                this.setState({username: ""});
            }
        })
    }
}

export default withRouter(Main);