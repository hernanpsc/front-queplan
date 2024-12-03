
export function grupoFamiliar(age0, age1, kids,family,edadh1,edadh2,edadh3,edadh4,edadh5) {
    let edad_1 = age0;
    let edad_2 = age1;
	let familia = family;
    let num_adultos = 1;
    let primerhijo = 0;
    let restohijos = 0;
    let gen = '';
    let capitas = 0;
    let hijos = kids + 1;
    let totalhijos = 0;
    let arrayEdadesHijos = [];
    let edadesHijos = [edadh1,edadh2,edadh3,edadh4,edadh5]
	let grupoSigla = 'IND';

	    // Ensure age2 is not greater than age
		if (edad_2 > edad_1) {
			[edad_1, edad_2] = [edad_2, edad_1];  // Swap values if age2 is greater than age
		}
	if( familia === 1){
		edad_2 = 0;
		hijos = 0;
	} else if( familia === 2){
		edad_2 = 0;
        for(let i=0;i < hijos;i++ ){
            arrayEdadesHijos.push(edadesHijos[i]);
        }
	}else if (familia === 3  ){
		hijos = 0;
		grupoSigla = 'MAT';
     
	}else{
		grupoSigla = 'MAT'; 
		 for(let i=0;i < edadesHijos.length;i++ ){
        arrayEdadesHijos.push(edadesHijos[i]);
    }}



    if (kids === null) {
        hijos = 0;
    }
    if (age1 === null) {
        edad_2 = 0;
    }

	if (edad_2 == 0 && hijos == 0) {
		num_adultos = 1;
		primerhijo = 0;
		restohijos = 0;
		hijos = 0;
	} else if (edad_2 > 0 && hijos == 0) {
		num_adultos = 2;
		primerhijo = 0;
		restohijos = 0;
		hijos = 0;
	} else if (edad_2 == 0 && hijos >= 1) {
		num_adultos = 1;
		primerhijo = 1;
		restohijos = hijos - 1;
		hijos = hijos;
	} else if (edad_2 > 0 && hijos >= 1) {
		num_adultos = 2;
		primerhijo = 1;
		restohijos = hijos - 1;
		totalhijos = hijos;
	}
	capitas = parseInt(num_adultos) + parseInt(totalhijos);
    clearTimeout = parseInt(hijos);
    if (edad_1 <= 35 && edad_2 <= 35) {
        gen = 'GEN';
    } else {
        gen = '';
    }
// console.log('fila 66 :', num_adultos)
// console.log('fila 66 :', primerhijo)
// console.log('fila 66 :', restohijos)
// console.log('fila 66 :', totalhijos)
// console.log('fila 66 :', gen)
// console.log('fila 66 :', capitas)
// console.log('fila 66 :', arrayEdadesHijos)
// console.log('fila 66 :', edad_1)
// console.log('fila 66 :', edad_2)
// console.log('fila 66 :', familia)


	// console.log(capitas)
    return [num_adultos, primerhijo, restohijos, totalhijos, gen, capitas,arrayEdadesHijos,edad_1,edad_2,familia,grupoSigla];
}

	//	<!----------------------FUNCIONES QUE SE USAN EL CONTROLADOR CORIZACION ANTES DE ENTREGAR EL RESULTADO------------------------>							

  	
	export function combinePlansWithPrices(planes, precios) {
		const combinedArray = [];
			//   console.log(planes)
	
		planes.forEach((plan) => {
			// console.log(plan)
	
		  const matchingPrecio = precios.find((precio) => precio.item_id === plan.item_id);
		//   console.log(plan.item_id);
		//   console.log(precios.item_id);
	
	
		  if (matchingPrecio) {
			// Combina todas las propiedades de planes y precios en un nuevo objeto
			const combinedPlan = {
			  ...plan._doc,
			  ...matchingPrecio,
			};
			// console.log(combinedPlan)
	
			// Agrega el objeto combinado al array resultado
			combinedArray.push(combinedPlan);
		  }
		});
	  
		return combinedArray;
	  }
	  
	  
	  
	  
	
	 // Función para agrupar y transformar elementos de omintPlanes
	 export function agruparYTransformarPlanes(omintPlanes) {
		// Crear un objeto para agrupar los elementos por los primeros 7 caracteres de item_id
		const grupos = {};
	  
		omintPlanes.forEach((plan) => {
		  const item_idPrefix = plan.item_id.substring(0, 7);
	  
		  if (!grupos[item_idPrefix]) {
			// Si el grupo no existe, crearlo con un elemento inicial
			grupos[item_idPrefix] = {
			  item_id: item_idPrefix,
			  name: plan.name.substring(0, 4),
			  precio: [{ name: plan.item_id.split('_')[2], precio: plan.precio }],
			};
		  } else {
			// Si el grupo ya existe, agregar el precio al array de precios
			grupos[item_idPrefix].precio.push({ name: plan.item_id.split('_')[2], precio: plan.precio });
		  }
	  
		  // Copiar todas las propiedades del plan original al grupo
		  for (const prop in plan) {
			if (plan.hasOwnProperty(prop) && !grupos[item_idPrefix].hasOwnProperty(prop)) {
			  grupos[item_idPrefix][prop] = plan[prop];
			}
		  }
		});
	  
		// Obtener los elementos agrupados como un array
		const planesAgrupados = Object.values(grupos);
	  
		return planesAgrupados;
	 }
	
	
	
	
		//	<!-----------------------FUNCIONES QUE SE USAN EN LOS ARCHIVOS DE ESTA MISMA CARPETA PARA EL CALCULO DELOS PRECIOS------------------------>							
		// let descOS = functions.calculodescOS(aportesOS[0],aportesOS[2],aportesOS[3],coeficiente,aportesOS[4],aportesOS[5],aportesOS[1])

		
	 export function calculodescOS(aportes_OS,empresa){
		console.log('linea functions 79 :  ',aportes_OS)
		console.log('linea functions 80 :  ',empresa)

        let prepaga = empresa;
		let tipo_IngresoPDMI =aportes_OS[0];
		console.log('linea functions 84 :  ',tipo_IngresoPDMI)

		let cifraRecibida =aportes_OS[3];
		console.log('linea functions 87 :  ',cifraRecibida)


		let arrayFactores = aportes_OS[5];
		console.log('linea functions 83 :  ',arrayFactores)
        
		let categoria_Mono =aportes_OS[4];
		if(categoria_Mono){
		console.log('linea functions 86 categoria_Mono:  ',categoria_Mono)
		}
		const bonificaciones = buscar_valores(arrayFactores, prepaga,categoria_Mono)[2];
		console.log('linea functions 99 bonificaciones',bonificaciones)

        let coeficiente = buscar_valores(arrayFactores, prepaga,categoria_Mono)[0];
		console.log('linea functions 99 coeficiente',coeficiente)

		const descXCapita = buscar_valores(arrayFactores, prepaga, categoria_Mono)[1];

		console.log('linea functions 104 descXCapita',descXCapita)
		let beneficiariosF184 =aportes_OS[1];
			console.log('tipo_IngresoPDMI linea 104    :      ' ,tipo_IngresoPDMI);
			console.log('cifraRecibida  linea 105    :      ' ,cifraRecibida);
			console.log('coeficiente   linea 106   :      ' ,coeficiente);
			console.log('categoria_Mono    linea 107  :      ' ,categoria_Mono);
			console.log('beneficiariosF184   linea 108  :      ' ,beneficiariosF184);

	let deduccionOS = 0;
					
	console.log('linea functions 116 deduccionOS',deduccionOS)

		if (tipo_IngresoPDMI == "D") {
			if ( cifraRecibida > 300000) {
				deduccionOS = cifraRecibida * coeficiente/100;
				console.log('linea functions 120 cifraRecibida',cifraRecibida)
				console.log('linea functions 120 coeficiente',coeficiente)
				console.log('linea functions 120 deduccionOS',deduccionOS)
			} else if (cifraRecibida < 290000) {
				deduccionOS = cifraRecibida /3*coeficiente;
				console.log('linea functions 125 cifraRecibida',cifraRecibida)
				console.log('linea functions 125 coeficiente',coeficiente)
				console.log('linea functions 125 deduccionOS',deduccionOS)
			} else if (beneficiariosF184 > 0) {
	
				deduccionOS = deduccionOS + (beneficiariosF184 * descXCapita);
				console.log('linea functions 131 cifraRecibida',cifraRecibida)
				console.log('linea functions 131 coeficiente',coeficiente)
				console.log('linea functions 131 deduccionOS',deduccionOS)
			};
		} else if (tipo_IngresoPDMI === "M" || cifraRecibida === "" && beneficiariosF184 > 0 ) {
			deduccionOS = beneficiariosF184 * descXCapita;
			console.log('linea functions 131 beneficiariosF184',beneficiariosF184)
			console.log('linea functions 131 descXCapita',descXCapita)
			console.log('linea functions 131 tipo_IngresoPDMI',tipo_IngresoPDMI)
			tipo_IngresoPDMI === "M";
		} else {
			deduccionOS = 0;
	}	console.log('linea functions 132 deduccionOS',deduccionOS)

	return [deduccionOS,tipo_IngresoPDMI,bonificaciones]
}

	
	export function promoDescuento(valor_plan, porcentajeBonificado, confirmaSiTienePromo) {

		let descuentoAplicado = 0;
		let nuevoValor = valor_plan;
		console.log('descuentoAplicado:',descuentoAplicado);
		console.log('nuevoValor:', nuevoValor);
		console.log('valor_plan:', valor_plan);

		if (confirmaSiTienePromo) {
		  descuentoAplicado = valor_plan * (porcentajeBonificado / 100);
		  nuevoValor = valor_plan - descuentoAplicado;
		}
		console.log('descuentoAplicado:',descuentoAplicado);
		console.log('nuevoValor:', nuevoValor);
		console.log('valor_plan:', valor_plan);

		// // Verificar el valor antes de retornarlo
		console.log('Devolviendo array desde promoDescuento:', [nuevoValor, descuentoAplicado]);
		
		// Devolver un array con el valor final y el descuento
		return [nuevoValor, descuentoAplicado];
	 }
	 
	
	
	export function final(tipo_IngresoPDMI,deduccionAportesObraSocial,valor_total_plan){


		let tipoIngresoPDMI = tipo_IngresoPDMI;
		console.log('tipo_IngresoPDMI :', tipo_IngresoPDMI);

		let deduccion_AportesObraSocial = deduccionAportesObraSocial;
		console.log('deduccionAportesObraSocial 1:', deduccionAportesObraSocial);

		let valortotal_plan = valor_total_plan;
		console.log('valor_total_plan :', valor_total_plan);

		let precio_final_a_pagar = valortotal_plan;
		console.log('precio_final_a_pagar 1 :', precio_final_a_pagar);

		if (tipoIngresoPDMI === "M" || tipoIngresoPDMI === "D") {
			deduccion_AportesObraSocial = parseInt(deduccion_AportesObraSocial);
			console.log('deduccionAportesObraSocial 2:', deduccionAportesObraSocial);

			precio_final_a_pagar = parseInt(valor_total_plan)- deduccion_AportesObraSocial;
			console.log('precio_final_a_pagar 2 :', precio_final_a_pagar);

		} else {
			precio_final_a_pagar = valortotal_plan;
			console.log('precio_final_a_pagar 3 :', precio_final_a_pagar);

		}
		if (precio_final_a_pagar < 0){
			precio_final_a_pagar = 0;
			console.log('precio_final_a_pagar 4 :', precio_final_a_pagar);

		}
		console.log('precio_final_a_pagar 5 :', precio_final_a_pagar);

		return precio_final_a_pagar
		}
	
		//	<!-----------------------ESTAS FUNCIONES LAS USA SOLO SANCOR SALUD------------------------>							
	
		export function segVidaPlus(segVidacheck,segVida2check,edad1,edad2,segVidaPrecio){
			let segVidaTotal = 0;
			let segVida = 0;
			let segVida1 = 0;
			if (segVidacheck == true) {
				if (edad1 >= 18 && edad1 <= 45) {
					segVida = segVidaPrecio[0]['col_2']
				} else if (edad1 >= 46 && edad1 <= 54) {
					segVida = segVidaPrecio[1]['col_2']
				} else {
					segVida = segVidaPrecio[2]['col_2']
				};
			}
			if (segVida2check == true) {
				if (edad2 < 18) {
					segVida1 = 0;
				} else if (edad2 >= 18 && edad2 <= 45) {
					segVida1 = segVidaPrecio[0]['col_2']
				} else if (edad1 >= 46 && edad1 <= 54) {
					segVida1 = segVidaPrecio[1]['col_2']
				} else {
					segVida1 = segVidaPrecio[2]['col_2']
				};
				segVidaTotal = segVida + segVida1;
			}
			segVidaTotal = segVida + segVida1;
		 return segVidaTotal
		}
	
	
	
	export function planNombre(gen,plan_gen,plan_nombre){
		// console.log('26 0')
		let nombrePlan = "";
		if (gen === 'GEN' && plan_gen >= 100 && plan_gen <= 450) {
			nombrePlan = 'GEN' + plan_nombre;
			// console.log('26 1')

		} else {
			nombrePlan = plan_nombre;
			// console.log('26 2')

		};
		// console.log('26 3')
		console.log(nombrePlan)
		return nombrePlan;
	}
		
	export function suprasSalud(supras,gen,plan_nombre,otrosBenPrecios,grupoFam){
		
		
		
		
		
		
		
		
		
		
	
		let otrosBen = 0;
		if (supras === true && gen === '') {
			otrosBen = 0;
			if (plan_nombre.includes('B')) {
				otrosBen = otrosBen + otrosBenPrecios[grupoFam - 1]['SSPRO'];
				
		
				otrosBen = otrosBen + otrosBenPrecios[grupoFam - 1]['SSOD'];
				
		
			} else {
				otrosBen = otrosBen + otrosBenPrecios[grupoFam - 1]['SSPRO'];
	
				otrosBen = otrosBen + otrosBenPrecios[grupoFam - 1]['SSOD'];
				otrosBen = otrosBen + otrosBenPrecios[grupoFam - 1]['SSAC'];
				otrosBen = otrosBen + otrosBenPrecios[grupoFam - 1]['SUF'];
			};
		}return otrosBen
	}
	
export function imprimirPrecios(prices,ids){

	  const claves = [	  
		{ key: 'precioSanCor1Hijo', index: [0, 2] },
		{ key: 'precioSanCor2Hijo', index: [0, 3] },
		{ key: 'precioSanCorTitular', index: [0, 0] },
		{ key: 'precioConyugeSanCor', index: [0, 1] },
		{ key: 'precio_titular_Omint', index: [1, 0] },
		{ key: 'precio_conyuge_Omint', index: [1, 1] },
		{ key: 'precio_hijo1_Omint', index: [1, 2] },
		{ key: 'precio_hijo2_Omint', index: [1, 3] },
		{ key: 'priceAdultosPr', index: [14, 0] },
		{ key: 'pricePrHijoMenir1', index: [14, 1] },
		{ key: 'pricePrHijoMenir25', index: [14, 2] },
		{ key: 'precioTitularSwiss', index: [3, 0] },
		{ key: 'precioConyugeSwiss', index: [3, 1] },
		{ key: 'precioHijo1Swiss', index: [3, 2] },
		{ key: 'precioHijo2Swiss', index: [3, 3] },
		{ key: 'priceGrupoGaleno', index: [2] },
		{ key: 'precioMedifeAdultos', index: [4, 0] },
		{ key: 'precioMedifeHIJO0a1', index: [4, 1] },
		{ key: 'precioMedifeHIJO2a20', index: [4, 2] },
		{ key: 'precioMedifeHIJO21a29', index: [4, 3] },
		{ key: 'precioPrevencion', index: [5] },
		{ key: 'precioDoctoredGrupo', index: [6, 0] },
		{ key: 'precioDoctoredHijo3', index: [6, 1] },
		{ key: 'precioDoctoredAd', index: [6, 2] },
		{ key: 'precioAvalianTitular', index: [7, 0] },
		{ key: 'precioAvalianConyuge', index: [7, 1] },
		{ key: 'precioAvalianHijo1', index: [7, 2] },
		{ key: 'precioAvalianHijo2', index: [7, 3] },
		{ key: 'precioAvalianHijo3', index: [7, 4] },
		{ key: 'precioAvalianHijo25', index: [7, 5] },
		{ key: 'precioTitularRas', index: [8, 0] },
		{ key: 'precioConyugeRas', index: [8, 1] },
		{ key: 'precioHijo1Ras', index: [8, 2] },
		{ key: 'precioHijo2Ras', index: [8, 3] },
		{ key: 'precioHijo3Ras', index: [8, 4] },
		{ key: 'precioTitularCristal', index: [8, 5] },
		{ key: 'precioConyugeCristal', index: [8, 6] },
		{ key: 'precioHijo1Cristal', index: [8, 7] },
		{ key: 'precioHijo2Cristal', index: [8, 8] },
		{ key: 'precioHijo3Cristal', index: [8, 9] },
		{ key: 'precioLuispasteurAdultos', index: [9, 0] },
		{ key: 'precioLuispasteurNieto', index: [9, 1] },
		{ key: 'precioLuispasteurAdicional', index: [9, 2] },
		{ key: 'precioLuispasteurHijo', index: [9, 3] },
		{ key: 'precioAsmepriv', index: [10, 0] },
		{ key: 'precioAdmenorUno', index: [10, 1] },
		{ key: 'precioAsmeprivHijoHasta21', index: [10, 2] },
		{ key: 'precioAsmeprivRecargoHijo21a29', index: [10, 3] },
		{ key: 'precioAsmeprivModuloMat', index: [10, 4] },
		{ key: 'precioBayresAdultos', index: [11, 0] },
		{ key: 'precioBayresHijoHasta25', index: [11, 1] },
		{ key: 'precioBayresAd18a49', index: [11, 2] },
		{ key: 'precioBayresJovenSinMaternidad', index: [11, 3] },
		{ key: 'precioBayresInd18a29', index: [11, 4] },
		{ key: 'precioHominis', index: [12] },
		{ key: 'precioSaludcentralTitular', index: [13, 0] },
		{ key: 'precioSaludcentralConyuge', index: [13, 1] },
		{ key: 'precioSaludcentralHijo1', index: [13, 2] },
		{ key: 'precioSaludcentralHijo2', index: [13, 3] },
	  ];
 
	  claves.forEach(({ key, index }) => {
		try {
		  const id = ids[index[0]]?.[index[1]];
		  const precio = prices[key]?.precios;
	
		  console.log(`${key} : ${id}`);
		  console.log(precio);
		} catch (error) {
		  console.error(`Error al procesar ${key}:`, error);
		}
	  });
	}
	export function buscar_valores(arreglo, nombre, cat) {
		// Mapear las letras de categoría a índices
		let orden = '';
		if (cat === "A") orden = 0;
		else if (cat === "B") orden = 1;
		else if (cat === "C") orden = 2;
		else if (cat === "D") orden = 3;
		else if (cat === "E") orden = 4;
		else if (cat === "F") orden = 5;
		else if (cat === "G") orden = 6;
		else if (cat === "H") orden = 7;
		else if (cat === "I") orden = 8;
		else if (cat === "J") orden = 9;
		else if (cat === "K") orden = 10;
	  
		// Encontrar la empresa en el arreglo
    // Buscar la empresa en el arreglo
    const empresa = arreglo.find(item => item.nombre === nombre);
    console.log('Empresa encontrada:', empresa);

    if (!empresa) {
        console.warn('Empresa no encontrada');
        return null;
    }

    // Acceder a los factores de la empresa
    const { factores } = empresa;

    const coeficiente = factores?.coeficiente || null;
    const bonificaciones = factores?.monotributo || null;

    // Acceder a otros arrays
    const valorMonotributo = factores?.mono[orden] || {};

    // Mostrar en consola para depuración
    console.log('Bonificaciones:', bonificaciones);

    console.log('Coeficiente:', coeficiente);
    console.log('Valor Monotributo:', valorMonotributo);

    // Retornar los valores necesarios
    return [coeficiente, valorMonotributo, bonificaciones];
}




import {valor_Omint, valor_Premedic, valor_SanCor, valor_Galeno, valor_Swiss, valor_Doctored, valor_Prevencion, valor_Avalian, valor_Ras, valor_Cristal, valor_Asmepriv, valor_Asmepriv1,valor_Luispasteur, valor_Bayresplan, valor_Hominis,valor_Medife, valor_Saludcentral } from './index';

export function valor_prepagas(prices,grupo,arrayDeducciones){

	let	num_adultos = grupo[0];
	let numhijo1 = grupo[1];
	let numhijo = grupo[3];
	let gen = grupo[4];
	let arrayEdades = grupo[6];
	let numhijo2 = grupo[2];
	let numHijos = grupo[3];
	let grupoFam = grupo[5];
	let edad_1 = grupo[7];
	let edad_2 = grupo[8];



	console.log(' GENERAL  1 : ',edad_1);
	console.log(' GENERAL  1 : ',edad_2);
	console.log(' GENERAL  1 : ',numhijo2);
	console.log(' GENERAL  1 : ',numHijos);
	console.log(' GENERAL  1 : ',grupoFam);



	console.log('arrayDeducciones   :',arrayDeducciones)
	console.log(prices)
	
	let omint = [];
	omint = valor_Omint(prices,grupo,arrayDeducciones);
	console.log(' valor_OMINT ' ,omint);

	let Premedic = [];
	Premedic = valor_Premedic(prices,grupo,arrayDeducciones);
	console.log(' valor_Premedic ' , Premedic)

	let SanCor = [];
	SanCor = valor_SanCor(prices,grupo,arrayDeducciones);
	console.log(' valor_SanCor ' , SanCor);

	let Galeno = [];
	Galeno = valor_Galeno(prices,arrayDeducciones);    
	console.log(' valor_Galeno ' , Galeno)

	let Swiss = [];
	Swiss = valor_Swiss(prices,grupo,arrayDeducciones)
	console.log(' valor_Swiss ' , Swiss);

	let Doctored = [];
	Doctored = valor_Doctored(prices,grupo,arrayDeducciones)
	console.log(' valor_Doctored ' , Doctored);

	let Prevencion = []
	Prevencion = valor_Prevencion(prices,arrayDeducciones)
	console.log(' valor_Prevencion ' , Prevencion);

	let Avalian = [];

	Avalian = valor_Avalian(prices,grupo,arrayDeducciones);
	console.log(' valor_Avalian ' , Avalian);

	let Ras = [];
	Ras = valor_Ras(prices,grupo,arrayDeducciones);
	console.log(' valor_Ras ' , Ras);

    let Cristal = [];
	Cristal = valor_Cristal( prices,grupo,arrayDeducciones);
	console.log(' valor_Cristal ' , Cristal);

	let Luispasteur = [];
	Luispasteur = valor_Luispasteur(prices,grupo,arrayDeducciones);
	console.log(' valor_Luispasteur ' , Luispasteur);

	let Bayresplan = [];
	Bayresplan = valor_Bayresplan( prices,grupo, arrayDeducciones);
	console.log(' valor_Bayresplan ' , Bayresplan);

	let Hominis = [];
	Hominis = valor_Hominis( prices ,grupo,arrayDeducciones);
	console.log(' valor_Hominis ' , Hominis);

	let Asmepriv = [];
	Asmepriv = valor_Asmepriv(prices,grupo,arrayDeducciones);
	console.log(' valor_Asmepriv ' , Asmepriv);

	let Medife = [];
	Medife = valor_Medife(prices,grupo,arrayDeducciones);
	console.log(' valor_Medife ' ,Medife )

	let Saludcentral = [];
	Saludcentral = valor_Saludcentral( prices,grupo,arrayDeducciones);
	console.log(' valor_Saludcentral ' , Saludcentral);

    let concat = [];
	concat = omint.concat(Premedic,SanCor,Galeno,Swiss,Doctored,Prevencion,Avalian,Ras,Cristal,Asmepriv, Luispasteur, Bayresplan,Hominis, Medife,Saludcentral);
	console.log(' concat  : ' , concat)

	return concat
 };

import { productIDSancor, productIdOmint, productIdGaleno, productIdSwiss, productIdMedife, productIdPrevencion, productIdDoctored, productIdAvalian, productIdRasCristal, productIdLuisPasteur,productIdAsmepriv, productIBayres,productIdHominis,productIdSaludcentral, productIdPremedic } from './index';
export function ids_prepagas(grupo,arrayDeducciones){
    // <! ----------SANCOR---------------------------------------------------->
	let idSancor  = productIDSancor(grupo,arrayDeducciones);  console.log(idSancor);
	// <! -----------------------------OMINT---------------------------------------------------->
	let idOmint  = productIdOmint(grupo,arrayDeducciones);  console.log(idOmint);
	// <! -----------------------------GALENO--------------------------------------------------->
	let idGaleno  = productIdGaleno(grupo,arrayDeducciones); console.log(idGaleno);
	// <! ----------SWISS----------------------------------------------------------------------->
	let idSwiss  = productIdSwiss(grupo,arrayDeducciones);  console.log(idSwiss);
	// <! ----------MEDIFE---------------------------------------------------->
	let idsMedife  = productIdMedife(grupo,arrayDeducciones);  console.log(idsMedife);
	// <! ----------PREVENCION---------------------------------------------------->
	let idPrevencion  = productIdPrevencion(grupo,arrayDeducciones);  console.log(idPrevencion);
	// <! ----------DOCTORED---------------------------------------------------->
	let IdDoctored  = productIdDoctored(grupo,arrayDeducciones);  console.log(IdDoctored);
	// <! ----------AVALIAN---------------------------------------------------->
	let IdsAvalian  = productIdAvalian(grupo,arrayDeducciones);  console.log(IdsAvalian);
	// <! ----------CRISTAL y RAS---------------------------------------------------->
	let idsCristalyRas  = productIdRasCristal(grupo,arrayDeducciones);  console.log(idsCristalyRas);
	// <! ----------LUIS PASTEUR---------------------------------------------------->
	let idsLuisPasteur  = productIdLuisPasteur(grupo,arrayDeducciones);  console.log(idsLuisPasteur);
	// <! ----------ASMEPRIV---------------------------------------------------->
	let idsAsmepriv  = productIdAsmepriv(grupo,arrayDeducciones);  console.log(idsAsmepriv);
	// <! ----------BAYRES PLAN---------------------------------------------------->
	let idsBayresPlan  = productIBayres(grupo);  console.log(idsBayresPlan);
	// <! ----------HOMINIS---------------------------------------------------->
	let idsHominis  = productIdHominis(grupo,arrayDeducciones);  console.log(idsHominis);
	// <! ----------SALUD CENTRAL---------------------------------------------------->
	let idsSaludcentral  = productIdSaludcentral(grupo);  console.log(idsSaludcentral);
	// <! ----------PREMEDIC---------------------------------------------------->
	let idsPremedic  = productIdPremedic(grupo,arrayDeducciones);  console.log(' idsPremedic : ',idsPremedic);
	let ids = [];
	// console.log('ids :',ids)

ids.push(idSancor,idOmint, idGaleno,idSwiss, idsMedife, idPrevencion, IdDoctored, IdsAvalian, idsCristalyRas, idsLuisPasteur, idsAsmepriv, idsBayresPlan, idsHominis,idsSaludcentral,idsPremedic);
// console.log('ids :',ids)
return ids

}

export function buscarPorLetra(letra, valores) {
	// Iteramos sobre el arreglo de objetos
	for (let i = 0; i < valores.length; i++) {
	  // Cada valor es un objeto con una sola clave-valor
	  const objeto = valores[i];
	  // Si la clave del objeto coincide con la letra, devolvemos el valor
	  if (objeto[letra] !== undefined) {
		return objeto[letra];
	  }
	}
	// Si no encontramos la letra, retornamos undefined
	return undefined;
  }
  