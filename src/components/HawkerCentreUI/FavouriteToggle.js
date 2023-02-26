import React, {Component} from 'react';
import {Button, Toast, ToastBody, Tooltip} from 'reactstrap';
import { UserContext } from '../UserContext';
import { withRouter } from "../Utility/withRouter";
import { FavouriteManager } from '../../control/FavouriteManager';

class FavouriteToggle extends Component {
    static contextType = UserContext;

    constructor (props) {
        super (props);

        this.state = {
            hawkerID: this.props.params.id,
            isSavedNotificationOpen: false,
            isUnsavedNotificationOpen: false,
            isTooltipOpen: false,
            isSaved: false,
            disabled: false
        }
    }

    closeSavedNotification = () => {
        this.setState({isSavedNotificationOpen: false});
    }

    closeUnsavedNotification = () => {
        this.setState({isUnsavedNotificationOpen: false});
    }

    toggleNotification = async () => {
        if (this.state.isSaved){
            this.setDisabled();
            await FavouriteManager.deleteFavourite(this.context, this.state.hawkerID);
            this.setState({isUnsavedNotificationOpen: true, isSaved: false}, ()=>{
                window.setTimeout(()=>{
                    this.setState({isUnsavedNotificationOpen: false})
                }, 2000)
            });
            this.checkFavourite();
        } else {
            this.setDisabled();
            await FavouriteManager.addFavourite(this.context, this.state.hawkerID);
            this.setState({isSavedNotificationOpen: true}, ()=>{
                window.setTimeout(()=>{
                    this.setState({isSavedNotificationOpen: false})
                }, 2000)
            });
            this.checkFavourite();
        }
    }

    toggleTooltip = () => {
        if (!this.context){
            this.setState({isTooltipOpen: !this.state.isTooltipOpen});
        }
    }

    setDisabled = () => {
        this.setState({disabled: true}, ()=>{
            window.setTimeout(()=>{
                this.setState({disabled: false})
            }, 2001)
        })
    }

    checkFavourite = async() => {
        const isSaved = await FavouriteManager.isFavourite(this.context, this.state.hawkerID);
        this.setState({isSaved: isSaved});
    }

    render() {
        return(
            <>  
                <span id="favourite">
                    <Button color="warning" disabled={!this.context || this.state.disabled} onClick={this.toggleNotification} className="ms-1">
                        <i className="bi bi-bookmark-fill"></i> { !this.state.isSaved ? "Save" : "Unsave"} Favourite
                    </Button>
                </span>
                <Tooltip placement="top" isOpen={this.state.isTooltipOpen} target="favourite" toggle={this.toggleTooltip}>You have to log in first to use this feature.</Tooltip>
                
                <div className="toast-container position-fixed bottom-0 start-0 p-4">
                <Toast fade isOpen={this.state.isSavedNotificationOpen} className="text-bg-dark" delay={2000}>
                    <div className="d-flex">
                        <ToastBody>
                            Hawker centre saved successfully.
                        </ToastBody>
                        <button className="btn-close btn-close-white me-2 m-auto" onClick={this.closeSavedNotification}></button>
                    </div>
                </Toast>

                <Toast fade isOpen={this.state.isUnsavedNotificationOpen} className="text-bg-dark" delay={2000}>
                    <div className="d-flex">
                        <ToastBody>
                            Hawker centre unsaved successfully.
                        </ToastBody>
                        <button className="btn-close btn-close-white me-2 m-auto" onClick={this.closeUnsavedNotification}></button>
                    </div>
                </Toast>
                </div>
            </>
        )
    }

    componentDidMount() {
        this.checkFavourite();
    }
}

export default withRouter(FavouriteToggle);