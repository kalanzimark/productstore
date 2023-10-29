import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
import { GiHamburgerMenu } from "react-icons/gi";
import { TfiClose } from "react-icons/tfi";

const NavBar = () => {
    const [showNavMenu, setShowNavMenu] = useState(false);

    const showMenu = () => {
        setShowNavMenu(!showNavMenu);
    };
    return (
        <div className="nav-container">
            <div
                className={showNavMenu ? "nav-wrapper show-nav" : "nav-wrapper"}
            >
                <div className="nav-button-wrapper">
                    <div className="mobile-logo-wrapper">
                        {" "}
                        <img
                            src="https://cdn.pixabay.com/photo/2016/09/02/12/44/bike-1639091_960_720.jpg"
                            className="mobile-logo"
                            alt=""
                        />{" "}
                    </div>
                    <p className="navClose-btn" onClick={() => showMenu()}>
                        {" "}
                        {showNavMenu ? (
                            <span>
                                <TfiClose />
                            </span>
                        ) : (
                            <GiHamburgerMenu />
                        )}
                    </p>
                </div>
                <div className="navlist-wrapper">
                    <ul
                        className={
                            showNavMenu ? "nav-list show-nav-list" : "nav-list"
                        }
                    >
                        <li onClick={() => setShowNavMenu(false)}>
                            {" "}
                            <Link to="/">Home</Link>
                        </li>
                        <li onClick={() => setShowNavMenu(false)}>
                            {" "}
                            <Link to="/addproduct">Add Product</Link>
                        </li>
                        <li onClick={() => setShowNavMenu(false)}>
                            <Link to="/about">About</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
