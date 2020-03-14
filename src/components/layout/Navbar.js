import React from "react"
import { Link } from "react-router-dom"

// const Navbar = ({ user, trackUser}) => {
const Navbar = ({ children }) => {
    return (
        <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <Link to="/" className="brand-logo">MarioPlan</Link>
                {children}
            </div>
        </nav>
    )
}

export default Navbar