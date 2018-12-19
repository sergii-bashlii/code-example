import React from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { toggleModal } from '../actions/index';

const Header = ({ toggleModal }) => (
  <header>
    <h1>Saunter</h1>
    <Button color="primary" onClick={toggleModal}>Add Path</Button>
  </header>
)

export default connect(
  null,
  { toggleModal }
)(Header);