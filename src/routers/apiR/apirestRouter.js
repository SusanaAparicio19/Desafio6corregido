import { Router } from 'express'

import { sessionsRouter } from './sessionsRouter.js'

import { usersRouter } from './usersRouter.js'

export const apiRouter = Router()

apiRouter.use('/sessions', sessionsRouter)
apiRouter.use('/users', usersRouter)

