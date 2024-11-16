import * as functions from './functions';
//  grupoFamiliar, AdmenorUno, HijoHasta21, RecargoHijo21a29
export function valor_Asmepriv(aportes_OS,valorCoeficiente,edad_1, edad_2,numHijos, group,  grupo, con_afinidad,bonAfinidad,grupoFamiliar, AdmenorUno, HijoHasta21, RecargoHijo21a29){
   
    let edad1 = edad_1;
	let edad2  = edad_2;
	let hijos  = numHijos;
	let grupoFam = group;    
    let aportesOS = aportes_OS;
    let coeficiente = valorCoeficiente;
    let precioPrincipal = grupoFamiliar;
    let precioAdmenorUnAnio = AdmenorUno;
    let precioHijoHasta21 = HijoHasta21;
    let precioRecargoHijo21a29 = RecargoHijo21a29;
    let descuento_promo = bonAfinidad;
    let grupo_array = grupo;
    
    console.log('aportesOS Asmepriv :  '  + aportesOS);
    console.log('coeficiente Asmepriv :  '  + coeficiente);
    console.log('edad1 Asmepriv :  '  + edad1);
    console.log('edad2 Asmepriv :  '  + edad2);
    console.log('grupoFam Asmepriv :  '  + grupoFam);
    console.log('hijos Asmepriv :  '  + hijos);
    console.log('precioPrincipal Asmepriv :  '  );console.log(precioPrincipal);
    console.log('precioAdmenorUnAnio Asmepriv :  '  );console.log(precioAdmenorUnAnio);
    console.log('precioHijoHasta21 Asmepriv :  '  );console.log(precioHijoHasta21);
    console.log('precioRecargoHijo21a29 Asmepriv :  '  );console.log(precioRecargoHijo21a29);
  
    console.log('descuento_promo Asmepriv :  '  + descuento_promo);
    console.log('grupo_array Asmepriv :  '  + grupo_array);





    if(grupoFam === 1 ){
		edad2 = 0;
		precioAdmenorUnAnio = [];
        precioHijoHasta21 = [];
        precioRecargoHijo21a29 = [];
		hijos =0;
        console.log('hijos 45 Asmepriv :  '  + hijos);

	} else if (grupoFam === 2 ) {
		edad2 = 0;
        console.log('hijos 51 Asmepriv :  '  + hijos);

	  } else if ( grupoFam === 3){
		hijos =0;
        precioAdmenorUnAnio = [];
        precioHijoHasta21 = [];
        precioRecargoHijo21a29 = [];

	  } else if ( grupoFam ==4){
    }

	  let precio_Asmepriv = {};
	  let precios = {};

      let descOS = functions.calculodescOS(aportesOS[0],aportesOS[2],aportesOS[3],coeficiente,aportesOS[4],aportesOS[5],aportesOS[1])
      let array = [];


      
      precios = precioPrincipal;

    
	// // //	<!-----------------------Bucle ASMEPRIV start------------------------>							
	              
    for (let j in precios) {
        console.log('imprimir j')

        console.log(j)


                
                let conPromo = con_afinidad;
                let promocion = bonAfinidad;

                console.log('promocion Asmepriv :  '  + promocion);
            
                let empresaPlan = [j][0];

                let _id = empresaPlan;
                let nombre = empresaPlan.substring(3);

                console.log('conPromo : ' + conPromo)
                console.log('precios[j] : ' + precios[j])

                // let promo = functions.promoDescuento(precios[j],promocion, conPromo)[2];
                // console.log('promo : ' + promo)

                // let descPromo = functions.promoDescuento(precios[j],promo, conPromo)[1];
                // console.log('descPromo  >');
                // console.log(descPromo)
                // let precioTotal = functions.promoDescuento(precios[j],promo, conPromo)[0];
                let precioTotal = precios[j];

                 console.log('precioTotal  >');
                 console.log(precioTotal)
               
                //  console.log('descOS');
                //   console.log(descOS)
         

                //  console.log('aportes_OS[0]');
                //  console.log(aportesOS[0])

                // let precio = functions.final(aportesOS[0],descOS,precioTotal);
                // console.log('precio ')
                // console.log(precio)

    //         //	<!--------------------Crear Objeto ASMEPRIV end------------------------------>																            			
        var plan = new Object();
                        plan.item_id = _id;
                        plan.name = 'Asmepriv ' + nombre;
                        plan.precio = precioTotal;
                        // plan.valorLista = precios[j];
                        // plan.promoPorcentaje = promo;
                        // plan.promoDescuento = descPromo;
                        // plan.valorLista = precios[j];
                        // plan.aporteOS = descOS;
                        array.push(plan);
                    
                    }
                    
            
    //      //	<!-----------------------Bucle ASMEPRIV end------------------------>											
    // //                 console.log( 'array ASMEPRIV')							
    // //                 console.log(array)							
    // return "hola"


                    return array    

}