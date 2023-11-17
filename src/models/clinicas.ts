import { Schema, model } from "mongoose";
import { Clinicas } from "../interfaces/clinicas";

const clinicasSchema = new Schema<Clinicas>(
    {
        nombre: String,
        entity: String,
        cartillas: [String],
        coberturas: [String],
        item_id: String,
        ubicacion: {
           
            calle_y_numero:String,
            telefono:String,
            barrio:String,
            partido:String,
            region:String,
            provincia: String,
            CP: String
        },
        url: String,
        imagen: {
            ruta: String,
            descripcion: String,
        },
        tipo: String,
        especialidades: [String],
        rating: Number,
        select: Boolean,
    }
);
const ClinicasModel = model('clinicas', clinicasSchema);
export default ClinicasModel;