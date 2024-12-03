
import { Ubicacion as MiUbicacion, Imagen as MiImagen } from './interfaces';
import * as mongodb from "mongodb";

export interface Empresa {
_id?: mongodb.ObjectId;
item_id?:string,
name?: string | undefined;
planes?:[],
lineas?:[],
ubicacion?: MiUbicacion;
sucursales?: MiUbicacion[];
telefono?: string;
images?: MiImagen[];
sigla?:string,
rating?:number,
factores?:Coeficientes;
factoresComunes?:Factores
}

export interface Coeficientes{
coeficiente?:number;
mono?: [];
monotributo?: [];
promo?: [];
promos?: [];
descuentos?: [];

}  

export interface Mono{
  coeficiente?:number;
  mono?: [];
  monotributo?: {};
  promo?: [];
  promos?: [];
  descuentos?: [];
  
  } 
export interface Factores{
  mono?: [];
  factorAporte?: [];
  promo?: [];
  }  
// Define la interfaz DescOS para describir el tipo esperado
export interface DescOS {
  deduction?: any[];  // Propiedad 'deduction' de tipo número
  tipo_IngresoPDMI?: string;  // Propiedad 'tipo_IngresoPDMI' de tipo string
}