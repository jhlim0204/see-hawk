import React, {Component} from 'react';
import FavouriteComponent from './FavouriteComponent';
import { FavouriteManager } from '../../control/FavouriteManager';
import { UserContext } from '../UserContext';

class FavouritePage extends Component {
    static contextType = UserContext;

    constructor (props) {
        super (props);

        this.state = {
            favouriteList: []
        }
    } 

    updateList = async() => {
        let favouriteList = await FavouriteManager.getFavourite(this.context);
        this.setState({favouriteList: favouriteList})
    }

    render() {
        return(
            <div className='background rounded page-transition'>
                <h1 className='display-5 mb-4 fw-semibold'>My Favourite List</h1>
                {
                    this.state.favouriteList.length === 0 ?
                        <>                        
                            <div className='mt-5 d-flex justify-content-center'>
                                <img className='white-background' src="/assets/images/empty-box.svg" height={"180px"} alt="Empty"></img>
                            </div>
                            <div className='mt-2 d-flex justify-content-center'>
                                <h4 className='fw-semibold text-center'>Your favourite list is empty.</h4>
                            </div>
                        </>
                    :
                        this.state.favouriteList.map((favourite) => (
                            <FavouriteComponent 
                                key={favourite.id}
                                updateList={this.updateList}
                                name={favourite.name} 
                                address={favourite.address} 
                                noOfStall={favourite.noOfStall} 
                                id={favourite.id} 
                                photoURL={favourite.photoURL}
                            />
                        ))
                }
            </div>
        )
    }

    componentDidMount() {
        this.updateList();
        document.title = "My Favourite List - SeeHawk"
    }
}

export default FavouritePage;