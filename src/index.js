import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { Provider } from 'react-redux'
import reducers from './reducers'
import { applyMiddleware, createStore, compose } from 'redux'
// import checkCollision from './middleware/checkCollisions'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialStore = createStore(
        reducers,
        {},
        // composeEnhancers(
        //     applyMiddleware(checkCollision),
        // )
    )

ReactDOM.render(
    <Provider store={initialStore}>
        <App />
    </Provider>,
    document.querySelector('#root')
)