import React from 'react';
import { Modal, ModalHeader, ModalBody, Row, Col, Button } from 'reactstrap';
import { connect } from "react-redux";
import { toggleModal, addMarker, setLength, setMarkers } from "../actions";
import MyForm from "./MyForm";
import Map from '../components/Map';

class MyModal extends React.Component {
  state = {
    isAddingMarker: false
  };

  clickHandler = () => {
    this.setState({
      isAddingMarker: true
    })
  };

  addMarker = (marker) => {
    const { addMarker } = this.props;
    addMarker(marker);
    this.setState({
      isAddingMarker: false
    })
  };

  changeMarker = (markers, length) => {
    const { setLength, setMarkers } = this.props;
    setLength(length);
    setMarkers(markers)
  };

  render() {
    const { modal, toggleModal, markers, currentPosition } = this.props;
    const { isAddingMarker } = this.state;
    return (
      <Modal isOpen={modal} toggle={toggleModal} className="my-modal" size="lg">
        <ModalHeader toggle={toggleModal}>Add new path</ModalHeader>
        <ModalBody>
          <Row>
            <Col lg={6} className="order-2 order-lg-1">
              <MyForm />
            </Col>
            <Col lg={6} style={{position: 'relative'}} className="order-1 order-lg-2">
              <Button className="add-marker" color="primary" onClick={this.clickHandler}>Add marker</Button>
              <Map
                height="600px"
                markers={markers}
                draggable={true}
                currentPosition={currentPosition}
                isAddingMarker={isAddingMarker}
                addMarker={this.addMarker}
                changeMarker={this.changeMarker}
                // onAddMarker
              />
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    )
  }
}

export default connect(
  (({ modal, map }) => ({
    modal,
    markers: map.markers,
    currentPosition: map.currentPosition
  })),
  {
    toggleModal,
    addMarker,
    setLength,
    setMarkers
  }
)(MyModal);