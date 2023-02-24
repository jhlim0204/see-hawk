import React, {Component} from "react";
import {Route, Routes, Navigate} from 'react-router-dom';
import { withRouter } from "./Utility/withRouter";

//temp
import HawkerPage from "./HawkerCentreUI/HawkerPage";
import Header from "./NavUI/Header";
import HomePage from "./HomeUI/HomePage";
import FavouritePage from "./FavouriteUI/FavouritePage";
import SearchPage from "./SearchUI/SearchPage";

class Main extends Component {
    render() {
        return (
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

                    <Route path="/favourites" element={<FavouritePage />}/>
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        )
    }
}

export default withRouter(Main);