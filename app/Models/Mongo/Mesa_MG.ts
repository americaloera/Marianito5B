import { Schema, model } from "@ioc:Mongoose";

export default model('Mesas', new Schema
({
    num_mesa: Number,
    ocupado: Boolean,
    fecha: String
}))