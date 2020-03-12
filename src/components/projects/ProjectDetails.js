import React, {Component} from 'react'
import { Redirect } from "react-router-dom"

import services from "../../services"

class ProjectDetails extends Component {
    constructor(props){
        super(props);
        this.state = {
            project: {}
        }
    }
    componentDidMount(){
        const { location, match } = this.props;
        if (location.state.project){
            this.setState({
                project: location.state.project
            })
        } else {
            const id = match.params.id;
            services.render("projects", id).then( project => {
                this.setState({
                    project
                });
            })
        }
    }
    render(){
        if (!this.props.user) return <Redirect to="/signin"/>    
        const { project } = this.state;
        var dateObj = "";
        var utcString = "";
        if (project.createdAt) {
            dateObj = new Date(project.createdAt.seconds * 1000);
            utcString = dateObj.toUTCString();
        }
        return (project.title) ? (
            <div className="container section project-details">
                <div className="card z-depth-0">
                    <div className="card-content">
                        <span className="card-title">{project.title}</span>
                        <p>{project.content}</p>
                    </div>
                    <div className="card-action grey lighten-4 gret-text">
                        <div>Posted by the {project.authorFirstName + " " + project.authorLastName} </div>
                        <div>Created at {utcString.slice(4, 16)}</div>
                    </div>
                </div>

            </div>
        ) : (<div>Loading...</div>)
    }
}

export default ProjectDetails
