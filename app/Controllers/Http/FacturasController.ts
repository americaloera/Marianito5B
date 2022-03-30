// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'

import Factura from 'App/Models/Factura'

export default class FacturasController 
{
    public async store({ request, response, auth }) {

        await auth.use('api').authenticate()
        console.log(auth.use('api').user!)

        const facturaSchema = schema.create({
            fecha: schema.date.nullableAndOptional({
                format: 'yyyy-MM-dd HH:mm:ss'
            },[
                rules.after('today')
            ]),
            id_cliente: schema.number([
                rules.required()
            ]),
            id_empleado: schema.number([
                rules.required()
            ])
        })

    
        const payload: any = await request.validate({ schema: facturaSchema })
        const factura: Factura = await Factura.create(payload)

        return response.ok(factura)
    }

    public async index({ response }) 
    {

        /*
        select f.id as "No. Factura", e.email as Empleado, concat(c.nombre, ' ', c.apellidos) as Cliente, p.nombre as Platillo, 
        p.precio as Precio, df.cantidad as Cantidad, (p.precio * df.cantidad) as Subtotal, ((p.precio * df.cantidad)*0.16) as IVA, 
        ((p.precio * df.cantidad)*1.16) as TOTAL from facturas as f inner join detalle_facturas as df on df.id_factura = f.id 
        inner join platillos as p on df.id_platillo = p.id inner join users as e on f.id_empleado = e.id 
        inner join clientes as c on c.id = f.id_cliente

        f.id as "No. Factura", u.email as Empleado, concat(c.nombre, ' ', c.apellidos) as Cliente, p.nombre as Platillo, 
        p.precio as Precio, df.cantidad as Cantidad, (p.precio * df.cantidad) as Subtotal, ((p.precio * df.cantidad)*0.16) as IVA, 
        ((p.precio * df.cantidad)*1.16) as TOTAL


        select * from facturas as f inner join detalle_facturas as df on df.id_factura = f.id 
        inner join platillos as p on df.id_platillo = p.id inner join users as e on f.id_empleado = e.id 
        inner join clientes as c on c.id = f.id_cliente
        */
        
        /*const x:any = await Database
        .from('facturas as f')
        .join ('users as e', 'e.id', '=', 'f.id_empleado')
        .join('clientes as c', 'c.id', '=', 'f.id_cliente')
        .select('f.id as Factura', 'e.email as Empleado', 'c.nombre as Cliente', 'c.apellidos as Apellido')
        */

        const prueba = await Factura

        response.status(200).json({
            mensaje: "todo bieeeeeen uwu",
            data:prueba
          })
    }
    
/*
    //Mostrar por ID
    public async show({ params, response }) {
        //const { id }: { id: Number } = params

        const factura: any = await Database
        .from('facturas')
        .join('clientes', 'facturas.id_cliente', '=', 'clientes.id')
        .join('users', 'facturas.id_empleado', '=', 'users.id')
        .select('facturas.id as No. Factura', 'facturas.fecha', 
            'clientes.nombre', 'clientes.apellido', 'users.nombre as empleado')
        .where('facturas.id', params.id)

        return response.ok(factura)
    } 

    */

    //Actualizar mandando como parámetro el ID
    public async update({ request, params, response, auth }) {

        await auth.use('api').authenticate()
        console.log(auth.use('api').user!)

        const facturaSchema = schema.create({
            fecha: schema.date({
                format: 'yyyy-MM-dd HH:mm:ss',
            },[
                rules.required()
            ]),
            id_cliente: schema.number([
                rules.required()
            ]),
            id_empleado: schema.number([
                rules.required()
            ])
        })


        const payload: any = await request.validate({ schema: facturaSchema })

        const { id }: { id: Number } = params

        const factura: any = await Factura.find(id)
        if (!factura) {
            return response.notFound({ message: 'Factura no encontrada' })
        }

        factura.fecha = payload.fecha
        factura.id_cliente = payload.id_cliente
        factura.id_empleado = payload.id_empleado

        await factura.save()

        return response.ok(factura)
    }

    public async destroy({ params, response, auth }) {

        await auth.use('api').authenticate()
        console.log(auth.use('api').user!)

        const { id }: { id: Number } = params

        const factura: any = await Factura.find(id)
        if (!factura) {
            return response.notFound({ message: 'Factura no encontrada' })
        }

        await factura.delete()

        return response.ok({ message: 'Factura eliminada correctamente.' })
    }
}
