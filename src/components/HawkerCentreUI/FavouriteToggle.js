import React, { Component } from 'react';
import { Button, Toast, ToastBody, Tooltip } from 'reactstrap';
import { UserContext } from '../UserContext';
import { withRouter } from '../Utility/withRouter';
import { FavouriteManager } from '../../control/FavouriteManager';

/**
 * Class component representing the button to set or unset hawker centre as favourite.
 * @property {Object} props - A functionality provided by ReactJS representing the information passed by parent.
 * @property {Object} state - A functionality provided by ReactJS representing the current state of the component.
 */
class FavouriteToggle extends Component {
    static contextType = UserContext;

    /**
     * Create a favourite toggle component.
     * @param {Object} props - The props object that is passed to the component.
     */
    constructor(props) {
        super(props);

        this.state = {
            hawkerID: this.props.params.id,
            isSavedNotificationOpen: false,
            isUnsavedNotificationOpen: false,
            isTooltipOpen: false,
            isSaved: false,
            disabled: false
        };
    }

    /**
     * Method to close notification for successfully saved hawker centre.
     */
    closeSavedNotification = () => {
        this.setState({ isSavedNotificationOpen: false });
    };

    /**
     * Method to close notification for successfully unsaved hawker centre.
     */
    closeUnsavedNotification = () => {
        this.setState({ isUnsavedNotificationOpen: false });
    };

    /**
     * Method to display notification for successfully saved/unsaved hawker centre.
     */
    toggleNotification = async () => {
        if (this.state.isSaved) {
            this.setDisabled();
            await FavouriteManager.deleteFavourite(this.context, this.state.hawkerID);
            this.setState({ isUnsavedNotificationOpen: true, isSaved: false }, () => {
                window.setTimeout(() => {
                    this.setState({ isUnsavedNotificationOpen: false });
                }, 2000);
            });
            this.checkFavourite();
        } else {
            this.setDisabled();
            await FavouriteManager.addFavourite(this.context, this.state.hawkerID);
            this.setState({ isSavedNotificationOpen: true }, () => {
                window.setTimeout(() => {
                    this.setState({ isSavedNotificationOpen: false });
                }, 2000);
            });
            this.checkFavourite();
        }
    };

    /**
     * Toggles the state for the 'log in required' tooltip.
     */
    toggleTooltip = () => {
        if (!this.context) {
            this.setState({ isTooltipOpen: !this.state.isTooltipOpen });
        }
    };

    /**
     * Method to set the button as disabled.
     */
    setDisabled = () => {
        this.setState({ disabled: true }, () => {
            window.setTimeout(() => {
                this.setState({ disabled: false });
            }, 2001);
        });
    };

    /**
     * Method to check if hawker centre is already favourite.
     */
    checkFavourite = async () => {
        const isSaved = await FavouriteManager.isFavourite(this.context, this.state.hawkerID);
        this.setState({ isSaved: isSaved });
    };

    /**
     * ReactJS method to render the component.
     */
    render() {
        return (
            <>
                <span id='favourite'>
                    <Button
                        color='warning'
                        disabled={!this.context || this.state.disabled}
                        onClick={this.toggleNotification}
                        className='ms-1'
                    >
                        <i className='bi bi-bookmark-fill' />{' '}
                        {!this.context || !this.state.isSaved ? 'Save' : 'Unsave'} Favourite
                    </Button>
                </span>
                <Tooltip
                    placement='top'
                    isOpen={this.state.isTooltipOpen}
                    target='favourite'
                    toggle={this.toggleTooltip}
                >
                    You have to log in first to use this feature.
                </Tooltip>

                <div className='toast-container position-fixed bottom-0 start-0 p-4'>
                    <Toast
                        fade
                        isOpen={this.state.isSavedNotificationOpen}
                        className='text-bg-dark'
                        delay={2000}
                    >
                        <div className='d-flex'>
                            <ToastBody>Hawker centre saved successfully.</ToastBody>
                            <button
                                className='btn-close btn-close-white me-2 m-auto'
                                onClick={this.closeSavedNotification}
                            />
                        </div>
                    </Toast>

                    <Toast
                        fade
                        isOpen={this.state.isUnsavedNotificationOpen}
                        className='text-bg-dark'
                        delay={2000}
                    >
                        <div className='d-flex'>
                            <ToastBody>Hawker centre unsaved successfully.</ToastBody>
                            <button
                                className='btn-close btn-close-white me-2 m-auto'
                                onClick={this.closeUnsavedNotification}
                            />
                        </div>
                    </Toast>
                </div>
            </>
        );
    }

    /**
     * ReactJS method that will be called when the component has mounted.
     */
    componentDidMount() {
        this.checkFavourite();
    }
}

export default withRouter(FavouriteToggle);
