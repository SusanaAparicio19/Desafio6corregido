import session from 'express-session'
import connectMongo from 'connect-mongo'
import { MONGODB_CNX_STR} from '../config.js'

const store = connectMongo.create({
  mongoUrl: MONGODB_CNX_STR,
  ttl: 60 * 60 * 24 // 1d
})

export const sessions = session({
  store,
  secret: 'MySecret',
  resave: false,
  saveUninitialized: false
})


