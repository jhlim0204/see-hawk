import React, { Component } from 'react';
import FavouriteComponent from './FavouriteComponent';
import { FavouriteManager } from '../../control/FavouriteManager';
import { UserContext } from '../UserContext';
import HawkerPlaceholder from '../PlaceholderUI/HawkerPlaceholder';

/**
 * Class component representing the page containing the list of favourited hawker centres.
 * @property {Object} props - A functionality provided by ReactJS representing the information passed by parent.
 * @property {Object} state - A functionality provided by ReactJS representing the current state of the component.
 */
class FavouritePage extends Component {
    static contextType = UserContext;
    /**
     * Create a component for the list of favourited hawker centres.
     * @param {Object} props - The props object that is passed to the component.
     */
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            favouriteList: []
        };
    }

    /**
     * This method updates the list of favourite hawker centres.
     */
    updateList = async () => {
        this.setState({ isLoading: true });
        let favouriteList = await FavouriteManager.getFavourite(this.context);
        this.setState({ favouriteList: favouriteList, isLoading: false });
    };

    /**
     * ReactJS method to render the component.
     */
    render() {
        if (this.state.isLoading) {
            return (
                <div className='background rounded page-transition'>
                    <HawkerPlaceholder />
                </div>
            );
        } else {
            return (
                <div className='background rounded page-transition'>
                    <h1 className='display-5 mb-4 fw-semibold'>My Favourite List</h1>
                    {this.state.favouriteList.length === 0 ? (
                        <>
                            <div className='mt-5 d-flex justify-content-center'>
                                <img
                                    className='white-background'
                                    src='/assets/images/empty-box.svg'
                                    height={'180px'}
                                    alt='Empty'
                                />
                            </div>
                            <div className='mt-2 d-flex justify-content-center'>
                                <h4 className='fw-semibold text-center'>
                                    Your favourite list is empty.
                                </h4>
                            </div>
                        </>
                    ) : (
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
                    )}
                </div>
            );
        }
    }

    /**
     * ReactJS method that will be called when the component has mounted.
     */
    componentDidMount() {
        this.updateList();
        document.title = 'My Favourite List - SeeHawk';
    }
}

export default FavouritePage;
