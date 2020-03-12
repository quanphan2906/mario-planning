import React, { Component } from 'react'
import { Redirect } from "react-router-dom"

import Notifications from "./Notifications"
import ProjectList from "../projects/ProjectList"

import services from "../../services"

export default class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            projects: [],
        }
    }
    syncData = (docs) => {
		this.setState({
			projects: docs
        })
    }
    componentDidMount() {
        services.syncWithFirebase("projects", this.syncData, 3);
    }
    render() {
        const { user } = this.props;
        const { projects } = this.state;
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
