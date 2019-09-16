import { createStore,applyMiddleware } from 'redux'
import { getData } from './actions/action';
import firebase from 'firebase'
import thunk from 'redux-thunk';

function reducer(state = {}, action) {
    // console.log(action)
    switch (action.type) {
        case "WholeData":
            state = action.payload
            return state
        case "addUser":
            state = { ...state, users: !state.users ? [action.payload] : [...state.users, action.payload] }
            return { users: state.users }
        case "del":
            state.users.splice(action.payload, 1)
            return { users: state.users }
        case "updateUser":
            state.users.splice(action.index, 1, action.payload)
            return { users: state.users }
        default:
            return state 
    }
}

export let store = createStore(reducer,applyMiddleware(thunk))

