// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

import Cargo from "App/Models/Cargo"

export default class CargosController {
    
    public async store({ request, response, auth }) {

        const postSchema = schema.create({
            nombre: schema.string({ trim: true }, [
                rules.maxLength(255),
                rules.unique({table: 'cargos', column: 'nombre'})
            ]),
        })

        const payload: any = await request.validate({ schema: postSchema })

        try{
            await auth.use('api').authenticate()
            console.log(auth.use('api').user!)
            
            const cargo: Cargo = await Cargo.create(payload)

            return response.ok(cargo)
        }catch{
            response.status(400).json({
                mensaje: 'Error al insertar Cargo'
           })
        }
    }

    public async index({ response }) {
        try{
            const cargos = await Cargo.all()

            return response.ok(cargos)
        }catch{
            response.status(401).json({
                mensaje: 'Algo salió mal'
           })
        }
    }

    public async show({ params, response, auth }) {

        try{
            await auth.use('api').authenticate()
            console.log(auth.use('api').user!)

            const { id }: { id: Number } = params

            const cargo: any = await Cargo.find(id)
            if (!cargo) {
                return response.notFound({ message: 'Cargo not found' })
            }

            return response.ok(cargo)
        }catch{
            response.status(401).json({
                mensaje: 'Algo salió mal'
           })
        }
    } 

    public async update({ request, params, response, auth }) {

        const cargoSchema = schema.create({
            nombre: schema.string({}, [
                rules.maxLength(255),
                rules.unique({table: 'cargos', column: 'nombre'})
            ])
        })

        const payload: any = await request.validate({ schema: cargoSchema })

        try{
            await auth.use('api').authenticate()
            console.log(auth.use('api').user!)

            const { id }: { id: Number } = params

            const cargo: any = await Cargo.find(id)

            cargo.nombre = payload.nombre

            await cargo.save()

            return response.ok(cargo)
        }catch{
            response.status(500).json({
                mensaje: 'Error al actualizar Cargo'
           })
        }
    }

    public async destroy({ params, response, auth }) {

        try{
            await auth.use('api').authenticate()
            console.log(auth.use('api').user!)

            const { id }: { id: Number } = params

            const cargo: any = await Cargo.find(id)
            if (!cargo) {
                return response.notFound({ message: 'Cargo not found' })
            }

            await cargo.delete()

            return response.ok({ message: 'Cargo deleted successfully.' })
        }catch{
            response.status(500).json({
                mensaje: 'Error al eliminar Reservación'
           })
        }
    }
}
