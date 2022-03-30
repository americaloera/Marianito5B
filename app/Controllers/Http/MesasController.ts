// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Mesa_MG from 'App/Models/Mongo/Mesa_MG'
import Mesa from 'App/Models/Mesa'

export default class MesasController {
    public async store({ request, response, auth }) {

        await auth.use('api').authenticate()
        console.log(auth.use('api').user!)

        const mesaSchema = schema.create({
            num_mesa: schema.string({ trim: true }, [
                rules.maxLength(2),
                rules.unique({table: 'mesas', column: 'num_mesa'})
            ])
        })

        const payload: any = await request.validate({ schema: mesaSchema })
        
        const num_mesa = payload.num_mesa

        const mesa: Mesa = await Mesa.create(payload)
        
        //await Mesa_MG.insertMany({num_mesa, ocupado:false, fecha})

        return response.ok(mesa)
    }

    public async InsertarMongo({request, response}){
        const num_mesa = request.input('num_mesa')
        const ocupado = false
        const fecha = request.input('fecha')

        await Mesa_MG.insertMany({num_mesa, ocupado, fecha})
    }

    public async index({ response }) {
        const mesas = await Mesa.all()

        return response.ok(mesas)
    }

    public async show({ params, response, auth }) {

        await auth.use('api').authenticate()
        console.log(auth.use('api').user!)

        const { id }: { id: Number } = params

        const mesa: any = await Mesa.find(id)
        if (!mesa) {
            return response.notFound({ message: 'Mesa not found' })
        }

        return response.ok(mesa)
    } 

    public async update({ request, params, response, auth }) {

        await auth.use('api').authenticate()
        console.log(auth.use('api').user!)

        const mesaSchema = schema.create({
            nombre: schema.string({}, [
                rules.maxLength(2),
                rules.unique({table: 'mesa', column: 'num_mesa'})
            ])
        })

        const payload: any = await request.validate({ schema: mesaSchema })

        const { id }: { id: Number } = params

        const mesa: any = await Mesa.find(id)
        if (!mesa) {
            return response.notFound({ message: 'Mesa not found' })
        }

        mesa.num_mesa = payload.num_mesa

        await mesa.save()

        return response.ok(mesa)
    }

    public async destroy({ params, response, auth }) {

        await auth.use('api').authenticate()
        console.log(auth.use('api').user!)

        const { id }: { id: Number } = params

        const mesa: any = await Mesa.findOrFail(id)

        await Mesa_MG.deleteOne({mesa})

        if (!mesa) {
            return response.notFound({ message: 'Mesa not found' })
        }

        await mesa.delete()

        return response.ok({ message: 'Mesa deleted successfully.' })
    }


    //prueba
    public async verMongo({response})
    {
        const x: any = await Mesa_MG.find()
        
        return response.ok(x)
    }
}