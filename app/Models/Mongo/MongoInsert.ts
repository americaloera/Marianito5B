import { Schema, model } from "@ioc:Mongoose";

export default model('OcupacionMesas', new Schema
({
    num_mesa: String,
    fecha: String
}))