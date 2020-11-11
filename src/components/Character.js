import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Knight from '../assets/knight1.png'
import '../styles/knight.css'


const Character = (props) => {
    useEffect(() => {
        document.addEventListener('keydown', event => {
            props.handleKeypress(event.key)
        })
    }, [])

    let class_name = "knight " + props.direction
    let left = 100*props.x + 'px'
    let top = (100*props.y + 100) + 'px'
    return (
        <div>
            <img style={{left, top, position:'absolute'}} src={Knight} className={class_name}/>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        direction: state.position.direction,
        x: state.position.x,
        y: state.position.y,
    }
}

export default connect(mapStateToProps, actions)(Character)