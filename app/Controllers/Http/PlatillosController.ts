// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Platillo from 'App/Models/Platillo'
import Database from '@ioc:Adonis/Lucid/Database'

export default class PlatillosController 
{
    //Agregar un platillo
    public async store({ request, response, auth }) {

        const platoSchema = schema.create({
            nombre: schema.string({ trim: true }, [
                rules.maxLength(100),
                rules.unique({table: 'platillos', column: 'nombre'})
            ]),
            precio: schema.number([
                rules.required()
            ]),
            tipo_plato: schema.number([
                rules.required()
            ])
        })

        await auth.use('api').authenticate()
        console.log(auth.use('api').user!)
    
        const payload: any = await request.validate({ schema: platoSchema })
        const plato: Platillo = await Platillo.create(payload)

        return response.ok(plato)
    }

    //Mostrar todos
    public async index({ response }) {
        
        const plato: any = await Database
        .from('platillos')
        .join('tipo_platillos', 'tipo_platillos.id', '=', 'platillos.tipo_plato')
        .select('platillos.id as id_platillo', 'tipo_platillos.id as id_tipo', 'platillos.nombre as nombre_platillo', 'tipo_platillos.nombre as nombre_tipo', 'platillos.precio')

        return response.ok(plato)
        /*
        const plato: any = await Database
        .from('platillos')
        .join('tipo_platillos', 'tipo_platillos.id', '=', 'platillos.tipo_plato')
        .select('platillos.id as id_platillo', 'tipo_platillos.id as id_tipo', 'platillos.nombre as nombre_platillo', 'tipo_platillos.nombre as nombre_tipo')
        .where('platillos.tipo_plato', params.id)

        return response.ok(plato)*/
    }

    
    //Mostrar por ID
    public async show({ params, response, auth }) {

        await auth.use('api').authenticate()
        console.log(auth.use('api').user!)
        
        const { id }: { id: Number } = params

        const plato: any = await Platillo.find(id)
        if (!plato) {
            return response.notFound({ message: 'Platillo no encontrado' })
        }

        return response.ok(plato)
       
/*
        const plato: any = await Database
        .from('platillos')
        .join('tipo_platillos', 'tipo_platillos.id', '=', 'platillos.tipo_plato')
        .select('platillos.id as id_platillo', 'tipo_platillos.id as id_tipo', 'platillos.nombre as nombre_platillo', 'tipo_platillos.nombre as nombre_tipo')
        .where('platillos.tipo_plato', params.id)

        return response.ok(plato) */
    } 

    //Actualizar mandando como parámetro el ID
    public async update({ request, params, response, auth }) {

        await auth.use('api').authenticate()
        console.log(auth.use('api').user!)

        const platoSchema = schema.create({
            nombre: schema.string({}, [
                rules.maxLength(50)
            ]),
            precio: schema.number([
                rules.required()
            ]),
            tipo_plato: schema.number([
                rules.required()
            ])
        })

        const payload: any = await request.validate({ schema: platoSchema })

        const { id }: { id: Number } = params

        const plato: any = await Platillo.find(id)
        if (!plato) {
            return response.notFound({ message: 'Platillo no encontrado' })
        }

        plato.nombre = payload.nombre
        plato.precio = payload.precio
        plato.tipo_plato = payload.tipo_plato

        await plato.save()

        return response.ok(plato)
    }

    public async destroy({ params, response, auth }) {

        await auth.use('api').authenticate()
        console.log(auth.use('api').user!)

        const { id }: { id: Number } = params

        const plato: any = await Platillo.find(id)
        if (!plato) {
            return response.notFound({ message: 'Platillo no encontrado' })
        }

        await plato.delete()

        return response.ok({ message: 'Platillo eliminado correctamente.' })
    }
    
    
    public async categoria({ params, response, auth })
    {
        await auth.use('api').authenticate()
        console.log(auth.use('api').user!)

        const plato: any = await Database
        .from('platillos')
        .join('tipo_platillos', 'tipo_platillos.id', '=', 'platillos.tipo_plato')
        .select('platillos.id as id_platillo', 'tipo_platillos.id as id_tipo', 'platillos.nombre as nombre_platillo', 'tipo_platillos.nombre as nombre_tipo')
        .where('platillos.tipo_plato', params.id)

        return response.ok(plato)
    }
}
