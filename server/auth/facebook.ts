import express, { Router } from 'express'
import passport from 'passport'
import { Strategy, Profile } from 'passport-facebook'

const strategy = new Strategy(
  {
    clientID: process.env.FACEBOOK_APP_ID || '',
    clientSecret: process.env.FACEBOOK_APP_SECRET || '',
    callbackURL: `${process.env.BASE_URL}/auth/facebook/callback`,
  },
  (accessToken, refreshToken, profile, done) => {
    // TODO: User.findOrCreate
    done(null, profile)
  }
)

passport.use(strategy)
passport.serializeUser((user, done) => {
  done(null, user)
})
passport.deserializeUser((obj, done) => {
  done(null, obj)
})

const routes = (): Router => {
  const router = Router()

  router.get('/facebook', passport.authenticate('facebook'))

  router.get(
    '/facebook/callback',
    passport.authenticate('facebook'),
    (req, res) => {
      // const redirect = req.session.oauth2return || '/'
      // delete req.session.oauth2return;
      res.redirect('/')
    }
  )

  return router
}

export default {
  routes,
}
