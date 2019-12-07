import React from 'react'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction" // handle click

import { Modal, Button } from 'react-bootstrap';
import TimePicker from 'react-bootstrap-time-picker';

import { PostData } from '../services/PostData';

/**
 * The class to render Calendar screen.
 */
export default class CalendarScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            date: '',
            startTime: 34200, // 09:30, 01:00 = 3600, 02:00 = 7200
            endTime: 64800,  // 18:00
            
            data: [] // test code
        };

        // Bind the modal function with props.
        this.getInitialState = this.getInitialState.bind(this);
        this.updateData = this.updateData.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.modalTitle = this.modalTitle.bind(this);
        this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
        this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
    }

    getInitialState() {
        return { showModal: false };
    }

    closeModal() {
        this.setState({ showModal: false });
    }

    handleDateClick = (arg) => {
        this.setState({ date: arg.dateStr });
        this.openModal();
    }

    openModal() {
        this.setState({ showModal: true });
    }

    modalTitle() {
        return <Modal.Title>{this.state.date}</Modal.Title>;
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
            PostData('updateTime', postData).then((result) => {
                let responseJson = result;
                this.setState({ data: responseJson.timeData });
            });
        }
        
        // this.displayData();

    }

    displayData() {
        let data = JSON.parse(localStorage.getItem("userData"));
        let postData = { user_id: data.userData.user_id };

        if (data) {
            PostData('displayData', postData).then((result) => {
                let responseJson = result;
                if (responseJson.timeData) {
                    this.setState({ data: responseJson.timeData });
                }
            });
        }
    }

    render() {
        return (

            <div>
                {/* Popup window */}
                <Modal show={this.state.showModal} onHide={this.closeModal}>
                    <Modal.Header closeButton={this.closeModal}>
                        <Modal.Title>{this.state.date}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form>
                        <div className="form-group row align-items-center">
                                <label htmlFor="start" className="col-form-label col-sm-4 text-right">Start Time: </label>
                                <TimePicker className="col-sm-4" id="startTime" name="startTime"
                                    start="06:00" end="19:00" initialValue="09:30" value={this.state.startTime}
                                    onChange={this.handleStartTimeChange} />
                            </div>

                            <div className="form-group row align-items-center">
                                <label htmlFor="end" className="col-form-label col-sm-4 text-right">End Time: </label>
                                <TimePicker className="col-sm-4" id="endTime" name="endTime" 
                                    start="06:00" end="19:00" initialValue="18:00" value={this.state.endTime}
                                    onChange={this.handleEndTimeChange} />
                            </div>
                        </form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>Close</Button>
                        <Button variant="primary" onClick={this.updateData}>Save</Button>
                    </Modal.Footer>
                </Modal>

                {/* Calendar window */}
                <FullCalendar className="col-sm-10"
                    header={{
                        left: 'prev,next today myCustomButton',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                    }}
                    plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
                    defaultView='dayGridMonth'
                    dateClick={this.handleDateClick}
                    // events={[
                    //     { title: 'event 1', date: '2019-12-01' },
                    //     { title: 'event 2', date: '2019-12-02' }
                    //   ]}

                    // events={[
                    //     url: 'http://localhost:8080/react-calendar/backend/api/index.php?tp=display'
                    
                    // ]}
                />
            </div>
        )
    }


}