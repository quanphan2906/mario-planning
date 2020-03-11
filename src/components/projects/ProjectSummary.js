import React from 'react'
import { withRouter } from "react-router-dom"

function ProjectSummary(props) {
    const { project } = props;
    const toProjectDetail = (e) => {
        props.history.push("project/" + project.id)
    }
    return (
        <div className="card z-depth-0 project-summary" onClick={toProjectDetail}>
            <div className="card-content grey-text text-darken-3">
                <span className="card-title text-darken-3">{project.title}</span>
                <p>Posted by the Net Ninja</p>
                <p className="grey-text">3rd September</p>
            </div>
        </div>
    )
}

export default withRouter(ProjectSummary)
