import * as functions from './functions';

export function valor_Avalian( prices,grupo,arrayDeducciones){

	let hijos  = grupo[3];console.log('1 avalian');
    let precioTitular = prices.precioAvalianTitular.precios.precios;console.log('1 avalian');
    let precioConyuge = prices.precioAvalianConyuge.precios.precios;console.log('1 avalian');
    let precioHijo1 = prices.precioAvalianHijo1.precios.precios;console.log('1 avalian');
    let precioHijo2 = prices.precioAvalianHijo2.precios.precios;console.log('1 avalian');
    let precioHijo3 = prices.precioAvalianHijo3.precios.precios;console.log('1 avalian');
    let precioHijo4 = prices.precioAvalianHijo25.precios.precios;console.log('1 avalian');
    let empresa = 'Avalian';console.log('1 avalian');
    let familia = grupo[9];console.log('1 avalian');


    console.log('familia :  ' , familia);
    console.log('hijos :  ' , hijos);
    console.log('precioTitular :  ' , precioTitular);
    console.log('precioConyuge :  ' , precioConyuge);
    console.log('precioHijo1 :  ' , precioHijo1);
    console.log('precioHijo2 :  ' , precioHijo2);
    console.log('precioHijo3 :  ' , precioHijo3);
    console.log('precioHijo4 :  ' , precioHijo4);



    if(familia === 1 ){
		precioConyuge = 0;
		hijos =0;
	} else if (familia == 2 ) {
		precioConyuge = 0;
	  } else if ( familia ==3){
		hijos =0;
	  }
	  let precio_adultos_Avalian = {};
	  let precios = {};

      

      let factores = arrayDeducciones.find(item => item.name === empresa);
      let tipoAsociado = factores.tipo_Ingreso_Original_P_D;
      let promociones = factores.bonificaciones;
      let bonAfinidad = promociones[promociones[0]];
      let con_afinidad = false;
    if (promociones[0] >= 1 ){
        con_afinidad === true;
    }
      let array = [];
console.log(' factores:',factores)
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

	// //	<!-----------------------Bucle AVALIAN start------------------------>							
	              
    for (let j in precios) {
    //     console.log('imprimir j')

    //     console.log(j)


                
                let conPromo = con_afinidad;
                let empresaPlan = [j][0];
                // console.log('empresaPlan ')
                // console.log(empresaPlan)

                let _id = empresaPlan;
                let nombre = empresaPlan.substring(3);

                // console.log('conPromo : ' + conPromo)
                let promo = functions.promoDescuento(precios[j],bonAfinidad, conPromo)[2];
                let descPromo = functions.promoDescuento(precios[j],promo, conPromo)[1];
                let precioTotal = functions.promoDescuento(precios[j],promo, conPromo)[0];
                //  console.log('precioTotal');
                //  console.log(precioTotal)
               


                let precio = functions.final(tipoAsociado,factores.deduction,precioTotal);
                // console.log('precio ')
                // console.log(precio)

            //	<!--------------------Crear Objeto AVALIAN end------------------------------>																            			
            var plan = new Object();
                        plan.item_id = _id
                        plan.name = 'Avalian ' + nombre;			
                        plan.precio = precio;
                        plan.promoPorcentaje = promo;
                        plan.promoDescuento = descPromo;
                        plan.valorLista = precios[j];
                        plan.aportes_OS = factores.deduction;
                        array.push(plan);	
                    }
         //	<!-----------------------Bucle AVALIAN end------------------------>											
                    // console.log( 'array AVALIAN')							
                    // console.log(array)							

                    return array    
    } 
    

    
    
