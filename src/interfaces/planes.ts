import { Imagen as MiImagen } from './interfaces';
import * as mongodb from "mongodb";

export interface Attributes {


}

export interface Planes {
    item_id?: string;
    name?: string;
    empresa?: string;
    price?: number; // Cambiar a number si debería ser un número
    precio?: number; // Cambiar a number si debería ser un número
    rating?: 1 | 2 | 3 | 4 | 5; // Se ajusta para que sea un número, sin necesidad de string
    copagos?: boolean; // Cambiar a boolean si se trata de un valor booleano
    category?: 'inferior' | 'intermedio' | 'superior';
    tags?: object[]; // Cambiado a object[] en vez de string[]
    hijosSolos?: boolean; // Cambiar a boolean si es un valor booleano
    folletos?: object[]; // Cambiar a object[] en vez de string[]
    images?: object[]; // Cambiar a object[] en vez de string[]
    attributes?: Attributes; // Cambiar a object[] en vez de string[]
    Cirugia_Estetica: boolean;
    Cobertura_Nacional: boolean;
    Habitacion_Individual: boolean;
    Ortodoncia_Adultos: boolean;
    PMO_Solo_por_Aportes: boolean;
    Sin_Copagos: boolean;
    raiting: number; // Debería ser un number y no una cadena
    valueSlide3: number;
    valueSlide4: number;
    aporteOS: number;
    imagenes?: MiImagen;
    clinicas?: object[]; // Cambiar a object[] en vez de string[]
    _id?: mongodb.ObjectId;
}
