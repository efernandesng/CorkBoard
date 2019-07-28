import React from 'react'
import App, { Container, AppContext } from 'next/app'
import withRedux from 'next-redux-wrapper'
import { Provider } from 'react-redux'
import { Store } from 'redux'
import { initStore, AppState } from '../store'
import { IncomingMessage } from 'http'
import { NextPageContext } from 'next'

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

    // sCtx.store.dispatch()

    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {}

    const req = ctx.req as SessionIncomingMessage
    // TODO: save user data on store
    // if (req && req.session.passport) {

    //   // req.user or req.session.passport.user <- User data
    //   //pageProps.user = req.user
    // }

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
