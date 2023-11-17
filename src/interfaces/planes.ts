import { Imagen as MiImagen } from './interfaces';
import * as mongodb from "mongodb";


export interface Planes {
   
    price?: string;
    precio?: string;
    rating?: '1' | '2' | '3'| '4' | '5';
    copagos?: string;
    category?: 'inferior' | 'intermedio' | 'superior';
    tags?: string;
    hijosSolos?: string;
    name?: string;
    images?:string[];
    attributes?:string[];
    Cirugia_Estetica: Boolean,
    Cobertura_Nacional: Boolean,
    Habitacion_Individual: Boolean,
    Ortodoncia_Adultos: Boolean,
    PMO_Solo_por_Aportes: Boolean,
    Sin_Copagos: Boolean,
    raiting: Number, 
    valueSlide3: Number,
    valueSlide4: Number,
    aporteOS: Number,
    imagenes?: string[] | undefined;
    folletos?:string[];
    beneficios?:string[];
    clinicas?:string[];
    _id?: mongodb.ObjectId;
    item_id?: string;
    empresa?: string;
    sigla?: string; 
}


