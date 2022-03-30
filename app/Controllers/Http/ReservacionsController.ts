// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
//import { schema, rules } from '@ioc:Adonis/Core/Validator'

import Reservacion from 'App/Models/Reservacion'
import Database from '@ioc:Adonis/Lucid/Database'
import Reservacion_MG from 'App/Models/Mongo/Reservacion_MG'
//import Mesa_MG from 'App/Models/Mongo/Mesa_MG'

export default class ReservacionsController 
{
    public async store({ request, response }) {
        /*
        const reservacionSchema = schema.create({
            fecha: schema.date({},[
            ]),
            id_cliente: schema.number([
                rules.required()
            ]),
            id_mesa: schema.number([
                rules.required()
            ])
        })
        */
        //const payload: any = await request.validate({ schema: reservacionSchema })
        //try{
            const fecha = request.input('fecha')
            const id_cliente = request.input('id_cliente')
            const id_mesa = request.input('id_mesa')

            const usuario = id_cliente

            const res: Reservacion = await Reservacion.create({fecha, id_cliente, id_mesa})

            const mesa2 = await Database
            .from('mesas')
            .select('mesas.num_mesa as mesa')
            .where('mesas.id', id_mesa)

            const mesa3 = mesa2[0]
            const mesa = mesa3['mesa']

            await Reservacion_MG.insertMany({usuario, mesa, fecha, ocupado:true})


            return response.ok(res)
            /*
        } catch{
            response.status(400).json({
                mensaje: 'Error al insertar Reservación'
            })
        }*/
    }

    //Mostrar todos
    public async index({ response }) {
        try {
            const res: any = await Database
            .from('reservacions')
            .join('clientes', 'reservacions.id_cliente', '=', 'clientes.id')
            .join('mesas', 'reservacions.id_mesa', '=', 'mesas.id')
            .select('reservacions.id as No_Reservacion', 'reservacions.fecha', 
                'clientes.nombre', 'clientes.apellidos', 'clientes.telefono', 'mesas.num_mesa')
            

            return response.ok(res)
        }catch{
            response.status(401).json({
                mensaje: 'Algo salió mal'
            })
        }
    }

    //Mostrar por ID
    public async show({ params, response }) {
        //const { id }: { id: Number } = params

        try{
        const res: any = await Database
        .from('reservacions')
        .join('clientes', 'reservacions.id_cliente', '=', 'clientes.id')
        .join('mesas', 'reservacions.id_mesa', '=', 'mesas.id')
        .select('reservacions.id as No. Reservación', 'reservacions.fecha', 
            'clientes.nombre', 'clientes.apellidos', 'mesas.num_mesa', 'reservacions.created_at')
        .where('reservacions.id', params.id)

        return response.ok(res)}
        catch{
            response.status(401).json({
                mensaje: 'Algo salió mal'
            })
        }
    } 

    //Actualizar mandando como parámetro el ID
    public async update({ request, params, response }) {
        /*
        const reservacionSchema = schema.create({
            fecha: schema.date({
            },[
                rules.required()
            ]),
            id_cliente: schema.number([
                rules.required()
            ]),
            id_mesa: schema.number([
                rules.required()
            ])
        })*/

        //const payload: any = await request.validate({ schema: reservacionSchema })

        try{
            const { id }: { id: Number } = params

            const res: any = await Reservacion.find(id)
            if (!res) {
                return response.notFound({ message: 'Reservación no encontrada' })
            }

            res.fecha = request.input('fecha')
            res.id_cliente = request.input('id_cliente')
            res.id_mesa = request.input('id_mesa')

            await res.save()

            return response.ok(res)
        }catch{
            
        }
    }

    public async destroy({ params, response }) {
       try{ 
            const { id }: { id: Number } = params

            const res: any = await Reservacion.find(id)
            if (!res) {
                return response.notFound({ message: 'Reservación no encontrada' })
            }

            await Reservacion_MG.deleteOne({res})
            await res.delete()

            return response.ok({ message: 'Reservación eliminada correctamente.' })
        }
        catch{

        }
    }

    //pruebaaaaa
    public async verMongo({response})
    {
        const x: any = await Reservacion_MG.find()
        
        return response.ok(x)
    }

    //borrar en mongo
    public async borrarMongo({ params, response, auth }) {

        try{
            await auth.use('api').authenticate()
            console.log(auth.use('api').user!)

            const { id }: { id: Number } = params

            const res: any = await Reservacion_MG.findById(id)
            if (!res) {
                return response.notFound({ message: 'Reservación no encontrada' })
            }

            await Reservacion_MG.deleteOne({res})

            return response.ok({ message: 'Reservación eliminada correctamente.' })
        }catch{

        }

    }

    //el nombre está mal, lo único que hace es actualizar el ocupado a false si la fecha es menor que el día de hpy
    public async mesasDisponibles({response, auth})
    {
        try{
            await auth.use('api').authenticate()
            console.log(auth.use('api').user!)

            const fechaBusqueda = new Date()

            const x = await Reservacion_MG.updateMany({fecha: {$lt: fechaBusqueda}},
                ({ocupado: "false"}))
            
            return response.ok(x)
        }catch
        {
            
        }
    }


    public async verMesasDisponibles({response, request})
    {
        const fechaBusqueda = request.input('fecha')

        const x = await Reservacion_MG.find({ocupado: false}, {fecha:fechaBusqueda}).select('mesa').select('ocupado')

        
        return response.ok(x)
    }

    public async prueba(/*{response, request}*/)
    {

    }
}
