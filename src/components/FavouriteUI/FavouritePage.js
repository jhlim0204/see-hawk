import React, {Component} from 'react';
import FavouriteComponent from './FavouriteComponent';

class FavouritePage extends Component {
    updateList = () => {
        /* retrieveList logic here*/
    }

    render() {
        return(
            <div className='background rounded page-transition'>
                <h1 className='display-5 mb-4 fw-semibold'>My Favourite List</h1>
                <FavouriteComponent updateList = {this.updateList}/>
            </div>
        )
    }

    componentDidMount() {
        document.title = "My Favourite List - SeeHawk"
    }
}

export default FavouritePage;