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
    folletos?:string[];
    beneficios?:string[];
    clinicas?:string[];
    _id?: mongodb.ObjectId;
    item_id?: string;
    empresa?: string;
    sigla?: string; 
}


