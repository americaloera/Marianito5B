// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'

import User from "App/Models/User"

export default class TokensController {
    
    public async index({ response }) {

        const users = await Database
        .from('users')
        .join('cargos', 'users.cargo', '=', 'cargos.id')
        .select('users.email', 'cargos.nombre as cargo', 'users.created_at')

        return response.ok(users)
    }

    public async show({ params, response }) {
        //const { id }: { id: Number } = params

        const user: any = await Database
        .from('users')
        .join('cargos', 'users.cargo', '=', 'cargos.id')
        .select('users.nombre', 'users.apellidos', 'users.telefono', 'cargos.nombre as cargo', 'users.created_at')
        .where('users.id', params.id)

        if (!user) {
            return response.notFound({ message: 'User not found' })
        }

        return response.ok(user)
    } 

    public async update({ request, params, response }) {

        try 
        {
            const userSchema = schema.create({
                email: schema.string({}, [
                    rules.email(),
                    rules.maxLength(100)
                ]),
                password: schema.string({}, [
                    rules.confirmed(),
                    rules.minLength(8)
                ]),
                cargo: schema.number( [
                    rules.required()
                ])
            })

            const payload: any = await request.validate({ schema: userSchema })

        

            const { id }: { id: Number } = params

            const user: any = await User.find(id)
            if (!user) {
                return response.notFound({ message: 'User not found' })
            }

            user.email = payload.email
            user.password = payload.password
            user.cargo = payload.cargo

            await user.save()

            return response.ok(user)
        }catch
        {
            return response
        }
    }

    public async destroy({ params, response }) {
        const { id }: { id: Number } = params

        const user: any = await User.find(id)
        if (!user) {
            return response.notFound({ message: 'User not found' })
        }

        await user.delete()

        return response.ok({ message: 'User deleted successfully.' })
    }
}