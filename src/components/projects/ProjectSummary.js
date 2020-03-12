import React from 'react'
import { withRouter } from "react-router-dom"

function ProjectSummary(props) {
    const { project } = props;
    const toProjectDetail = (e) => {
        props.history.push({
            pathname: "project/" + project.id,
            state: {
                project
            }
        })
    }
    return (
        <div className="card z-depth-0 project-summary" onClick={toProjectDetail}>
            <div className="card-content grey-text text-darken-3">
                <span className="card-title text-darken-3">{project.title}</span>
                <p>Posted by the {project.authorFirstName + " " + project.authorLastName} </p>
                <p className="grey-text"> Created at {project.createdAt.toDate().toString().slice(4, 16)} </p>
            </div>
        </div>
    )
}

export default withRouter(ProjectSummary)
