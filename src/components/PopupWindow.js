import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import TimePicker from 'react-bootstrap-time-picker';

class PopupWindow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        }

    };
    
    render() {
        return (
            <Modal show={this.props.showModal} onHide={this.props.closeModal}>
                <Modal.Header closeButton={this.props.closeModal}>
                    <Modal.Title>{this.props.modalTitle}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form>
                        <div className="form-group row align-items-center">
                            <label htmlFor="start" className="col-form-label col-sm-4 text-right">Start Time: </label>
                            <TimePicker className="col-sm-4" id="startTime" name="startTime"
                                start="06:00" end="19:00" initialValue="09:30" value={this.props.startTime}
                                onChange={this.props.handleStartTimeChange} />
                        </div>

                        <div className="form-group row align-items-center">
                            <label htmlFor="end" className="col-form-label col-sm-4 text-right">End Time: </label>
                            <TimePicker className="col-sm-4" id="endTime" name="endTime"
                                start="06:00" end="19:00" initialValue="18:00" value={this.props.endTime}
                                onChange={this.props.handleEndTimeChange} />
                        </div>
                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.closeModal}>Close</Button>
                    <Button variant="primary" onClick={this.props.save}>Save</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default PopupWindow;