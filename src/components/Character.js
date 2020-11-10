import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'


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

    return (
        <h2>{props.direction}</h2>
    )
}

function mapStateToProps(state) {
    return {
        direction: state.direction
    }
}

export default connect(mapStateToProps, actions)(Character)