import React, { useEffect } from 'react'
import Game from './Game'
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket('ws://localhost:3001');


const App = () => {

    useEffect(() => {
        console.log('useEffect called')
        client.onopen = (...parameters) => {
            console.log('web socket client connected!', parameters)
        }
        client.onmessage = (message) => {
            console.log(message);
          };
    }, [])

    return (
        <div>
            <Game client={client} />
        </div>
    )
}

export default App