import * as functions from './functions';

export function valor_Avalian( prices,grupo,arrayDeducciones){
//	<!------------------------------ VARIABLES DE prices start------------------------------------>							
let precioTitular = prices.precioAvalianTitular.precios.precios;
// // console.log('precioTitular :  ' , precioTitular);
let precioConyuge = prices.precioAvalianConyuge.precios.precios;
// // console.log('precioConyuge :  ' , precioConyuge);
let precioHijo1 = prices.precioAvalianHijo1.precios.precios;
// // console.log('precioHijo1 :  ' , precioHijo1);
let precioHijo2 = prices.precioAvalianHijo2.precios.precios;
// // console.log('precioHijo2 :  ' , precioHijo2);
let precioHijo3 = prices.precioAvalianHijo3.precios.precios;
// // console.log('precioHijo3 :  ' , precioHijo3);
let precioHijo4 = prices.precioAvalianHijo25.precios.precios;
// // console.log('precioHijo4 :  ' , precioHijo4);
//	<!------------------------------ VARIABLES DE prices end------------------------------------>							
//	<!------------------------------ VARIABLES DE grupo start------------------------------------>							
	let hijos  = grupo[3];
    // // console.log('hijos :  ' , hijos);
    let familia = grupo[9];
    // // console.log('familia :  ' , familia);
//	<!------------------------------ VARIABLES DE grupo end------------------------------------>							
//	<!------------------------------ AJUSTES DE familia start-------------------------------------->							

    if(familia === 1 ){
		precioConyuge = 0;
	} else if (familia == 2 ) {
		precioConyuge = 0;
	  } else if ( familia ==3){
	  }
//	<!------------------------------ AJUSTES DE familia end-------------------------------------->							     
//	<!------------------------------ CALCULO DE DEDUCCIONES start ------------------------------------>							
      let empresa = 'Avalian';
      let factores = arrayDeducciones.find(item => item.name === empresa);
      let tipoAsociado = factores.tipo_Ingreso_Original_P_D;
      let promociones = factores.bonificaciones;
      let bonAfinidad = promociones[promociones[0]];
      let con_afinidad = false;
    if (promociones[0] >= 1 ){
        con_afinidad === true;
    }
//	<!------------------------------ CALCULO DE DEDUCCIONES end ------------------------------------>							
//	<!------------------------------ COTIZACION START ------------------------------------>							

    let precio_adultos_Avalian = {};
    let precios = {};
      if (familia >=  3) {
        precio_adultos_Avalian = Object.entries(precioConyuge).reduce((acc, [key, value]) => // matrimonio
            ({
                ...acc,
                [key]: parseInt((acc[key]) || 0) + parseInt(value)
            }), {
                ...precioTitular
            });
    } else {
        precio_adultos_Avalian = precioTitular
    }
    if (hijos >= 1) {
        precios = Object.entries(precioHijo1).reduce((acc, [key, value]) => ({
            ...acc,
            [key]: parseInt((acc[key]) || 0) + parseInt(value)
        }), {
            ...precio_adultos_Avalian
        });
    } else if (hijos >= 2) {
        precios = Object.entries(precioHijo2).reduce((acc, [key, value]) => ({
            ...acc,
            [key]: parseInt((acc[key]) || 0) + parseInt(value)
        }), {
            ...precio_adultos_Avalian
        });
    } else if (hijos >= 3) {
        precios = Object.entries(precioHijo3).reduce((acc, [key, value]) => ({
            ...acc,
            [key]: parseInt((acc[key]) || 0) + parseInt(value)
        }), {
            ...precio_adultos_Avalian
        });
    } else {
        precios = precio_adultos_Avalian;
    }
//	<!------------------------------ COTIZACION END ------------------------------------>							

//	<!-----------------------------Bucle AVALIAN start------------------------------------>							
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
            //	<!--------------------Crear Objeto AVALIAN end------------------------------>																            			
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
         //	<!-----------------------Bucle AVALIAN end------------------------>											

        return array    
    } 
    

    
    
