import React from "react"
import { Link } from "react-router-dom"

import SignedInLinks from "./SignedInLinks"
import SignedOutLinks from "./SignedOutLinks"

const Navbar = ({ user, trackUser}) => {
    return (
        <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <Link to="/" className="brand-logo">MarioPlan</Link>
                { user ? (
                    <SignedInLinks trackUser={trackUser} user={user}/>
                ) : (
                    <SignedOutLinks />
                )}
            </div>
        </nav>
    )
}

export default Navbar