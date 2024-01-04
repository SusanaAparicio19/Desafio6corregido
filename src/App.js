import express from 'express';
import mongoose from 'mongoose';
import { engine } from 'express-handlebars';
import { ProductManagerMongo } from './ProductManagerMongo.js';
import { PORT, MONGODB_CNX_STR } from './config.js';
import { productsRouter } from './routers/productsRouter.js';
import { webRouter } from "./routers/webR/webRouter.js"
import sfs from 'session-file-store'
import { apiRouter } from './routers/apiR/apirestRouter.js';
import { sessions } from './middlewares/sessions.js'
import { autenticacion } from './middlewares/passport.js';


export const ProdMan = new ProductManagerMongo({ path: './db/products.json' });

await mongoose.connect(MONGODB_CNX_STR)
  console.log(`Base de Datos Conectada "${MONGODB_CNX_STR}"`)

const app = express()

app.engine('handlebars', engine())

app.listen(PORT, async () => {
  console.log(`Conectado al puerto ${PORT}`);
});


app.set('views', './views')
app.set(`view engine`, 'handlebars')

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use('/static', express.static('./static'))


app.use('/api/products', productsRouter);
app.use(sessions)
app.use(autenticacion)
app.use('/', webRouter)
app.use('/api',apiRouter)





