import React from "react"

import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"

import reducer from "./src/reducers"

import Main from "./src/screens/Main"

const configureStore = initialState => createStore(reducer, initialState, applyMiddleware(thunk))

const store = configureStore({})
export default class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<Main />
			</Provider>
		)
	}
}
