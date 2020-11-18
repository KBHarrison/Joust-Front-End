import React, { useEffect } from 'react'
import Character from './Character'
import Game from './Game'
import { connect } from 'react-redux'
import * as actions from '../actions'

const App = (props) => {

    return (
        <div>
            <h1>It's me, ya boi {props.health}</h1>
            <Game />
        </div>
    )
}

function mapStateToProps(state) {
    return {
        direction: state.position[0].direction,
        x: state.position[0].x,
        y: state.position[0].y,
        health: state.health
    }
}

export default connect(mapStateToProps, actions)(App)