import React, { Component } from 'react'
import * as AiIcons from 'react-icons/ai';
import hipraNavBarLogo from '../hipra_nav_bar_logo_sm.png'
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';

class Navbar extends Component {

    toggleSideBar() {
        let isShown = false;
        if (this.state && this.state.isShown) {
            isShown = true;
        }
        this.setState({isShown: !isShown});
    };

    showSideBar = () => this.state != null && this.state.isShown;

    render() {
        return (
            <>
                    <nav className="navbar navbar-dark fixed-top hipra-background flex-md-nowrap p-0 shadow">
                        <a
                            className="navbar-brand col-sm-3 col-md-2 mr-0"
                            href="https://www.hipra.com/portal/ca/hipra/home"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src={hipraNavBarLogo} height="50" className="d-inline-block align-top" alt="" />
                        </a>

                        <span className="hipra-app-title">DApp Hipra Sample Tracker</span>

                        <ul className="navbar-nav px-3">
                            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                                <small className="account-address">
                                    <small id="account">{this.props.account}</small>
                                </small>
                            </li>
                        </ul>
                    </nav>
                    <nav className={this.showSideBar ? 'nav-menu active' : 'nav-menu'}>
                        <ul className='nav-menu-items'>
                            <li className='navbar-toggle'>
                                <Link to='#' className='menu-bars'>
                                    <AiIcons.AiOutlineClose />
                                </Link>
                            </li>
                            {SidebarData.map((item, index) => {
                                return (
                                    <li key={index} className={item.cName}>
                                        <Link to={item.path}>
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
            </>
        );
    }
}

export default Navbar;
