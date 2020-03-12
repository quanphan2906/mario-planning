import React, {Component} from 'react'

import services from "../../services"

import moment from "moment"

class Notifications extends Component {
    constructor(props){
        super(props);
        this.state = {
            notifications: [],
            unsubscribeFunc: () => {}
        }
    }
    syncNotifications = (notifications) => {
        this.setState({
            notifications
        })
    }
    async componentDidMount(){
        this.state.unsubscribeFunc = await services.syncWithFirebase(
            "notifications", 
            this.syncNotifications,
            3);
    }
    componentWillUnmount(){
        this.state.unsubscribeFunc();
    }
    render(){
        const {notifications} = this.state;
        return (
            <div className="section">
                <div className="card z-depth-0">
                    <div className="card-content">
                        <span className="card-title">Notifications</span>
                        <ul className="notifications">
                            {notifications && notifications.map(item => {
                                return (
                                    <li key={item.id}>
                                        <span className="pink-text"> {item.user} </span>
                                        <span> {item.content} </span>
                                        <div className="grey-text note-date">
                                            {moment(item.createdAt.toDate()).fromNow()}
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Notifications