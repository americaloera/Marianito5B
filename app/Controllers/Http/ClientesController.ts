// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Cliente from 'App/Models/Cliente'

export default class ClientesController {
    //Agregar
    public async store({ request, response, auth }) {
        const clienteSchema = schema.create({
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
            ])
        })

        const payload: any = await request.validate({ schema: clienteSchema })
        try{

            await auth.use('api').authenticate()
            console.log(auth.use('api').user!)

            const cliente: Cliente = await Cliente.create(payload)

            return response.ok(cliente)
        }catch
        {
            response.status(400).json({
                mensaje: 'Error al insertar Cliente'
           })
        }
    }

    //Mostrar todos los clientes
    public async index({ response }) {
        try{

            const cliente = await Cliente.all()

            return response.ok(cliente)
        }catch
        {
            response.status(401).json({
                mensaje: 'Algo salió mal'
           })
        }
    }

    //Mostrar cliente por ID 
    public async show({ params, response, auth }) {

        await auth.use('api').authenticate()
        console.log(auth.use('api').user!)

        const { id }: { id: Number } = params

        const cliente: any = await Cliente.find(id)
        if (!cliente) {
            return response.notFound({ message: 'Cliente no encontrado' })
        }

        return response.ok(cliente)
    } 

    //Actualizar Cliente
    public async update({ request, params, response, auth }) {

        await auth.use('api').authenticate()
        console.log(auth.use('api').user!)

        const clienteSchema = schema.create({
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
            ])
        })

        const payload: any = await request.validate({ schema: clienteSchema })
        

        const { id }: { id: Number } = params

        const cliente: any = await Cliente.find(id)
        if (!cliente) {
            return response.notFound({ message: 'Cliente not found' })
        }

        cliente.nombre = payload.nombre
        cliente.apellidos = payload.apellidos
        cliente.telefono = payload.telefono

        await cliente.save()

        return response.ok(cliente)
    }

    //Eliminar Cliente
    public async destroy({ params, response, auth }) {

        await auth.use('api').authenticate()
        console.log(auth.use('api').user!)

        const { id }: { id: Number } = params

        const user: any = await Cliente.find(id)
        if (!user) {
            return response.notFound({ message: 'User not found' })
        }

        await user.delete()

        return response.ok({ message: 'User deleted successfully.' })
    }
}
