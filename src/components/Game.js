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

    if (props.online) {
        client = new W3CWebSocket('ws://localhost:3001');
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

    const handleClose = () => {
        props.toggleModal()
    }
    
    useEffect(() => {
        document.addEventListener('keydown', event => {
            event.preventDefault()
            props.handleKeypress(event.key)
        })
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
    let winner = props.position[0].dead? 2 : 1
    return (
    <div className="grid-container">
        <Modal 
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              show={props.showModal}
              onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Player {winner} is the winner!</Modal.Title>
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
        health: state.health,
        showModal: state.modal,
        position: state.position
    }
}

export default connect(MapStateToProps, actions)(Game)