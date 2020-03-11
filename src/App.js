import React, {Component} from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom" 

import Navbar from "./components/layout/Navbar"
import Dashboard from "./components/dashboard/Dashboard"
import ProjectDetails from "./components/projects/ProjectDetails"
import SignIn from "./components/auth/SignIn"
import SignUp from "./components/auth/SignUp"
import CreateProject from "./components/projects/CreateProject"

import services from "./services"

class App extends Component {
	constructor(props){
		super(props);
		this.state = {
			projects: [],
			user: null,
			authReady: false,
		}
	}
	syncData = (docs) => {
		this.setState({
			projects: docs
		})
	}
	trackUser = (user) => {
		this.setState({
			user,
			authReady: true,
		})
	}
	componentDidMount() {
		services.syncWithFirebase("projects", this.syncData);
		services.trackUser(this.trackUser);
	}
	render() {
		const { projects } = this.state;
		return this.state.authReady ? (
			<BrowserRouter>  
			<div className="App">
				<Navbar user={this.state.user} trackUser={this.trackUser}/>
				<Switch>
					<Route 
						exact 
						path={["/", "/dashboard"]} 
						render={(props) => <Dashboard 
													{...props} 
													projects={projects} 
													user={this.state.user}
											/>
								}
					/>
					<Route 
						path="/project/:id"
						render={(props) => <ProjectDetails {...props} projects={projects}/>} />
					<Route 
						path="/signin" 
						render={(props) => <SignIn {...props} trackUser={this.trackUser} />}/>
					<Route path="/signup" component={SignUp}/>
					<Route 
						path="/create" 
						render={(props) => <CreateProject {...props} user={this.state.user} />}/>
				</Switch>
			</div>
			</BrowserRouter>
		) : (
			<div>Loading</div>
		)
	}
}

export default App
