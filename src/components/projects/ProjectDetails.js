import React from 'react'
import { Redirect } from "react-router-dom"

function ProjectDetails(props) {
    if (!props.user) return <Redirect to="/signin"/>

    const id = props.match.params.id;
    const { projects } = props;
    const project = projects.find((item) => {
        return item.id === id;
    })
    return (project) ? (
        <div className="container section project-details">
            <div className="card z-depth-0">
                <div className="card-content">
                    <span className="card-title">{project.title}</span>
                    <p>{project.content}</p>
                </div>
                <div className="card-action grey lighten-4 gret-text">
                    <div>Posted by the {project.authorFirstName + " " + project.authorLastName} </div>
                    <div>Created at {project.createdAt.toDate().toString().slice(4, 16)}</div>
                </div>
            </div>

        </div>
    ) : (<div>Loading...</div>)
}

export default ProjectDetails
