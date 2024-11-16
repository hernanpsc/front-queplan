import * as functions from './functions';
// export function valor_Cristal(aportes_OS, valorCoeficiente, edad_1, edad_2,numHijos, group, grupo, con_afinidad,  bonAfinidad,Titular, Hijo1, Hijo2, Hijo3, Conyuge){
    export function valor_Cristal(aportes_OS, valorCoeficiente, edad_1, edad_2,numHijos, group, grupo, con_afinidad,  bonAfinidad, Titular, Hijo1, Hijo2, Hijo3, Conyuge){

// export function valor_Cristal(aportes_OS, valorCoeficiente, edad_1, edad_2,numHijos, group, grupo, con_afinidad,  bonAfinidad, Titular, Hijo1, Hijo2, Hijo3, Conyuge){
	// let Cristal = valor_Ra(aporte_OS,  buscar_mi_coeficiente,edad_1, edad_2,numHijos, group, grupo, afinidad, bonAfinidad, prices.precioTitularCristal.precios, prices.precioConyugeCristal.precios, prices.precioHijo1Cristal.precios, prices.precioHijo2Cristal.precios, prices.precioHijo3Cristal.precios);
	// console.log(' valor_Cristal ' , Cristal)
    let edad1 = edad_1;
	let edad2  = edad_2;
	let hijos  = numHijos;
	let grupoFam = group;
    let aportesOS = aportes_OS;
    let coeficiente = valorCoeficiente;
    let precioTitular = Titular;
    let precioConyuge = Conyuge;
    let precioHijo1 = Hijo1;
    let precioHijo2 = Hijo2;
    let precioHijo3 = Hijo3;
    let descuento_promo = bonAfinidad;
    let grupo_array = grupo;
 
  
    console.log('aportesOS Cristal :  '  + aportesOS);
    console.log('coeficiente Cristal :  '  + coeficiente);
    console.log('edad1 Cristal :  '  + edad1);
    console.log('edad2 Cristal :  '  + edad2);
    console.log('grupoFam Cristal :  '  + grupoFam);
    console.log('hijos Cristal :  '  + hijos);
    console.log('precioTitular Cristal :  '  );console.log(precioTitular);
    console.log('precioHijo1 Cristal :  '  );console.log(precioHijo1);
    console.log('precioHijo2 Cristal :  '  );console.log(precioHijo2);
    console.log('precioHijo3 Cristal :  '  );console.log(precioHijo3);
  
    console.log('descuento_promo Cristal :  '  + descuento_promo);
    console.log('grupo_array Cristal :  '  + grupo_array);






    if(grupoFam === 1 ){
		edad2 = 0;
		precioConyuge = [];
		hijos =0;
        console.log('hijos 45 Cristal :  '  + hijos);

	} else if (grupoFam === 2 ) {
		precioConyuge = [];
		edad2 = 0;
        console.log('hijos 51 Cristal :  '  + hijos);

	  } else if ( grupoFam === 3){
		hijos =0;
        console.log('precioConyuge Cristal :  '  + precioConyuge);

	  } else if ( grupoFam ==4){
        console.log('precioConyuge Cristal :  '  + precioConyuge);
          }
	  let precio_adultos_Cristal = {};
	  let precios = {};

      

      let descOS = functions.calculodescOS(aportesOS[0],aportesOS[2],aportesOS[3],coeficiente,aportesOS[4],aportesOS[5],aportesOS[1])
      let array = [];

      if (grupoFam >=  3) {
        precio_adultos_Cristal = Object.entries(precioConyuge).reduce((acc, [key, value]) => // matrimonio
            ({
                ...acc,
                [key]: parseInt((acc[key]) || 0) + parseInt(value)
            }), {
                ...precioTitular
            });
    } else {
        precio_adultos_Cristal = precioTitular
    }
    if (hijos >= 1) {
        precios = Object.entries(precioHijo1).reduce((acc, [key, value]) => ({
            ...acc,
            [key]: parseInt((acc[key]) || 0) + parseInt(value)
        }), {
            ...precio_adultos_Cristal
        });
    } else if (hijos >= 2) {
        precios = Object.entries(precioHijo2).reduce((acc, [key, value]) => ({
            ...acc,
            [key]: parseInt((acc[key]) || 0) + parseInt(value)
        }), {
            ...precio_adultos_Cristal
        });
    } else if (hijos >= 3) {
        precios = Object.entries(precioHijo3).reduce((acc, [key, value]) => ({
            ...acc,
            [key]: parseInt((acc[key]) || 0) + parseInt(value)
        }), {
            ...precio_adultos_Cristal
        });
    } else {
        precios = precio_adultos_Cristal;
    }

	// // //	<!-----------------------Bucle CRISTAL start------------------------>							
	              
    for (let j in precios) {
        console.log('imprimir j')

        console.log(j)


                
                let conPromo = con_afinidad;
                let promocion = bonAfinidad;

                console.log('promocion Cristal :  '  + promocion);
            
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

    //         //	<!--------------------Crear Objeto CRISTAL end------------------------------>																            			
        var plan = new Object();
                        plan.item_id = _id;
                        plan.name = 'Cristal ' + nombre;
                        plan.precio = precioTotal;
                        // plan.valorLista = precios[j];
                        // plan.promoPorcentaje = promo;
                        // plan.promoDescuento = descPromo;
                        // plan.valorLista = precios[j];
                        // plan.aporteOS = descOS;
                        array.push(plan);
                    
                    }
                    
            
    //      //	<!-----------------------Bucle CRISTAL end------------------------>											
    // //                 console.log( 'array CRISTAL')							
    // //                 console.log(array)							
    // return "hola"


                    return array    

}

