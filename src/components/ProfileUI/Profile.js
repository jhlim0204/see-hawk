import React, { Component } from "react";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { Link } from "react-router-dom";
import LoginRegister from "./LoginRegisterUI/LoginRegisterModal";
import Logout from "./LogoutUI/Logout";
import { UserContext } from "../UserContext";
import Avatar from 'react-avatar';

class Profile extends Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);

        this.state = {
            dropdownOpen: false,
            isLoginModalOpen: false,
            isLogoutModalOpen: false,
            currentActiveTab: "login"
        }
    }

    toggle = () => {
        this.setState({ dropdownOpen: !this.state.dropdownOpen });
    }

    toggleLoginModal = (option) => {
        if (option === "close") {
            this.setState({ isLoginModalOpen: false });
        } else {
            this.setState({ isLoginModalOpen: !this.state.isLoginModalOpen });
        }
    }

    toggleLogoutModal = () => {
        this.setState({ isLogoutModalOpen: !this.state.isLogoutModalOpen });
    }

    render() {
        return (
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} direction="down">
                <DropdownToggle className="dropdown-title dropdown-text" id="username" color="light" caret>
                
                    {this.context ? <Avatar name={this.context} size="35" textSizeRatio={2} round className="me-2"/> : <img className="profile-pic-small me-2" src="/assets/images/guest-pic.png" height="35px" alt="Guest" /> }
                    {this.context ? this.context : "Guest"}
                </DropdownToggle>
                <DropdownMenu className="shadow-lg w-100 border-0" end={true}>
                    {this.context ?
                        /* Display option for logged in user*/
                        <>
                            <Link to='/favourites' style={{ textDecoration: 'none' }}>
                                <DropdownItem className="dropdown-text"><i className="bi bi-bookmark me-2"></i>Favourite List</DropdownItem>
                            </Link>
                            <DropdownItem className="dropdown-text" onClick={this.toggleLogoutModal}>
                                <i className="bi bi-power me-2"></i>Logout
                            </DropdownItem>
                        </>
                    :
                        /* Display option for guest*/
                        <>
                            <DropdownItem className="dropdown-text" toggle={false} onClick={this.toggleLoginModal}>
                                <i className="bi bi-box-arrow-in-left me-2"></i>Login / Register
                            </DropdownItem>
                        </>
                    }
                </DropdownMenu>

                <LoginRegister toggle={this.toggleLoginModal} isOpen={this.state.isLoginModalOpen} />
                <Logout toggle={this.toggleLogoutModal} isOpen={this.state.isLogoutModalOpen} />
            </Dropdown>
        )
    }
}

export default Profile;