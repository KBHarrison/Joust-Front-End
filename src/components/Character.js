import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Knight from '../assets/knight1.png'
import '../styles/knight.css'
import DinoUp from '../assets/dino_up.png'
import DinoDown from '../assets/dino_down.png'
import DinoDead from '../assets/dino_dead.png'



const Character = (props) => {
    const position = props.position[props.id]
    let class_name = "knight " + props.id +  " " + position.direction
    let left = 5*position.x - 1 + '%'
    let top = (5*position.y) + '%'
    let height = "50%"
    let src = position.dead? DinoDead : position.up ? DinoUp : DinoDown
    return (
        <div style={{left, top, position:'absolute', height}}>
            <span className="label">Player {props.id + 1}</span>
            <img  title={"Player " + (props.id + 1)} style={{height}} src={src} className={class_name}/>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        position: state.position
    }
}

export default connect(mapStateToProps, actions)(Character)