// import { combineReducers } from 'redux'
import { createReducer } from 'typesafe-actions'
import { setUserData } from './actions'

const auth = createReducer({ isLogged: false, user: null }).handleAction(
  setUserData,
  (state, action) => ({ isLogged: true, user: action.payload })
)

export default auth
export type AuthState = ReturnType<typeof auth>
