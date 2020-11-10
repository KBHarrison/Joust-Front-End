import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { Provider } from 'react-redux'
import reducers from './reducers'
import { createStore } from 'redux'

const initialStore = createStore(
        reducers,
        {}
    )

ReactDOM.render(
    <Provider store={initialStore}>
        <App />
    </Provider>,
    document.querySelector('#root')
)