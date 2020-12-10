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

    const handleClose = () => {
        props.toggleModal()
    }

    const keydownListener = (event) => {
        event.preventDefault()
        if (!props.online) {
            props.handleKeypress(event.key)
        } else {
            movePlayer(directions[event.key])
        }
    }
    
    useEffect(() => {
        props.resetGame()
        document.addEventListener('keydown', keydownListener)
        if (props.online) {
            client = new W3CWebSocket('ws://localhost:3001');
            client.onopen = (...parameters) => {
                client.send(JSON.stringify({
                    type: "game_info"
                }))

                console.log('web socket client connected!', parameters)
            }
            client.onmessage = (message) => {
                let data = JSON.parse(message.data)
                if (data.source === "game_info") {
                    games = data.data

                    client.send(JSON.stringify({
                        type: "join",
                        gameID: games[0].id
                    }))
                }
                if (data.source === "join") {
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
        } else {
            props.initializeOfflineMode()
        }
        return () => {
            document.removeEventListener('keydown', keydownListener)
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
    let p2Health = []
    let health = []
    if (props.online) {
        for (let player of props.position) {
            let playerHealth = []
            for (let i = 0; i < player.health; i++) {
                playerHealth.push(<img className="health" src={Heart} style={{height: '40px', width: '40px'}} key={i}></img>)
            }
            health.push(playerHealth)
        }
    } else {
        for (let i = 0; i < props.health[0]; i++) {
            p1Health.push(<img className="health" src={Heart} style={{height: '40px', width: '40px'}} key={i}></img>)
        }
        for (let i = 0; i < props.health[1]; i++) {
            p2Health.push(<img className="health" src={Heart} style={{height: '40px', width: '40px'}} key={i}></img>)
        }
        health.push(p1Health)
        health.push(p2Health)
    }
    let winner
    
    if (props.position[0] !== undefined) {
        winner = props.position[0].dead ? 2 : 1
    }
    
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
                <Button variant="primary" onClick={props.resetGame}>
                    Yes
                </Button>
            </Modal.Footer>
      </Modal>
        {health.map((hp, i) => {
            return (
                <div className="grid-row">
                    <h1>Player {i + 1} Health: {hp}</h1>
                </div>
            )
        })}
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
        position: state.position,
    }
}

export default connect(MapStateToProps, actions)(Game)