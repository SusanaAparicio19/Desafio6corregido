import { Router } from 'express'
import passport from 'passport'
import { UsersManager } from '../../models/User.js'
import { soloLogueadosWeb } from '../../middlewares/auth.js'


export const usersRouter = Router()

// registro

usersRouter.get('/register', function registerView(req, res) {
  res.render('register.handlebars', {
    pageTitle: 'Registro'
  })
})


usersRouter.post('/register',
  passport.authenticate('register', {
    successRedirect: '/login',
    failureRedirect: '/register',
  })
)

//reset

usersRouter.get('/resetpassword', function registerView(req, res) {
  res.render('resetpassword.handlebars', {
    pageTitle: 'Reestablecer contraseña'
  })
})

usersRouter.post('/resetpassword', async function registrarUsuario(req, res) {
  try {
    await UsersManager.resetearContrasenia(req.body.email, req.body.password)
    res.redirect('/login')
  } catch (error) {
    console.log(error)
    res.redirect('/resetpassword')
  }
})

// perfil

usersRouter.get('/profile', soloLogueadosWeb, function profileView(req, res) {
  res.render('profile.handlebars', {
    pageTitle: 'Perfil',
    user: req.user
  })
})
