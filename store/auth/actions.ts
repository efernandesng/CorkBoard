import { createAction, createStandardAction } from 'typesafe-actions'
import { Action } from 'redux'

export enum AuthActionTypes {
  LOGIN_REQUEST = 'AUTH_LOGIN_REQUEST',
  LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS',
  LOGIN_FAIL = 'AUTH_LOGIN_FAIL',

  LOGOUT_REQUEST = 'AUTH_LOGOUT_REQUEST',
  LOGOUT_SUCCESS = 'AUTH_LOGOUT_SUCCESS',
  LOGOUT_FAIL = 'AUTH_LOGOUT_FAIL',
}

export type AuthAction =
  | Action<AuthActionTypes.LOGIN_REQUEST>
  | Action<AuthActionTypes.LOGIN_SUCCESS>
  | Action<AuthActionTypes.LOGIN_FAIL>
  | Action<AuthActionTypes.LOGOUT_REQUEST>
  | Action<AuthActionTypes.LOGOUT_SUCCESS>
  | Action<AuthActionTypes.LOGOUT_FAIL>

export const setUserData = createStandardAction('SET_USER_DATA')<any>()

// export const loginWithGoogle = (): AuthAction => ({
//   type: AuthActionTypes.LOGIN_REQUEST,
//   provider: 'google',
// })

// export const increment: AuthAction = {
//   type: AuthActionTypes.INCREMENT,
// }

// export const decrement: AuthAction = {
//   type: AuthActionTypes.DECREMENT,
// }

// export const login = createAction('AUTH_LOGIN_REQUEST', action => {
//   return (username: string, password: string) =>
//     action({ provider: 'local', username, password })
// })

// export const loginWithGoogle = createAction('AUTH_LOGIN_REQUEST', action => {
//   return () => action({ provider: 'google' })
// })

// export const loginWithFacebook = createAction('AUTH_LOGIN_REQUEST', action => {
//   return () => action({ provider: 'google' })
// })
