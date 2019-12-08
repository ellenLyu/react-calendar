import React from 'react';
import { Redirect } from 'react-router-dom';

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction"; // handle click

import PopupWindow from './PopupWindow';
import { PostData } from '../services/PostData';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../main.scss' // webpack must be configured to do this

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: JSON.parse(localStorage.getItem("userData")).userData.username,
            
            redirectToReferrer: false,

            // states for calendar & popup window
            showModal: false,
            date: '',
            startTime: 34200, // = 09:30,  01:00 = 3600, 02:00 = 7200
            endTime: 64800,  // = 18:00
        };

        this.logout = this.logout.bind(this);
        this.handleDateClick = this.handleDateClick.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
        this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
        this.updateData = this.updateData.bind(this);
    }
    
    logout() {
        localStorage.setItem("userData", '');
        localStorage.clear();
        this.setState({ redirectToReferrer: true });
    }
    
    // methods for calendar
    handleDateClick = (arg) => {
        this.setState({
            date: arg.dateStr,
            showModal: true
        });
    }

    // methods for popup window
    closeModal() {
        this.setState({ showModal: false });
    }

    handleStartTimeChange(time) {
        this.setState({ startTime: time });  // 01:00 = 3600, 02:00 = 7200
    }

    handleEndTimeChange(time) {
        this.setState({ endTime: time });
    }

    updateData(e) {
        this.closeModal();

        e.preventDefault();
        let data = JSON.parse(localStorage.getItem("userData"));
        let postData = {
            user_id: data.userData.user_id,
            username: this.state.username,
            date: this.state.date,
            startTime: this.state.startTime,
            endTime: this.state.endTime,
        };

        if (this.state.date) {
            PostData('updateData', postData);
        }
    }

    render() {
        if (this.state.redirectToReferrer || !localStorage.getItem('userData')) {
            return (<Redirect to={'/login'} />)
        }

        return (
            <div id="Body">
                <div className="col-sm-10 offset-sm-1">
                    <div className="row mx-0 justify-content-end">
                        <p className="mr-3 my-auto">Welcome, {this.state.username}</p>
                        <input type="button" className="btn btn-primary " value="Logout" onClick={this.logout} />
                    </div>
                    
                    <hr />

                    <FullCalendar className="col-sm-10"
                        header={{
                            left: 'prev,next today myCustomButton',
                            center: 'title',
                            right: 'listWeek, dayGridMonth,timeGridWeek,timeGridDay'
                        }}

                        plugins={[
                            dayGridPlugin,
                            interactionPlugin,
                            timeGridPlugin,
                            listPlugin
                        ]}

                        defaultView='dayGridMonth'
                        dateClick={this.handleDateClick} 

                        events={{
                            url: 'http://localhost:8080/react-calendar/backend/api/index.php?tp=displayData'
                        }}
                        
                    />

                    <PopupWindow
                        showModal={this.state.showModal}
                        closeModal={this.closeModal}
                        modalTitle={this.state.date}
                        save={this.updateData}
                        startTime={this.state.startTime}
                        endTime={this.state.endTime}
                        handleStartTimeChange={this.handleStartTimeChange} 
                        handleEndTimeChange={this.handleEndTimeChange}
                    />

                    {/* <Calendar refresh={this.refresh}/> */}
                </div>
            </div>
        );
    }
}

export default Home;