import * as functions from './functions';

export function valor_Luispasteur(aportes_OS, valorCoeficiente,edad_1, edad_2,numHijos, group,  grupo, con_afinidad,bonAfinidad,Adultos, Nieto, Adicional, Hijo ){
    

    let edad1 = edad_1;
	let edad2  = edad_2;
	let hijos  = numHijos;
	let grupoFam = group;    
    let aportesOS = aportes_OS;
    let coeficiente = valorCoeficiente;
    let precioPrincipal = Adultos;
    let precioNieto = Nieto;
    let precioAdicional = Adicional;
    let precioHijo = Hijo;
    let descuento_promo = bonAfinidad;
    let grupo_array = grupo;
    
    console.log('aportesOS Luis_Pasteur :  '  + aportesOS);
    console.log('coeficiente Luis_Pasteur :  '  + coeficiente);
    console.log('edad1 Luis_Pasteur :  '  + edad1);
    console.log('edad2 Luis_Pasteur :  '  + edad2);
    console.log('grupoFam Luis_Pasteur :  '  + grupoFam);
    console.log('hijos Luis_Pasteur :  '  + hijos);
    console.log('precioPrincipal Luis_Pasteur :  '  );console.log(precioPrincipal);
    console.log('precioNieto Luis_Pasteur :  '  );console.log(precioNieto);
    console.log('precioAdicional Luis_Pasteur :  '  );console.log(precioAdicional);
    console.log('precioHijo Luis_Pasteur :  '  );console.log(precioHijo);
  
    console.log('descuento_promo Luis_Pasteur :  '  + descuento_promo);
    console.log('grupo_array Luis_Pasteur :  '  + grupo_array);

    
    if(grupoFam === 1 ){
		edad2 = 0;
		precioNieto = [];
        precioAdicional = [];
        precioHijo = [];
		hijos =0;
        console.log('hijos 45 Luis Pasteur :  '  + hijos);

	} else if (grupoFam === 2 ) {
		edad2 = 0;
	  } else if ( grupoFam === 3){
		hijos =0;
        console.log('hijos 51 Luis Pasteur :  '  + hijos);

        precioNieto = [];
        precioAdicional = [];
        precioHijo = [];

	  } else if ( grupoFam ==4){
    }
   
    let precio_LuisPasteur = {};
    let precios = {};

    let descOS = functions.calculodescOS(aportesOS[0],aportesOS[2],aportesOS[3],coeficiente,aportesOS[4],aportesOS[5],aportesOS[1])
    let array = [];


    
    precios = precioPrincipal;

  
  // // //	<!-----------------------Bucle LUIS PASTEUR start------------------------>							
                
  for (let j in precios) {
      console.log('imprimir j')

      console.log(j)


              
              let conPromo = con_afinidad;
              let promocion = bonAfinidad;

              console.log('promocion Luis Pasteur :  '  + promocion);
          
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

  //         //	<!--------------------Crear Objeto LUIS PASTEUR end------------------------------>																            			
      var plan = new Object();
                      plan.item_id = _id;
                      plan.name = 'Luis Pasteur ' + nombre;
                      plan.precio = precioTotal;
                      // plan.valorLista = precios[j];
                      // plan.promoPorcentaje = promo;
                      // plan.promoDescuento = descPromo;
                      // plan.valorLista = precios[j];
                      // plan.aporteOS = descOS;
                      array.push(plan);
                  
                  }
                  
          
  //      //	<!-----------------------Bucle LUIS PASTEUR end------------------------>											
  // //                 console.log( 'array LUIS PASTEUR')							
  // //                 console.log(array)							
  // return "hola"


                  return array    
                }               