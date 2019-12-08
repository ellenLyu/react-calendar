import React from 'react'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction"; // handle click

import { PostData } from '../services/PostData';
import PopupWindow from './PopupWindow';

import '@fullcalendar/core/main.css';
import '@fullcalendar/list/main.css';

/**
 * The class to render Calendar screen.
 */
export default class CalendarScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            date: '',
            startTime: 34200, // 09:30, // 01:00 = 3600, 02:00 = 7200
            endTime: 64800,  // 18:00
        };

        // Bind the modal function with props.
        
        this.updateData = this.updateData.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
        this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
    }

    handleDateClick = (arg) => {
        this.setState({ date: arg.dateStr });
        this.setState({ showModal: true });
    }

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
            date: this.state.date,
            startTime: this.state.startTime,
            endTime: this.state.endTime,
        };

        if (this.state.date) {
            PostData('updateData', postData);
        }
        
        // this.displayData();

    }

    // displayData() {
    //     let data = JSON.parse(localStorage.getItem("userData"));
    //     let postData = { user_id: data.userData.user_id };

    //     if (data) {
    //         PostData('displayData', postData).then((result) => {
    //             let responseJson = result;
    //             if (responseJson.timeData) {
    //                 this.setState({ data: responseJson.timeData });
    //             }
    //         });
    //     }
    // }

    render() {
        return (
            <div>
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
            </div>
        )
    }
}