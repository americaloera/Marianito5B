// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import TipoPlatillo from 'App/Models/TipoPlatillo'

export default class TipoPlatillosController {
    //Agregar
    public async store({ request, response, auth }) {

        await auth.use('api').authenticate()
        console.log(auth.use('api').user!)

        const tipoSchema = schema.create({
            nombre: schema.string({ trim: true }, [
                rules.maxLength(100),
                rules.unique({table: 'tipo_platillos', column: 'nombre'})
            ]),
        })

        const payload: any = await request.validate({ schema: tipoSchema })
        const tipoPlatillo: TipoPlatillo = await TipoPlatillo.create(payload)

        return response.ok(tipoPlatillo)
    }

    //Mostrar todos
    public async index({ response }) {
        const tipo = await TipoPlatillo.all()

        return response.ok(tipo)
    }

    //Mostrar por ID
    public async show({ params, response, auth }) {

        await auth.use('api').authenticate()
        console.log(auth.use('api').user!)

        const { id }: { id: Number } = params

        const tipo: any = await TipoPlatillo.find(id)
        if (!tipo) {
            return response.notFound({ message: 'Tipo Platillo no encontrado' })
        }

        return response.ok(tipo)
    } 

    //Actualizar mandando como parámetro el ID
    public async update({ request, params, response, auth }) {

        await auth.use('api').authenticate()
        console.log(auth.use('api').user!)

        const tipoSchema = schema.create({
            nombre: schema.string({}, [
                rules.maxLength(50),
                rules.unique({table: 'tipo_platillos', column: 'nombre'})
            ])
        })

        const payload: any = await request.validate({ schema: tipoSchema })

        const { id }: { id: Number } = params

        const tipo: any = await TipoPlatillo.find(id)
        if (!tipo) {
            return response.notFound({ message: 'Tipo Platillo no encontrado' })
        }

        tipo.nombre = payload.nombre

        await tipo.save()

        return response.ok(tipo)
    }

    public async destroy({ params, response, auth }) {

        await auth.use('api').authenticate()
        console.log(auth.use('api').user!)

        const { id }: { id: Number } = params

        const tipo: any = await TipoPlatillo.find(id)
        if (!tipo) {
            return response.notFound({ message: 'Tipo Platillo no encontrado' })
        }

        await tipo.delete()

        return response.ok({ message: 'Tipo Platillo eliminado correctamente.' })
    }

    
}
