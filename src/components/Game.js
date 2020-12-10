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
let directions = Object.freeze({
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowRight: "right",
    ArrowLeft: "left",
    w: "up",
    s: "down",
    d: "right",
    a: "left"
})

const Game = (props) => {
    let games = []

    if (props.online) {
        client = new W3CWebSocket('ws://localhost:3001');
    }

    const handleClose = () => {
        props.toggleModal()
    }
    
    useEffect(() => {
        document.addEventListener('keydown', event => {
            if (!props.showModal) {
                event.preventDefault()
                if (!props.online) {
                    props.handleKeypress(event.key)
                } else {
                    movePlayer(directions[event.key])
                }
            }
        })
        if (props.online) {
            client.onopen = (...parameters) => {
                client.send(JSON.stringify({
                    type: "game_info"
                }))

                console.log('web socket client connected!', parameters)
            }
            client.onmessage = (message) => {
                console.log(message)
                let data = JSON.parse(message.data)
                if (data.source === "game_info") {
                    games = data.data

                    client.send(JSON.stringify({
                        type: "join",
                        gameID: games[0].id
                    }))
                }
                if (data.source === "join") {
                    console.log(data)
                    for (let player of data.data.players) {
                        props.addPlayer(player)
                    }
                }
                if (data.source === "move") {
                    for (let player of data.data) {
                        props.receivePosition(player)
                    }
                }
                if (data.source === "error") {
                    console.error(data.message)
                }
            };
        }
    }, [])

    const movePlayer = function(direction) {
        const message = {
            type: "move",
            direction: direction
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
        <Modal show={props.showModal} onHide={handleClose}>
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
        health: state.health,
        showModal: state.modal
    }
}

export default connect(MapStateToProps, actions)(Game)