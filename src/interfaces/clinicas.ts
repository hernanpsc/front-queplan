import { Ubicacion, Imagen } from './interfaces';
import * as mongodb from "mongodb";


export interface Clinicas {
  _id?: mongodb.ObjectId;
  nombre?:string;
  entity?:string;
  cartillas?:[string];
  coberturas?:Cobertura;
  item_id?:string;
  ubicacion?:Ubicacion;
  url?:string;
  imagen?:Imagen;
  tipo?:string;
  especialidades?:[string];
  rating?:number;
  select?:boolean;
  }

// Definir la estructura del documento de cobertura
export interface Cobertura {
  key?: string;
  label?: string;
  children?: {
    key?: string;
    id?: string;
    label?: string;
    partialSelected?: boolean;
  }[];
  partialSelected?: boolean;
}