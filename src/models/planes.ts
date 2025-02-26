import { Schema, model } from "mongoose";
import { Planes } from "../interfaces/planes";
import { Attributes } from "../interfaces/planes";


const attributeSchema = new Schema<Attributes>({
    id: { type: String, default: null },
    name: { type: String, required: true },
    value_id: { type: String, default: null },
    value_name: { type: String, required: true },
    attribute_group_id: { type: String, default: null },
    attribute_group_name: { type: String, required: true },
    value_type: { type: String, default: null }
});


const planSchema = new Schema<Planes>({
    item_id: { type: String },
    name: { type: String },
    empresa: { type: String },
    price: { type: Number },
    precio: { type: Number },
    rating: { type: Number },
    copagos: { type: Boolean },
    category: { type: String },
    tags: { type: [Schema.Types.Mixed] }, // Cambiar a [Schema.Types.Mixed] para que acepte cualquier objeto
    hijosSolos: { type: Boolean },
    folletos: { type: [Schema.Types.Mixed] }, // Cambiar a [Schema.Types.Mixed]
    images: { type: [Schema.Types.Mixed] }, // Cambiar a [Schema.Types.Mixed]
    attributes: { type: [attributeSchema], required: true },
    Cirugia_Estetica: { type: Boolean },
    Cobertura_Nacional: { type: Boolean },
    Habitacion_Individual: { type: Boolean },
    Ortodoncia_Adultos: { type: Boolean },
    PMO_Solo_por_Aportes: { type: Boolean },
    Sin_Copagos: { type: Boolean },
    raiting: { type: Number },
    valueSlide3: { type: Number },
    valueSlide4: { type: Number },
    aporteOS: { type: Number },
    imagenes: { type: Schema.Types.Mixed }, // Cambiar a Schema.Types.Mixed si es un objeto más complejo
    clinicas: { type: [Schema.Types.Mixed] }, // Cambiar a [Schema.Types.Mixed]
}, { timestamps: true });


const PlanesModel = model('planes', planSchema);
export default PlanesModel;
