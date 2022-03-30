import { Schema, model } from "@ioc:Mongoose";

export default model('Reservacion', new Schema
({
    usuario: Number,
    mesa: Number,
    fecha: Date,
    ocupado: Boolean
}))