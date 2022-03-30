// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
//import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
//import Database from '@ioc:Adonis/Lucid/Database'

import User from "App/Models/User"

export default class UsersController {
    public async store({request, response}){

        const newPostSchema = schema.create({
            /*
            nombre: schema.string({
                trim: true,}, [
                rules.maxLength(100)
            ]),
            apellidos: schema.string({
                trim: true,}, [
                rules.maxLength(200)
            ]),
            telefono: schema.string({}, [
                rules.maxLength(10),
                rules.minLength(10)
            ]),
            */
            email: schema.string({}, [
                rules.email(),
                rules.unique({table: 'users', column: 'email'}),
            ]),
            password: schema.string({}, [
                rules.confirmed(),
                rules.minLength(8)
            ]),
            cargo:schema.number([])
        })

        const payload = await request.validate({ schema: newPostSchema })
        //const userData = request.only('email', 'password')
        /* const user = await User.create({cargo:3, nombre:payload.nombre, apellidos:payload.apellidos, telefono:payload.telefono,
        email:payload.email, password:payload.password})
        */
        //const user = await User.create(payload)
        try{
            const user = await User.create({cargo:payload.cargo, email:payload.email, password:payload.password})

            return response.created({
                status: true,
                data: user
            })  
        } catch{
            response.status(400).json({
                mensaje: 'Error al registrar'
            })
        }
    }

    public async login({request, response, auth}){

        try{
            const {email, password} = request.only(['email', 'password'])
            const token = await auth.attempt(email, password)

            return response.ok(token)
        }catch{
            response.status(400).json({
                mensaje: 'Error al entrar'
              })
        }
    } 

    public async IsAdmin({response, auth}){
        try{
            const user =  await auth.use('api').authenticate()
            if(user.cargo == 5)
            {
                return true
            }
            else
            {
                return false
            }
        }
        catch{
            response.status(500).json({
                mensaje: 'Usuario no encontrado'
            })
        }
    }
}