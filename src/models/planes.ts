import { Schema, model } from "mongoose";
import { Planes } from "../interfaces/planes";

const planSchema = new Schema<Planes>({
    item_id: String,
    name: String,
    empresa: String,
    price: Number,
    precio: Number,
    rating: Number,
    copagos: Boolean,
    category: String,
    tags: [String],
    hijosSolos: Boolean,
    folletos: [String],
    images: [String],
    clinicas: [String],
    attributes: [String],
    Cirugia_Estetica: Boolean,
    Cobertura_Nacional: Boolean,
    Habitacion_Individual: Boolean,
    Ortodoncia_Adultos: Boolean,
    PMO_Solo_por_Aportes: Boolean,
    Sin_Copagos: Boolean,
    raiting: Number,  // Cambiado de "raiting" a "rating"
    valueSlide3: Number,
    valueSlide4: Number,
    aporteOS: Number,
});

const PlanesModel = model('planes', planSchema);
export default PlanesModel;
