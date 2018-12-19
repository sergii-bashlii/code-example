import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { toggleModal, setLength, setMarkers, addPaths } from '../actions';

class MyForm extends Component {
  state = {
    title: '',
    shortDescription: '',
    fullDescription: '',
    invalid: false
  };

  onChangeHandler(key, value) {
    this.setState({
      [key]: value
    });
    if (key === 'shortDescription') {
      this.setState({
        invalid: value.length > 160
      })
    }
  }

  addPath = () => {
    const { title, shortDescription, fullDescription } = this.state;
    const { toggleModal, length, markers, setLength, setMarkers, addPaths } = this.props;

    addPaths({
      title,
      shortDescription,
      fullDescription,
      favorite: false,
      length,
      markers
    })
      .then(() => {
        toggleModal();
        setLength(0);
        setMarkers([]);
      })
      .catch((error) => {
        alert('Error adding document');
        console.error("Error adding document: ", error);
      });
  };

  render() {
    const { title, shortDescription, fullDescription, invalid } = this.state;
    const { length } = this.props;
    return (
      <Form>
        <FormGroup>
          <Label for="title">Title</Label>
          <Input id="title" value={title} onChange={(e) => this.onChangeHandler('title', e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="shortDescription">Short description</Label>
          <Input invalid={invalid} type="textarea" id="shortDescription" value={shortDescription} onChange={(e) => this.onChangeHandler('shortDescription', e.target.value)} />
          {invalid && <p className="small">Maximum 160 characters</p>}
        </FormGroup>
        <FormGroup>
          <Label for="fullDescription">Full description</Label>
          <Input style={{height: '150px'}} type="textarea" id="fullDescription" value={fullDescription} onChange={(e) => this.onChangeHandler('fullDescription', e.target.value)} />
        </FormGroup>
        <h4 className="length">Length {length} km</h4>
        <Button color="primary" className="add-path" onClick={this.addPath}>Add path</Button>
      </Form>
    );
  }
}

export default connect(
  ({ map }) => ({
    length: map.length,
    markers: map.markers
  }),
  {
    toggleModal,
    setLength,
    setMarkers,
    addPaths
  }
)(MyForm);