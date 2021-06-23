import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// import reducers
import getUserReducer from "./ducks/getUsersDuck";

// create store
const rootReducer = combineReducers({
    getUserReducer,
})

// configure redux extension in devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
    const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
    return store;
}