import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Character from './Character'
import '../styles/knight.css'
import Heart from '../assets/heart.png'


const Game = (props) => {
    useEffect(() => {
        document.addEventListener('keydown', event => {
            props.handleKeypress(event.key)
        })
    }, [])
    let p1Health = []
    let p2health = []
    for (let i = 0; i < props.health[0]; i++) {
        p1Health.push(<img src={Heart} style={{height: '40px', width: '40px'}} key={i}></img>)
    }
    for (let i = 0; i < props.health[1]; i++) {
        p2health.push(<img src={Heart} style={{height: '40px', width: '40px'}} key={i}></img>)
    }
    return (
    <div class="container">
        <h1 class="float-right">Player 1 Health: {p1Health}</h1>
        <h1 class="float-left">Player 2 Health: {p2health}</h1>
        <Character
        id={0} />
        <Character 
        id={1} />
    </div>)

}

function MapStateToProps(state) {
    return {
        health: state.health
    }
}

export default connect(MapStateToProps, actions)(Game)