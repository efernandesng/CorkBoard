import React from 'react'
import App, { Container, AppContext } from 'next/app'
import withRedux from 'next-redux-wrapper'
import { Provider } from 'react-redux'
import { Store } from 'redux'
import { IncomingMessage } from 'http'
import { NextPageContext } from 'next'
import { initStore, AppState } from '@store/index'
import actions from '@store/root-actions'

interface SessionIncomingMessage extends IncomingMessage {
  user: any
  session: any
}

interface NextPageContextWithStore extends NextPageContext {
  store: Store
}

class MyApp extends App<{ store: Store<AppState> }> {
  public static async getInitialProps({ Component, ctx }: AppContext) {
    const sCtx = ctx as NextPageContextWithStore
    const req = ctx.req as SessionIncomingMessage

    if (req && req.session.passport) {
      // req.user or req.session.passport.user <- User data
      sCtx.store.dispatch(actions.auth.setUserData(req.user))
    }

    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {}

    return { pageProps }
  }

  public render() {
    const { Component, pageProps, store } = this.props
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

/**
 * withRedux HOC
 * NextJS wrapper for Redux
 */
export default withRedux(initStore)(MyApp)
