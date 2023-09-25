export function grupoFamiliar(age0, age1, kids) {
    let edad0 = age0;
    let edad1 = age1;
    let num_adultos = 1;
    let numhijo1 = 0;
    let numhijo2 = 0;
    let gen = '';
    let grupoFam = 0;
    let numhijos = kids;
    let numhijo = 0;

    if (kids === null) {
        numhijos = 0;
    }
    if (age1 === null) {
        edad1 = 0;
    }

	if (edad1 == 0 && numhijos == 0) {
		num_adultos = 1;
		numhijo1 = 0;
		numhijo2 = 0;
		numhijos = 0;
	} else if (edad1 > 0 && numhijos == 0) {
		num_adultos = 2;
		numhijo1 = 0;
		numhijo2 = 0;
		numhijos = 0;
	} else if (edad1 == 0 && numhijos >= 1) {
		num_adultos = 1;
		numhijo1 = 1;
		numhijo2 = numhijos - 1;
		numhijos = numhijos;
	} else if (edad1 > 0 && numhijos >= 1) {
		num_adultos = 2;
		numhijo1 = 1;
		numhijo2 = numhijos - 1;
		numhijos = numhijos;
	}
	grupoFam = parseInt(num_adultos) + parseInt(numhijos);
    numhijo = parseInt(numhijos);
    if (edad0 <= 35 && edad1 <= 35) {
        gen = 'GEN';
    } else {
        gen = '';
    }
	// console.log(grupoFam)
    return [num_adultos, numhijo1, numhijo2, numhijos, gen, grupoFam];
}


export function tipoAsociado(_tipo) {
	let tipoAsoc = '';
	let tipo = _tipo;
	if (tipo === "M" || tipo === "D") {
		tipoAsoc = "D";
	} else if (tipo === "I" || tipo === "P") {
		tipoAsoc = "P"
	};
	return tipoAsoc
}


// <!----------------------Funcion PRODUCT ID SANCOR start---------------------------->     
export function productID(edad, tipoAsoc, gen, miembro, numHijos) { 
	let edadId = '';
	let grupoSigla = '';
	let tipo = tipoAsoc;
	let edadID1 = '';
	let edadID2 = '';
	let hijoId = '';
	let hijo2Id = '';
	// if (gen == 'GEN' && numHijos > 0) {
	// 	grupoSigla = 'GF'
	// };
	if (18 <= edad && edad <= 25) {
		edadId = 'sancor1' + tipo;
		hijoId = 'sancor1H' + tipo;
		hijo2Id = 'sancor2H' + tipo;
	} else if (26 <= edad && edad <= 29) {
		edadId = 'sancor2' + tipo;
		hijoId = 'sancor1H' + tipo;
		hijo2Id = 'sancor2H' + tipo;
	} else if (30 <= edad && edad <= 35) {
		edadId = 'sancor3' + tipo;
		hijoId = 'sancor1H' + tipo;
		hijo2Id = 'sancor2H' + tipo;
	} else if (36 <= edad && edad <= 39) {
		edadId = 'sancor4' + tipo;
		hijoId = 'sancor1HH' + tipo;
		hijo2Id = 'sancor2HH' + tipo;
	} else if (40 <= edad && edad <= 45) {
		edadId = 'sancor5' + tipo;
		hijoId = 'sancor1HH' + tipo;
		hijo2Id = 'sancor2HH' + tipo;
	} else if (46 <= edad && edad <= 49) {
		edadId = 'sancor6' + tipo;
		hijoId = 'sancor1HH' + tipo;
		hijo2Id = 'sancor2HH' + tipo;
	} else if (50 <= edad && edad <= 59) {
		edadId = 'sancor7' + tipo;
		hijoId = 'sancor1HH' + tipo;
		hijo2Id = 'sancor2HH' + tipo;
	} else if (60 <= edad && edad <= 69) {
		edadId = 'sancor8' + tipo;
		hijoId = 'sancor1HH' + tipo;
		hijo2Id = 'sancor2HH' + tipo;
	} else if (70 <= edad) {
		edadId = 'sancor9' + tipo;
		hijoId = 'sancor1HH' + tipo;
		hijo2Id = 'sancor2HH' + tipo;
	}
	if (miembro === 'titular') {
		edadID1 = edadId + grupoSigla
	} else {
		edadID2 = edadId + grupoSigla
	};
	return [edadID1, edadID2, hijoId, hijo2Id]
};
// <!----------------------Funcion PRODUCT ID SANCOR end---------------------------->   
// <!----------------------Funcion PRODUCT ID GALENO start---------------------------->        
export function productIdGaleno(anios_1, anios_2, tipoAsoc, numHijos) {
	let tipoGaleno = tipoAsoc + 'S';
	let grupoSiglaGaleno = 'IND';
	let edadIdGaleno = '';
	let anios2 = anios_2;
	let anios = anios_1;
	if (anios2 > anios) {
		anios2 = anios_1;
		anios = anios_2
	};
	if (anios2 >= 18) {
		grupoSiglaGaleno = 'MAT';
		anios2 = anios2;
		anios = anios;
	}
	if (anios <= 25) {
		edadIdGaleno = tipoGaleno + grupoSiglaGaleno + 25 + '+' + numHijos + 'h';
	} else if (anios <= 36) {
		edadIdGaleno = tipoGaleno + grupoSiglaGaleno + 36 + '+' + numHijos + 'h';
	} else if (anios <= 64) {
		edadIdGaleno = tipoGaleno + grupoSiglaGaleno + 64 + '+' + numHijos + 'h';
	} else if (anios <= 65) {
		edadIdGaleno = tipoGaleno + grupoSiglaGaleno + 65 + '+' + numHijos + 'h';
	};
	return edadIdGaleno;
};
// // <!----------------------Funcion PRODUCT ID GALENO end---------------------------->
// // <!----------------------Funcion PRODUCT ID PREMEDIC start----------------------------> 
export function productIdPremedic(edad_1, edad_2, tipoAsoc, numHijos) {

	let edadIdPremedic = '';
	let age2 = edad_2;
	let age = edad_1;
	if (edad_2 === null) {
        age2 = 0;
    }

	if (age2 > age) {
		age2 = age;
		age = edad_2;
	};
	if (age2 >= 18) {
		if (age <= 29) {
			edadIdPremedic = tipoAsoc + 'MAT' + 29 + '+' + numHijos + 'h';
		} else if (age <= 39 && age >= 30) {
			edadIdPremedic = tipoAsoc + 'MAT' + 39 + '+' + numHijos + 'h';
		} else if (age <= 49 && age >= 40) {
			edadIdPremedic = tipoAsoc + 'MAT' + 49 + '+' + numHijos + 'h';
		} else if (age <= 59 && age >= 50) {
			edadIdPremedic = tipoAsoc + 'MAT' + 59 + '+' + numHijos + 'h';
		}
	} else if (age2 == 0) {
		if (age <= 29) {
			edadIdPremedic = tipoAsoc + 'IND' + 29 + '+0h';
		} else if (age <= 39 && age >= 30) {
			edadIdPremedic = tipoAsoc + 'IND' + 39 + '+0h';
		} else if (age <= 49 && age >= 40) {
			edadIdPremedic = tipoAsoc + 'IND' + 49 + '+0h';
		} else if (age <= 59 && age >= 50) {
			edadIdPremedic = tipoAsoc + 'IND' + 59 + '+0h';
		} else {
			edadIdPremedic = '';
		}
	}
	return edadIdPremedic;
}
// <!----------------------Funcion PRODUCT ID PREMEDIC END---------------------------->    
// <!----------------------Funcion PRODUCT ID OMINT start---------------------------->        
export function productIdOmint(anios, tipoAsoc, miembro) {
	// console.log("variable anios : " + anios + "- variable tipoAsoc : " + tipoAsoc + " - variable miembro : " + miembro) 
	let edadID = '';
	let tipo = tipoAsoc;
	let edad = anios;
	let edadID1OMINT = '';
	let edadID2OMINT = '';
	let hijoIdOMINT = 'omint' + tipo + 'H1';
	let hijo2IdOMINT =  'omint' + tipo + 'H2';
	if (edad >= 18 && edad <= 25) {
		edadID = tipo + 25;
	} else if (edad >= 26 && edad <= 35) {
		edadID = tipo + 35;
	} else if (edad >= 36 && edad <= 54) {
		edadID = tipo + 54;
 
	} else if (edad >= 55 && edad <= 59) {
		edadID = tipo + 59;
 
	} else {
		edadID = tipo + 60;
 
	}
	if (miembro === 'titular') {
		edadID1OMINT =  'omint' + edadID
	} else {
		edadID2OMINT =  'omint' + edadID
	};
	// console.log("edadID1OMINT=" + edadID1OMINT + "; edadID2OMINT =" + edadID2OMINT + "; hijoIdOMINT ="+ hijoIdOMINT + "; hijo2IdOMINT =" + hijo2IdOMINT)
	return [edadID1OMINT, edadID2OMINT, hijoIdOMINT, hijo2IdOMINT]
};
// <!----------------------Funcion PRODUCT ID OMINT end---------------------------->


// <!----------------------Funcion PRODUCT ID SWISS start---------------------------->        
export function productIdSwiss(anios, tipoAsoc) {
	let edadID = '';
	let tipo = tipoAsoc;
	let edad = anios;


	if (edad >= 18 && edad <= 25) {
		edadID = tipo + 25;
	} else if (edad >= 26 && edad <= 35) {
		edadID = tipo + 35;
	} else if (edad >= 36 && edad <= 40) {
		edadID = tipo + 40;
	} else if (edad >= 41 && edad <= 45) {
		edadID = tipo + 45;
	} else if (edad >= 46 && edad <= 50) {
		edadID = tipo + 50;
	} else if (edad >= 51 && edad <= 55) {
		edadID = tipo + 55;
	} else if (edad >= 56 && edad <= 60) {
		edadID = tipo + 60;
	} else if (edad >= 61 && edad <= 63) {
		edadID = tipo + 63;
	} else {
		edadID = tipo + 60;
	}
return edadID
}
// <!----------------------Funcion PRODUCT ID END start---------------------------->        
