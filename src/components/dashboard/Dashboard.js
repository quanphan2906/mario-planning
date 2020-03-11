import React, { Component } from 'react'
import { Redirect } from "react-router-dom"

import Notifications from "./Notifications"
import ProjectList from "../projects/ProjectList"

export default class Dashboard extends Component {
    render() {
        const { projects, user } = this.props;
        if (!user) return <Redirect to="/signin" />
        return (
            <div>
                <div className="dashboard container">
                    <div className="row">
                        <div className="col s12 m6">
                            <ProjectList projects={projects}/>
                        </div>
                        <div className="col s12 m5 offset-m1">
                            <Notifications />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
