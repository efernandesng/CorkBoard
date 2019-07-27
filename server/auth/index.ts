import express, { Router } from 'express'
import google from './google'
import facebook from './facebook'

const router = Router()

router.use('/', google.routes())
router.use('/', facebook.routes())

export default router
