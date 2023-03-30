import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavbarBrand } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Profile from '../ProfileUI/Profile';
import SearchBar from '../SearchUI/SearchBar';
import { withRouter } from '../Utility/withRouter';

/**
 * Class component representing the navigation bar.
 * @author Lim Jun Hern
 */
class Header extends Component {
    /**
     * ReactJS method to render the component.
     */
    render() {
        return (
            <Navbar className='fixed-top bg-light shadow-sm'>
                <NavbarBrand tag={NavLink} className='d-none d-sm-block ms-2 me-5' to='/home'>
                    {this.props.location.pathname !== '/' && (
                        <img src='/assets/images/logo.png' alt='logo' height='45' />
                    )}
                </NavbarBrand>

                <Nav navbar className='flex-grow-1 mx-2'>
                    <NavItem>{this.props.location.pathname !== '/' && <SearchBar />}</NavItem>
                </Nav>

                <Nav navbar className='ms-1'>
                    <NavItem>
                        <Profile />
                    </NavItem>
                </Nav>
            </Navbar>
        );
    }
}

export default withRouter(Header);
