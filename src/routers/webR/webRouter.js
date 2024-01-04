import { Router } from 'express'
import { sessionsRouter } from './sessionsRouter.js'
import { usersRouter } from './usersRouter.js'

export const webRouter = Router()

webRouter.use(sessionsRouter)
webRouter.use(usersRouter)

