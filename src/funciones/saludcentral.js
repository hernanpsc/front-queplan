import * as functions from './functions';
export function valor_Saludcentral(prices, grupo,arrayDeducciones){
//	<!------------------------------ VARIABLES DE prices start------------------------------------>							
    let precioTitular = prices.precioSaludcentralTitular.precios.precios;
    // console.log('precioTitular Saludcentral :  ',precioTitular  );
    let precioConyuge = prices.precioSaludcentralConyuge.precios.precios;
    // console.log('precioConyuge Saludcentral :  ', precioConyuge );
    let precioHijo1 = prices.precioSaludcentralHijo1.precios.precios;
    // console.log('precioHijo1 Saludcentral :  ' , precioHijo1);
    let precioHijo2 = prices.precioSaludcentralHijo2.precios.precios;
    // console.log('precioHijo2 Saludcentral :  ' ,precioHijo2 );
//	<!------------------------------ VARIABLES DE prices end------------------------------------>							
//	<!------------------------------ VARIABLES DE grupo start------------------------------------>							
    let numhijo2 = grupo[2];
    let hijos  = grupo[3];
    // console.log('hijos Saludcentral :  '  + hijos);
    let capitas = grupo[5];
    // console.log('capitas Saludcentral :  '  + capitas);
    let edad_1 = grupo[7];
    // console.log('edad_1 Saludcentral :  '  + edad_1);
	let edad_2  = grupo[8];
    // console.log('edad_2 Saludcentral :  '  + edad_2);
    let familia = grupo[9];
    // console.log('familia Saludcentral :  '  + familia);
//	<!------------------------------ VARIABLES DE grupo end------------------------------------>							
//	<!------------------------------ RESETEAR familia start------------------------------------>							
    switch (familia) {
        case 1:
            precioHijo1 = {};
            precioHijo2 = {};
            break;
        case 2:
            precioConyuge = {};
            break;
        case 3:
            precioHijo1 = {};
            precioHijo2 = {};
            break;
        case 4:
            // No changes here, maybe you want to add logic for case 4?
            break;
        default:
            // Handle unknown group cases, if necessary
            break;
    }
//	<!------------------------------ RESETEAR familia end------------------------------------>							



//	<!------------------------------ CALCULO DE DEDUCCIONES start arrayDeducciones------------------------------------>							

    let empresa = 'Salud Central';
    let factores = arrayDeducciones.find(item => item.name === empresa);
    let tipoAsociado = factores.tipo_Ingreso_Original_P_D;
    let promociones = factores.bonificaciones;
    let bonAfinidad = promociones[promociones[0]];
    let con_afinidad = false;
  if (promociones[0] >= 1 ){
      con_afinidad === true;
  }
//	<!------------------------------ CALCULO DE DEDUCCIONES end arrayDeducciones------------------------------------>							

//	<!------------------------------ COTIZACION START ------------------------------------>							

      let precios = {};
      precios = {...precioTitular, ...precioConyuge, ...precioHijo1, ...precioHijo2};
      precios = Object.entries(precios).reduce((acc, [key, value]) => {
          acc[key] = (acc[key] || 0) + parseInt(value);
          return acc;
      }, {});

//	<!------------------------------ COTIZACION END ------------------------------------>							
    
//	<!----------------------------Bucle SALUD CENTRAL start---------------------------------->							
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
//	<!----------------------------Bucle SALUD CENTRAL end---------------------------------->							

return array
}