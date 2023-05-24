
import { Ubicacion as MiUbicacion, Imagen as MiImagen } from './interfaces';
import * as mongodb from "mongodb";


export interface Empresa {
  name?: string;
  ubicacion?: MiUbicacion;
  sucursales?: MiUbicacion[];
  telefono?: string;
  imagen?: MiImagen[];
  _id?: mongodb.ObjectId;

}
