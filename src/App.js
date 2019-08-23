import React from 'react';
import './App.css';
import Graph from "./components/Graph";
import AlertForm from "./components/AlertForm";
import SituationTable from "./components/SituationTable";
import { Navbar, Nav} from 'react-bootstrap';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import {LinkContainer} from "react-router-bootstrap";
import {Link} from "react-router-dom";
import UpdateData from "./components/UpdateData";


function App() {
  return (
          <Router>
                  <Navbar bg="light" variant="light">
                      <Navbar.Brand><Link to="/alertform">AlertSystem</Link></Navbar.Brand>
                      <Nav className='mr-auto'>
                          <LinkContainer to="/alertform"><Nav.Link>ADD ALERT</Nav.Link></LinkContainer>
                          <LinkContainer to="/alertlist"><Nav.Link>ALERT LIST</Nav.Link></LinkContainer>
                      </Nav>
                  </Navbar>
            <Switch>
              <Route exact path='/alertform' component={AlertForm}/>
              <Route path='/alertlist' component={SituationTable}/>
              <Route path='/graph/:id' component={Graph}/>
              <Route path='/updatedata/:id' component={UpdateData}/>
            </Switch>
          </Router>
  );
}

export default App;
