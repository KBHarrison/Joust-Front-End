import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Character from './Character'
import '../styles/knight.css'


const Game = (props) => {
    useEffect(() => {
        document.addEventListener('keydown', event => {
            props.handleKeypress(event.key)
        })
    }, [])
    return (
    <div>
        <Character
        id={0} />
        <Character 
        id={1} />
    </div>)

}

export default connect(null, actions)(Game)