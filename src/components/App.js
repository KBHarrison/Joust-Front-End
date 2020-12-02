import React, { useEffect } from 'react'
import Character from './Character'
import Game from './Game'
import { connect } from 'react-redux'
import * as actions from '../actions'

const App = () => {

    return (
        <div>
            <Game />
        </div>
    )
}

export default connect(null, actions)(App)