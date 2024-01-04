import { Router } from 'express';
import passport from 'passport';


export const sessionsRouter = Router()

//login

sessionsRouter.get('/login', function loginView(req, res) {
  res.render('login.handlebars', {
    pageTitle: 'Login'
  })
})

sessionsRouter.post('/login',
  passport.authenticate('login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
  })
);
  

sessionsRouter.get('/githublogin',
  passport.authenticate('github', { scope: ['user:email'] })
)

sessionsRouter.get('/githubcallback',
  passport.authenticate('github', {
    successRedirect: '/profile',
    failureRedirect: '/login',
  })
)

//logout

sessionsRouter.post('/logout', (req, res) => {
  req.logout(error => {
    if (error) {
      console.log(error);
    }
    res.redirect('/login');

  
  });
});

