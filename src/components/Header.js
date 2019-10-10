import React from 'react'
import { Link } from "react-router-dom";

function Header() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <span className="navbar-brand">Wasla</span>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item">
                <Link className="nav-item nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-item nav-link" to="/rules">Rules Engine</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-item nav-link" to="/customers">Customers</Link>
                </li>
              </ul>
            </div>
          </nav>
        )
}

export default Header;