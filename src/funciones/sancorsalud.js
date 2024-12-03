import * as functions from './functions';

export	function  valor_SanCor( prices,grupo, arrayDeducciones){
    let segvida1 = false;
	let segvida2 = false;
    let supra_salud = false;
	let edad1 = grupo[7];
	let edad_2  = grupo[8];
	let hijos  = grupo[3];
	let precio1Hijo = prices.precioSanCor1Hijo.precios.precios;
	let precio2Hijo = prices.precioSanCor2Hijo.precios.precios;
	let precioTitular = prices.precioSanCorTitular.precios.precios;
	let preciosConyuge = prices.precioConyugeSanCor.precios.precios;
	let numhijo2 = grupo[2];
	// console.log(grupoFam)
	let empresa = 'SanCor Salud';
	let familia = grupo[9];
	let capitas = grupo[5];
	if(familia === 1 ){
		edad_2 = 0;
		preciosConyuge = 0;
		hijos =0;
	} else if (familia === 2 ) {
		preciosConyuge = 0;
		edad_2 = 0;
	  } else if ( familia ===3){
		hijos =0;
	  }

console.log('preciosConyuge');
console.log(preciosConyuge);

console.log('hijos');
console.log(hijos);
	  let precio_adultos_Sancor = {};
	let precios = {};
	         

	
//Funcion para el calculo de aportes
      let factores = arrayDeducciones.find(item => item.name === empresa);
	  let tipoAsociado = factores.tipo_Ingreso_Original_P_D;
	  console.log('factores   :' , factores);
	  console.log('tipoAsociado   :' , tipoAsociado);
	  let promociones = factores.bonificaciones;
	  let bonAfinidad = promociones[promociones[0]];
	  let con_afinidad = false;
	if (promociones[0] >= 1 ){
		con_afinidad === true;
	}

let array = [];

		if (edad_2 > 17) {
			precio_adultos_Sancor = Object.entries(preciosConyuge).reduce((acc, [key, value]) => // matrimonio
				({
					...acc,
					[key]: parseInt((acc[key]) || 0) + parseInt(value)
				}), {
					...precioTitular
				});
		} else {
			precio_adultos_Sancor = precioTitular
		}
		if (hijos == 1) {
			precios = Object.entries(precio1Hijo).reduce((acc, [key, value]) => ({
				...acc,
				[key]: parseInt((acc[key]) || 0) + parseInt(value)
			}), {
				...precio_adultos_Sancor
			});
		} else if (hijos > 1) {
			let precio_hijos = Object.entries(precio2Hijo).reduce((acc, [key, value]) => // dis hijos o mas
				({
					...acc,
					[key]: parseInt((acc[key]) || 0) + parseInt(value * numhijo2)
				}), {
					...precio1Hijo
				});
			precios = Object.entries(precio_hijos).reduce((acc, [key, value]) => ({
				...acc,
				[key]: parseInt((acc[key]) || 0) + parseInt(value)
			}), {
				...precio_adultos_Sancor
			});
		} else {
			precios = precio_adultos_Sancor;
		}
		// console.log('precios 58')
        // console.log(precios)
	//	<!-----------------------Bucle SANCOR start------------------------>							
	              
	       for (let j in precios) {
			// console.log('imprimir j')

			// console.log(j)

			        let otrosBenPrecios = [{"col_1": 1, "col_2": 2758, "col_3": 2528, "col_4": 1620, "SSPRO": 275, "SSOD": 633, "SSAC": 145, "SUF": 85, "CS": 1620},{"col_1": 2, "col_2": 5512, "col_3": 5052, "col_4": 3240, "SSPRO": 545, "SSOD": 1267, "SSAC": 290, "SUF": 170, "CS": 3240},{"col_1": 3, "col_2": 7658, "col_3": 6961, "col_4": 4860, "SSPRO": 834, "SSOD": 1267, "SSAC": 442, "SUF": 255, "CS": 4860},{"col_1": 4, "col_2": 9785, "col_3": 8855, "col_4": 6480, "SSPRO": 1108, "SSOD": 1267, "SSAC": 590, "SUF": 340, "CS": 6480},{"col_1": 5, "col_2": 11923, "col_3": 10756, "col_4": 8100, "SSPRO": 1389, "SSOD": 1267, "SSAC": 742, "SUF": 425, "CS": 8100},{"col_1": 6, "col_2": 14041, "col_3": 12645, "col_4": 9720, "SSPRO": 1658, "SSOD": 1267, "SSAC": 886, "SUF": 510, "CS": 9720}]

					let segVidaPrecio = [{"col_1": '18 A 45', "col_2": 800},{"col_1": '46 A 54', "col_2": 1244},{"col_1": '55 A 59', "col_2": 1486}]
					
					let segVidacheck = segvida1;
					let segVida2check = segvida2;					    						
					let segVidaTotal = 	functions.segVidaPlus(segVidacheck,segVida2check,edad1,edad_2,segVidaPrecio);
					let conPromo = con_afinidad;
					let empresaPlan = [j][0];
					// console.log('empresaPlan ')
					// console.log(empresaPlan)

					let _id = empresaPlan;

					let gen = grupo[4];
					let plan_gen = empresaPlan.substring(3, 6);
					let nombre = functions.planNombre(gen,plan_gen,empresaPlan.substring(3))
					let confirmaSiTieneBonificaciones = con_afinidad;
					let porcentajeBonificado = bonAfinidad;
					let precioInicial = precios[j];
					// console.log('precioInicial SanCor Salud  :');console.log(precioInicial)					
					let bonInscr = parseInt(precioInicial) * 0.1;
					let otrosBen = functions.suprasSalud(supra_salud,gen,nombre,otrosBenPrecios,familia);

					// Llamar a la función y desestructurar el array devuelto
					let [valor_total_plan, valorBonificacion] = functions.promoDescuento(precioInicial, porcentajeBonificado, confirmaSiTieneBonificaciones);

					// Asignar los valores a nuevas variables
					let precioTotal = valor_total_plan;
					let bonificacionAplicada = valorBonificacion;

					// Mostrar los resultados en consola
					// console.log('precioTotal :');
					// console.log(precioTotal);

					// console.log('bonificacionAplicada :');
					// console.log(bonificacionAplicada);


					let cuotaSocial = otrosBenPrecios[capitas - 1]['CS'];

					// console.log('cuotaSocial');
					// console.log(cuotaSocial)
                    // console.log('otrosBen');
					// console.log(otrosBen)
					// console.log('segVidaTotal');
					// console.log(segVidaTotal)

					let otrosCargos = parseInt(cuotaSocial) + parseInt(otrosBen) + parseInt(segVidaTotal);
					// console.log('otrosCargos');
					// console.log(otrosCargos)

					
					
					
					precioTotal = precioTotal + otrosCargos;
					// console.log('precioTotal');// console.log(precioTotal)
                    // console.log('factores');// console.log(factores)
					// console.log('precioTotal');// console.log(precioTotal)


					let precio = functions.final(tipoAsociado,factores.deduction,precioTotal);
					// console.log('precio ')
					// console.log(precio)
					// if (tipoAsociado === "I") {
					// 	precio = parseInt(precioTotal) - parseInt(bonInscr);
					// 	factores = bonInscr;
					// 	textoAportesOS = 'Bonif. RI :'
					//  }
				//	<!--------------------Crear Objeto SANCOR end------------------------------>																            			
				var plan = new Object();
				             plan.item_id = _id
							if(nombre.includes(5000) || nombre.includes(6000)){
								plan.name = 'Exclusive ' + nombre;
							} else {
								plan.name = 'SanCor ' + nombre;
							}					
							plan.seguroVidaPlus = segVidaTotal;		
							plan.precio = precio;
							plan.promoPorcentaje = porcentajeBonificado;
				        	plan.promoDescuento = bonificacionAplicada;
				            plan.valorLista = precioInicial;
							plan.aportes_OS = factores.deduction;
							array.push(plan);	
						}
			 //	<!-----------------------Bucle SANCOR end------------------------>											
						// console.log( 'array SANCOR')							
						// console.log(array)							

						return array
					}
// <!----------------------Funcion VALOR DEL PLAN SANCOR end----------------------------> 