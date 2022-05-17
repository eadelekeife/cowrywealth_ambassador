import React from 'react';
import { Link } from 'react-router-dom';

const SideNav = props => {
    return (
        <div>
            <div className="top_nav">
                <h5><Link to="/">Home</Link> {'>'} {props.currentPage}</h5>
                <div className="top_nav_action_nav">
                    <Link to="/profile/signout"><i className="uil uil-search"></i></Link>
                    <Link to="/profile/signout"><i className="uil uil-bell"></i></Link>
                    <Link to="/profile/signout"><i className="uil uil-envelope-minus"></i></Link>
                    <Link to="/profile/signout"><i className="uil uil-signout"></i></Link>
                </div>
            </div>
            <div className="top_nav">
                <h5>{props.currentPageInfo}</h5>
                <div>
                    <Link className="bg_green" to={props.buttonLink}>{props.buttonTitle}</Link>
                </div>
            </div>
        </div>
    )
}

export default SideNav;