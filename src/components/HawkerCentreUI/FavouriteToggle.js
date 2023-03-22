import React, { Component } from 'react';
import { Button, Toast, ToastBody, Tooltip } from 'reactstrap';
import { UserContext } from '../UserContext';
import { withRouter } from '../Utility/withRouter';
import { FavouriteManager } from '../../control/FavouriteManager';

/**
 * Class to create component to set and unset hawker centre as favourite
 */
class FavouriteToggle extends Component {
    static contextType = UserContext;

    /**
     * Props - property functionality in React to pass data between functions/classes
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
     * Method to close notification for successfully saved hawker centre
     * @param {void}
     * @return {void}
     */
    closeSavedNotification = () => {
        this.setState({ isSavedNotificationOpen: false });
    };

    /**
     * Method to close notification for successfully unsaved hawker centre
     * @param {void}
     * @return {void}
     */
    closeUnsavedNotification = () => {
        this.setState({ isUnsavedNotificationOpen: false });
    };

    /**
     * Method to display notification for successfully saved/unsaved hawker centre
     * @param {void}
     * @return {void}
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
     * Method that displays informative text when user hovers over element (React functionality)
     */
    toggleTooltip = () => {
        if (!this.context) {
            this.setState({ isTooltipOpen: !this.state.isTooltipOpen });
        }
    };

    /**
     * Method to set notification window as disabled
     * @param {void}
     * @return {void}
     */
    setDisabled = () => {
        this.setState({ disabled: true }, () => {
            window.setTimeout(() => {
                this.setState({ disabled: false });
            }, 2001);
        });
    };

    /**
     * Method to check if hawker centre is already favourite
     * @param {void}
     * @return {void}
     */
    checkFavourite = async () => {
        const isSaved = await FavouriteManager.isFavourite(this.context, this.state.hawkerID);
        this.setState({ isSaved: isSaved });
    };

    /**
     * Method to render html components in React
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
                        {!this.state.isSaved ? 'Save' : 'Unsave'} Favourite
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
     * This method is run if the component is mounted (React functionality)
     */
    componentDidMount() {
        this.checkFavourite();
    }
}

export default withRouter(FavouriteToggle);
