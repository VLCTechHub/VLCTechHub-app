import React from "react"
import { View, StatusBar } from "react-native"

import { Provider } from "react-redux"
import { createStore, compose, applyMiddleware } from "redux"
import thunk from "redux-thunk"

import reducer from "./src/reducers"

import Main from "./src/screens/Main"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const configureStore = initialState =>
    createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk)))

const store = configureStore({})
export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <View style={{ flex: 1 }}>
                    <StatusBar barStyle="dark-content" />
                    <Main />
                </View>
            </Provider>
        )
    }
}
