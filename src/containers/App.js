import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Search from './Search';
import PathList from './PathList';
import PathPage from './PathPage';
import MyModal from '../containers/MyModal';

import Header from './Header';

class App extends Component {
  render() {
    return (
      <Router>
        <Container>
          <Header />
          <Row>
            <Col md="6">
              <Search />
              <PathList />
            </Col>
            <Col md="6">
              <Route path="/:id" component={PathPage} />
            </Col>
          </Row>
          <MyModal />
        </Container>
      </Router>
    );
  }
}

export default App;
