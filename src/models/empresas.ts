import { Schema, model } from "mongoose";
import { Empresa } from "../interfaces/empresas";

const empresaSchema = new Schema<Empresa>(
    {
    name: {
        type: String,
        required:true
    },
    item_id: {
        type: String,
        required:true
    },    
    images: {
        type: [String],
    },
    sigla: {
        type: String,
        required:true
    },
    lineas: {
        type: [String]
    },
    factores: {
      coeficiente: Number
    }
})

const EmpresaModel = model('empresas', empresaSchema);
export default EmpresaModel;