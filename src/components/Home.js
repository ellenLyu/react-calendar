import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Calendar from './Calendar';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../main.scss' // webpack must be configured to do this

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
        localStorage.setItem("userData", '');
        localStorage.clear();
        this.setState({ redirectToReferrer: true });
    }

    render() {
        if (this.state.redirectToReferrer || !localStorage.getItem('userData')) {
            return (<Redirect to={'/login'} />)
        }

        return (
            <div id="Body">
                <div className="col-sm-10 offset-sm-1 text-right">
                    <input type="button" className="btn btn-primary " value="Logout" onClick={this.logout} />  
                    <hr />
                    <Calendar />
                </div>
            </div>
        );
    }
}

export default Home;