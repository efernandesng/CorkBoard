import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

import rootReducer, { RootState } from './root-reducer'

/**
 * initStore
 * Initialise and export redux store
 */
export const initStore = (initialState: {} = {}) => {
  return createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}

export type AppState = RootState
