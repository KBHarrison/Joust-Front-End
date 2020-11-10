import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import Knight from '../assets/knight1.png'
import '../styles/knight.css'


const Character = (props) => {
    useEffect(() => {
        document.addEventListener('keydown', event => {
            switch (event.key) {
                case "ArrowUp":
                    props.updateDirection("up")
                    break
                case "ArrowDown":
                    props.updateDirection("down")
                    break
                case "ArrowLeft":
                    props.updateDirection("left")
                    break                
                case "ArrowRight":
                    props.updateDirection("right")
                    break
                default:
                    break
            }
        })
    }, [])

    let class_name = "knight " + props.direction
    return (
        <img src={Knight} className={class_name}/>
    )
}

function mapStateToProps(state) {
    return {
        direction: state.direction
    }
}

export default connect(mapStateToProps, actions)(Character)