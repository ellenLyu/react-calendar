import React from 'react'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction" // time click

import { Modal, Button } from 'react-bootstrap';
import TimePicker from 'react-bootstrap-time-picker';

import { PostData } from '../services/PostData';

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  }
};

/**
 * The class to render Calendar screen.
 */
export default class CalendarScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      date: '',
      startTime: 0,
      endTime: 0
    };

    // Bind the modal function with props.
    this.getInitialState = this.getInitialState.bind(this);
    // this.handleDateClick = this.handleDateClick.bind(this);
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

  /**
   * The function to open modal when the dates are clicked.
   */
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
    console.log(time);     // <- prints "3600" if "01:00" is picked
    this.setState({ startTime: time });
  }

  handleEndTimeChange(time) {
    console.log(time);     // <- prints "3600" if "01:00" is picked
    this.setState({ endTime: time });
  }

  updateTime(e) {

    e.preventDefault();
    let data = JSON.parse(sessionStorage.getItem("userData"));
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
      })
    }
    this.closeModal();
  }

  render() {
    return (

      <div>
        {/* Create the modal window. */}
        <Modal show={this.state.showModal} onHide={this.closeModal}>

          {/* Create the modal header */}
          <Modal.Header closeButton={this.closeModal}>
            <Modal.Title>Create a new event on {this.state.date}</Modal.Title>
          </Modal.Header>

          {/* Create the modal body and the form */}
          <Modal.Body>
            <form onSubmit={this.updateTime} method="post">
              <div class="form-group row align-items-center">
                <label for="title" class="col-form-label col-sm-4 text-right">Event Title:</label>
                <input type="text" class="col-sm-4 form-control" id="title" name="title" required />
              </div>
              <div class="form-group row align-items-center">
                <label for="start" class="col-form-label col-sm-4 text-right">Start Time:</label>
                <TimePicker className="col-sm-4" onChange={this.handleStartTimeChange} value={this.state.startTime} id="startTime" name="startTime" />
              </div>
              <div class="form-group row align-items-center">
                <label for="end" class="col-form-label col-sm-4 text-right">End Time:</label>
                <TimePicker className="col-sm-4" onChange={this.handleEndTimeChange} value={this.state.endTime} id="endTime" name="endTime" />
              </div>
            </form>
          </Modal.Body>

          {/* Create the modal footer, includes the close and the save buttons. */}
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeModal}>Close</Button>
            <Button variant="primary" onClick={this.updateTime}>Save</Button>
          </Modal.Footer>
        </Modal>

        {/* Create the calendar window */}
        <FullCalendar className="col-sm-10"
          header={{
            left: 'prev,next today myCustomButton',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
          }}
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
          defaultView='dayGridMonth'
          dateClick={this.handleDateClick}
        />
      </div>
    )
  }


}