import * as functions from './functions';

export function valor_Bayresplan( prices,grupo, arrayDeducciones){
  // let	num_adultos = grupo[0];
	// let numhijo1 = grupo[1];
	// let numhijo = grupo[3];
	// let gen = grupo[4];
	// let arrayEdades = grupo[6];
	 
    
     
      
  

	let numhijo2 = grupo[2];

	let edad_1 = grupo[7];
  console.log('edad1 BayresPlan :  '  , edad_1);

	let edad_2 = grupo[8];
  console.log('edad_2 BayresPlan :  '  , edad_2);

	let hijos  = grupo[3];
  console.log('hijos BayresPlan :  '  , hijos);

  let familia = grupo[9];   
  console.log('familia BayresPlan :  '  , familia);

    let precioPrincipal = prices.precioBayresAdultos.precios.precios;
    console.log('precioPrincipal BayresPlan :  ' , precioPrincipal);// console.log(precioPrincipal);

    let precioHijoHasta25 = prices.precioBayresHijoHasta25.precios.precios;
    console.log('precioHijoHasta25 BayresPlan :  ' ,precioHijoHasta25 );// console.log(precioHijoHasta25);

    let precioAad18a49 = prices.precioBayresAd18a49.precios.precios;
    console.log('precioAad18a49 BayresPlan :  ',precioAad18a49  );// console.log(precioAad18a49);

    let precioJovenSinMaternidad = prices.precioBayresJovenSinMaternidad.precios.precios;
    console.log('precioJovenSinMaternidad BayresPlan :  ',precioJovenSinMaternidad   );// console.log(precioJovenSinMaternidad);

    let precioind18a29 = prices.precioBayresInd18a29.precios.precios;
    console.log('precioind18a29 BayresPlan :  ' , precioind18a29);// console.log(precioind18a29);

  

    let grupo_array = grupo;
    console.log('grupo_array BayresPlan :  '  + grupo_array);

    let empresa = 'Bayres Plan';




	  let precio_Bayres = {};
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


      
      precios = precioPrincipal;

    
	// // //	<!-----------------------Bucle BAYRES PLAN start------------------------>							
	              
    for (let j in precios) {
        // console.log('imprimir j')

        // console.log(j)


                
                let conPromo = con_afinidad;
                let promocion = bonAfinidad;

                // console.log('promocion Bayres :  '  + promocion);
            
                let empresaPlan = [j][0];

                let _id = empresaPlan;
                let nombre = empresaPlan.substring(3);

                // console.log('conPromo : ' + conPromo)
                // console.log('precios[j] : ' + precios[j])

                // let promo = functions.promoDescuento(precios[j],promocion, conPromo)[2];
                // console.log('promo : ' + promo)

                // let descPromo = functions.promoDescuento(precios[j],promo, conPromo)[1];
                // console.log('descPromo  >');
                // console.log(descPromo)
                // let precioTotal = functions.promoDescuento(precios[j],promo, conPromo)[0];
                let precioTotal = precios[j];

                 // console.log('precioTotal  >');
                 // console.log(precioTotal)
               
                //  console.log('factores');
                //   console.log(factores)
         

   

                // let precio = functions.final(tipoAsociado,factores.deduction,precioTotal);
                // console.log('precio ')
                // console.log(precio)

    //         //	<!--------------------Crear Objeto BAYRES PLAN end------------------------------>																            			
        var plan = new Object();
                        plan.item_id = _id;
                        plan.name = 'Bayres Plan' + nombre;
                        plan.precio = precioTotal;
                        // plan.valorLista = precios[j];
                        // plan.promoPorcentaje = promo;
                        // plan.promoDescuento = descPromo;
                        // plan.valorLista = precios[j];
                        plan.aportes_OS = factores.deduction;
                        array.push(plan);
                    
                    }
                    
            
    //      //	<!-----------------------Bucle BAYRES PLAN end------------------------>											
    // //                 console.log( 'array BAYRES PLAN')							
    // //                 console.log(array)							
    // return "hola"


                    return array

    
    }