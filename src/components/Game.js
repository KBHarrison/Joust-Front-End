import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Character from './Character'
import '../styles/knight.css'
import Heart from '../assets/heart.png'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

let client;


const Game = (props) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)

    if (props.online) {
        client = new W3CWebSocket('ws://localhost:3001');
    }
    
    useEffect(() => {
        document.addEventListener('keydown', event => {
            event.preventDefault()
            props.handleKeypress(event.key)
        })
        if (props.online) {
            client.onopen = (...parameters) => {
                console.log('web socket client connected!', parameters)
            }
            client.onmessage = (message) => {
                console.log(message)
                if (JSON.parse(message.data).position) {
                    props.receivePosition(JSON.parse(message.data))
                }
            };
        }
    }, [])

    const sendThing = function() {
        const message = {
            type: "move",
            direction: "left"
        }
        client.send(JSON.stringify(message))
    }

    let p1Health = []
    let p2health = []
    for (let i = 0; i < props.health[0]; i++) {
        p1Health.push(<img className="health" src={Heart} style={{height: '40px', width: '40px'}} key={i}></img>)
    }
    for (let i = 0; i < props.health[1]; i++) {
        p2health.push(<img className="health" src={Heart} style={{height: '40px', width: '40px'}} key={i}></img>)
    }
    return (
    <div className="grid-container">
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Thanks for playing!</Modal.Title>
            </Modal.Header>
            <Modal.Body>Would you like to play again?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    No
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Yes
                </Button>
            </Modal.Footer>
      </Modal>
        <div className="grid-row">
                <h1>Player 1 Health: {p1Health}</h1>
        </div>
        <div className="grid-row">
                <h1>Player 2 Health: {p2health}</h1>
        </div>
        <div className="game-box">
            <Character
            id={0} />
            <Character 
            id={1} />
        </div>
    </div>)

}

function MapStateToProps(state) {
    return {
        health: state.health
    }
}

export default connect(MapStateToProps, actions)(Game)