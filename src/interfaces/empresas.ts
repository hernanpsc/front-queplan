
import { Ubicacion as MiUbicacion, Imagen as MiImagen } from './interfaces';
import * as mongodb from "mongodb";

export interface Empresa {
_id?: mongodb.ObjectId;
item_id?:string,
name?: string;
planes?:[],
lineas?:[],
ubicacion?: MiUbicacion;
sucursales?: MiUbicacion[];
telefono?: string;
images?: MiImagen[];
sigla?:string,
rating?:number,
factores?:Coeficientes;
}

export interface Coeficientes{
coeficiente?:number;
factorAporte?:number;
}