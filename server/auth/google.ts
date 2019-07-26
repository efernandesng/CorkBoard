import express, { Router } from 'express'
import passport from 'passport'
import { Strategy, Profile } from 'passport-google-oauth20'

interface ExtractedProfile {
  id: string
  displayName: string
  imageUrl: string
}

const extractProfile = (profile: Profile): ExtractedProfile => {
  let imageUrl = ''
  if (profile.photos && profile.photos.length) {
    imageUrl = profile.photos[0].value
  }
  return {
    id: profile.id,
    displayName: profile.displayName,
    imageUrl,
  }
}

// Configure the Google strategy for use by Passport.js.
//
// OAuth 2-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Google API on the user's behalf,
// along with the user's profile. The function must invoke `cb` with a user
// object, which will be set at `req.user` in route handlers after
// authentication.
const strategy = new Strategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.BASE_URL}/auth/google/callback`,
    accessType: 'offline',
    userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
  },
  (accessToken, refreshToken, profile, done) => {
    done(null, extractProfile(profile))
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
  const router = express.Router()

  router.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
  )

  router.get(
    '/auth/google/callback',
    passport.authenticate('google'),
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
