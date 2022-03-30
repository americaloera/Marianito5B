// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { schema, rules } from '@ioc:Adonis/Core/Validator'
import DetalleFactura from 'App/Models/DetalleFactura'
import Database from '@ioc:Adonis/Lucid/Database'

export default class DetalleFacturasController 
{
    public async store({ request, response, auth }) {

        await auth.use('api').authenticate()
        console.log(auth.use('api').user!)

        const detalleSchema = schema.create({
            id_factura: schema.number([
                rules.required()
            ]),
            id_platillo: schema.number([
                rules.required()
            ]),
            cantidad: schema.number([
                rules.required()
            ])
        })

    
        const payload: any = await request.validate({ schema: detalleSchema })
        const factura: DetalleFactura = await DetalleFactura.create(payload)

        return response.ok(factura)
    }

    //Mostrar todos
    public async index({ response, auth }) {
        //const factura: any = await Database.raw('select f.id as Factura, p.nombre as Platillo, (p.precio * df.cantidad) as Subtotal from detalle_facturas as df inner join facturas as f on df.id_factura = f.id inner join platillos as p on df.id_platillo = p.id')
        
        await auth.use('api').authenticate()
        console.log(auth.use('api').user!)

        const factura: any = await Database
        .from('detalle_facturas')
        .join('facturas', 'detalle_facturas.id_factura', '=', 'facturas.id')
        .join('platillos', 'detalle_facturas.id_platillo', '=', 'platillos.id')
        .select('facturas.id as No. Factura', 'platillos.nombre as Plato')
        .select(Database.raw('platillos.precio * detalle_facturas.cantidad as subtotal'))
        .select(Database.raw('(platillos.precio * detalle_facturas.cantidad) * 0.16 as iva'))
        .select(Database.raw('(platillos.precio * detalle_facturas.cantidad) * 1.16 as total'))
        
        return response.ok(factura)
    
        /*const factura = await DetalleFactura.query().preload('detalle', (queryactor)=>{
            queryactor.select('nombre', 'apellidos')
          })*/
    }
    

    //Mostrar por ID
    public async show({ params, response, auth }) {
        //const { id }: { id: Number } = params

        await auth.use('api').authenticate()
        console.log(auth.use('api').user!)

        const factura: any = await Database
        .from('detalle_facturas')
        .join('facturas', 'detalle_facturas.id_factura', '=', 'facturas.id')
        .join('platillos', 'detalle_facturas.id_platillo', '=', 'platillos.id')
        .select('facturas.id as No. Factura', 'platillos.nombre as Plato')
        .select(Database.raw('platillos.precio * detalle_facturas.cantidad as subtotal'))
        .select(Database.raw('(platillos.precio * detalle_facturas.cantidad) * 0.16 as iva'))
        .select(Database.raw('(platillos.precio * detalle_facturas.cantidad) * 1.16 as total'))
        .where('facturas.id', params.id)

        return response.ok(factura)
    } 


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

        //const { id }: { id: Number } = params

        const factura: any = await DetalleFactura.findOrFail(params.id)
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

        const factura: any = await DetalleFactura.find(id)
        if (!factura) {
            return response.notFound({ message: 'Factura no encontrada' })
        }

        await factura.delete()

        return response.ok({ message: 'Factura eliminada correctamente.' })
    }

    public async factura({response, params, auth})
    {

        await auth.use('api').authenticate()
        console.log(auth.use('api').user!)

        const factura: any = await Database
        .from('detalle_facturas')
        .join('facturas', 'detalle_facturas.id_factura', '=', 'facturas.id')
        .join('platillos', 'detalle_facturas.id_platillo', '=', 'platillos.id')
        .select('facturas.id as No. Factura', 'platillos.nombre as Plato')
        .select(Database.raw('platillos.precio * detalle_facturas.cantidad as subtotal'))
        .select(Database.raw('(platillos.precio * detalle_facturas.cantidad) * 0.16 as iva'))
        .select(Database.raw('(platillos.precio * detalle_facturas.cantidad) * 1.16 as total'))
        .where('id_factura', params.id)

        return response.ok(factura)
    }
}
