import React from 'react';
import {Nav} from 'react-bootstrap';
import { Link } from "react-router-dom";


const NavigationBar = () => {
    return (
        <div>
            <header>
                <div className="container">
                    <div className="inner-content">
                        <div className="brand">
                            <img src="https://lwfiles.mycourse.app/coderschool-public/33fc8e54f6d5dad7d037060f88c62c18.png" alt="coderschool" width="200px"/>   
                        </div>
                        <ul className="nav-links">
                            <li>
                                <Nav.Link as={Link} exact="true"  to="/">
                                    Home
                                </Nav.Link>
                            </li>
                            <li>
                                <Nav.Link as={Link} to="/favorite">
                                    Favorite Book 
                                </Nav.Link>
                            </li>
                            <li>
                                <Link to="/search" className="btn"> Search</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default NavigationBar