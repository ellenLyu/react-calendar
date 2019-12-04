import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './Home.css';
import { PostData } from '../../services/PostData';

// import '../../styles/react-confirm-alert.css';

import Calendar from '../Calendar/Calendar';

import 'bootstrap/dist/css/bootstrap.min.css';

import '../../main.scss' // webpack must be configured to do this

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            redirectToReferrer: false,
            name: '',
        };

        this.logout = this.logout.bind(this);
    }
    
    logout() {
        sessionStorage.setItem("userData", '');
        sessionStorage.clear();
        this.setState({ redirectToReferrer: true });
    }

    render() {
        if (this.state.redirectToReferrer) {
            return (<Redirect to={'/login'} />)
        }

        return (
            <div id="Body">
                <div className="medium-12 columns">
                    <a href="" onClick={this.logout} className="logout">Logout</a>
                </div>
                <Calendar />
            </div>
        );
    }
}

export default Home;