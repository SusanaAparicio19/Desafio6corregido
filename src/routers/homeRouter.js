import { Router } from 'express'
import { ProdMan } from "../App.js"
export const homeRouter = Router()


homeRouter.get('/home', (req, res) => {
  const user = req.session && req.session.user; // Verificar si req.session está definido
  if (user) {
    const mensajeBienvenida = `Bienvenido, ${user.nombre} ${user.apellido} (${user.email})`;
    res.render('main', { titulo: 'Productos', mensajeBienvenida });
  } else {
    res.redirect('/login'); // Redirigir a la página de inicio de sesión si el usuario no está autenticado
  }
});


homeRouter.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', { titulo: 'Productos En Tiempo Real' })
})