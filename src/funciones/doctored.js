import * as functions from './functions';
export function valor_Doctored( prices,grupo,arrayDeducciones){
//	<!------------------------------ VARIABLES DE prices start---------------------------------------------------------->							
let precio_Grupo = prices.precioDoctoredGrupo.precios.precios;
// // console.log('precio grupo  :',precio_Grupo);
let precio_3hijo = prices.precioDoctoredHijo3.precios.precios;
// // console.log('precio_3hijo ',precio_3hijo);
//	<!------------------------------ VARIABLES DE prices end---------------------------------------------------------->							
//	<!------------------------------ CALCULO DE DEDUCCIONES start arrayDeducciones------------------------------------>							
let empresa = 'Doctored';
let factores = arrayDeducciones.find(item => item.name === empresa);
// // console.log('factores   :' ,factores);
let tipoAsociado = factores.tipo_Ingreso_Original_P_D;
// // console.log('tipoAsociado   :' ,tipoAsociado);
let promociones = factores.bonificaciones;
// // console.log('promociones   :' ,promociones);
let bonAfinidad = promociones[promociones[0]];
// // console.log('bonAfinidad   :' ,bonAfinidad);
let con_afinidad = false;
// // console.log('con_afinidad   :' ,con_afinidad);
if (promociones[0] >= 1 ){
  con_afinidad === true;
}
//	<!------------------------------ CALCULO DE DEDUCCIONES end arrayDeducciones-------------------------------------->							

//	<!------------------------------ AJUSTES DE familia start--------------------------------------------------------->							

let hijos = grupo[3];
// // console.log('hijos   :',hijos);
let familia = grupo[9];
// // console.log('familia   :' ,familia);
if(familia === 1 || familia === 3 ){
    precio_3hijo = {};
} 
//	<!------------------------------ AJUSTES DE familia end----------------------------------------------------------->							





//	<!------------------------------ COTIZACION START ---------------------------------------------------------------->	

let precios = {};
    if (hijos > 0 ) {
        precios = Object.entries(precio_3hijo).reduce((acc, [key, value]) => // tres hijos o mas
            ({
                ...acc,
                [key]: parseInt((acc[key]) || 0) + parseInt(value * hijos)
            }), {
                ...precio_Grupo

            });
    } else {
        precios = precio_Grupo;
    }
//	<!------------------------------ COTIZACION END ------------------------------------------------------------------>							

//Funcion para el calculo de aportes
//	<!------------------------------ Bucle start --------------------------------------------------------------------->							
let array = [];
for (let j in precios) {
    let _id = [j][0];
    let nombre = _id.substring(3);
    nombre = nombre.replace(/_/g, ' '); // Reemplaza todos los guiones bajos por un espacio        nombre = nombre.replace(/_/g, ' '); // Reemplaza todos los guiones bajos por un espacio
    let confirmaSiTieneBonificaciones = con_afinidad;
    let porcentajeBonificado = bonAfinidad;
    let precioInicial = precios[j];  
    // Llamar a la función y desestructurar el array devuelto
    let [valor_total_plan, valorBonificacion] = functions.promoDescuento(precioInicial, porcentajeBonificado, confirmaSiTieneBonificaciones);
    // Asignar los valores a nuevas variables
    let precioTotal = valor_total_plan;
    let bonificacionAplicada = valorBonificacion;
    let precio = functions.final(tipoAsociado,factores.deduction,precioTotal);
    
    //	<!--------------------Crear Objeto SWISS start------------------------------>																            			
    var plan = new Object();
            plan.item_id = _id
            plan.name = empresa + ' ' + nombre;
            plan.precio = precio;
            plan.promoPorcentaje = porcentajeBonificado;
            plan.promoDescuento = bonificacionAplicada;
            plan.valorLista = precioInicial;
            plan.aportes_OS = factores.deduction;
            array.push(plan);	        
                    }
//	<!------------------------------ Bucle end ----------------------------------------------------------------------->							
return array;
}			
// <!----------------------Funcion VALOR DEL PLAN  end---------------------------->


