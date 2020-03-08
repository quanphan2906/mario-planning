import React from 'react'

function ProjectDetails(props) {
    const id = props.match.params.id;
    return (
        <div className="container section project-details">
            <div className="card z-depth-0">
                <div className="card-content">
                    <span className="card-title">Project Title - {id}</span>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste, magni. Eveniet eligendi accusantium aliquam praesentium repellendus, cum provident delectus, itaque quia veritatis commodi ratione alias eum incidunt possimus odit iusto!</p>
                </div>
                <div className="card-action grey lighten-4 gret-text">
                    <div>Posted by the Net Ninja</div>
                    <div>3rd September</div>
                </div>
            </div>

        </div>
    )
}

export default ProjectDetails
