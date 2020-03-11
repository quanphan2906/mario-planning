import React from "react"
import { NavLink } from "react-router-dom"

import services from "../../services"

const SignedInLinks = ({trackUser}) => {
    const logout = async() => {
        await services.logout();
        services.trackUser(trackUser);
    }
    return (
        <ul className="right">
            <li> <NavLink to="/create">New Project</NavLink> </li>
            <li onClick={logout}> <NavLink to="/">Log Out</NavLink> </li>
            <li> <NavLink to="/" className="btn btn-floating pink lighten-2">NN</NavLink> </li>
        </ul>
    )
}

export default SignedInLinks