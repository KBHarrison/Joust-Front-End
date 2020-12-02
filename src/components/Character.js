import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Knight from '../assets/knight1.png'
import '../styles/knight.css'


const Character = (props) => {
    let class_name = "knight " + props.id +  " " + props.position[props.id].direction
    let left = 5*props.position[props.id].x - 1 + '%'
    let top = (5*props.position[props.id].y) + '%'
    let height = "50%"
    return (
        <div style={{left, top, position:'absolute', height}}>
            <span className="label">Player {props.id + 1}</span>
            <img  title={"Player " + (props.id + 1)} style={{height}} src={Knight} className={class_name}/>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        position: state.position
    }
}

export default connect(mapStateToProps, actions)(Character)