import mongoose from 'mongoose';
import { Schema,model } from 'mongoose'
import { randomUUID } from "node:crypto"
import { hashear, hasheadasSonIguales } from "../utils/cripto.js"

const collection = 'usuarios'
const userSchema = new Schema({
    _id: { type: String, default: randomUUID },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
},{
  strict: 'throw',
  versionKey: false,
  methods: {
    infoPublica: function () {
      return {
        email: this.email,
        nombre: this.nombre,
        apellido: this.apellido,
      }
    }
  },
  statics: {
    registrar: async function (reqBody) {
      reqBody.password = hashear(reqBody.password)
      const creado = await mongoose.model(collection).create(reqBody)

      const datosUsuario = {
        email: creado.email,
        nombre: creado.nombre,
        apellido: creado.apellido,
        rol: 'usuario'
      }

      return datosUsuario
    },
    autenticar: async function (username, password) {

      let datosUsuario

      if (username === 'adminCoder@coder.com' && password === 'adminCod3r123') {
        datosUsuario = {
          email: 'admin',
          nombre: 'admin',
          apellido: 'admin',
          rol: 'admin'
        }
      } else {
        const usuario = await mongoose.model(collection).findOne({ email: username }).lean()

        if (!usuario) {
          throw new Error('usuario no encontrado')
        }
        console.log("hashe: ",usuario.password);
        console.log("input: ",password);

        if (!hasheadasSonIguales(password, usuario.password)) {
          throw new Error('los datos no coinciden')
        }

        datosUsuario = {
          email: usuario.email,
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          rol: 'usuario'
        }
      }

      if (!datosUsuario) {
        throw new Error('usuario no encontrado')
      }

      return datosUsuario
    },
    resetearContrasenia: async function (email, password) {
      const newPassword = hashear(password)

      const actualizado = await mongoose.model(collection).findOneAndUpdate(
        { email },
        { $set: { password: newPassword } },
        { new: true }
      ).lean()

      if (!actualizado) {
        throw new Error('usuario no encontrado')
      }

      return actualizado
    }
  }
})

export const UsersManager = model('usuarios', userSchema)