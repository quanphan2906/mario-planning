import React, { Component } from 'react'
import { Redirect } from "react-router-dom"

import services from "../../services"

export default class CreateProject extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: "",
            content: "",
            errors: {
                title: "",
                content: "",
            }
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
            errors: {
                ...this.state.errors,
                [e.target.id]: "",
            }
        })
    }
    handleSubmit = async (e) => {
        e.preventDefault();

        const { title, content, errors } = this.state;
        if (!title) {
            errors.title = "Please input the project's title"
        }
        if (!content){
            errors.content = "Please input the project's content"
        }
        if (title && content) {
            let newProjectObj = {
                title,
                content,
                authorFirstName: "Net",
                authorLastName: "Ninja",
                authorId: "12345",
                createdAt: new Date(),
            }

            services.create("projects", newProjectObj);
            
        } else {
            this.setState({
                errors
            })
        }
    }
    render() {
        if (!this.props.user) return <Redirect to="/signin"/>
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Create New Project</h5>
                    <div className="input-field">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" onChange={this.handleChange}/>
                        <div>{this.state.errors.title}</div>
                    </div>
                    <div className="input-field">
                        <label htmlFor="content">Project Content</label>
                        <textarea id="content" className="materialize-textarea" onChange={this.handleChange}></textarea>
                        <div>{this.state.errors.content}</div>
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">Create</button>
                    </div>
                </form>
            </div>
        )
    }
}