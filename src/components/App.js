import React, { useEffect } from 'react'
import Game from './Game'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const App = () => {
    return (
        <Router>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">DinoBash</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/">Play Locally</Nav.Link>
                    <Nav.Link as={Link} to="/online">Play Online</Nav.Link>
                </Nav>
            </Navbar>
            <br />
            <Switch>
                <Route path="/online">
                    <Game key="online" online={true} />
                </Route>
                <Route path="/">
                    <Game key="local" online={false} />
                </Route>
            </Switch>
        </Router>
    )
}

export default App