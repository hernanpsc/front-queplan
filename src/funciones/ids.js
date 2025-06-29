export function grupoFamiliar(age0, age1, kids,group) {
    let edad0 = age0;
    let edad1 = age1;
    let num_adultos = 1;
    let numhijo1 = 0;
    let numhijo2 = 0;
    let gen = '';
    let grupoFam = 0;
    let numhijos = kids + 1;
    let numhijo = 0;
	if( group === 1){
		edad1 = 0;
		numhijos = 0;
	} else if( group === 2){
		edad1 = 0;
	}else if (group === 3  ){
		numhijos = 0;

	}else{}


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
    return [num_adultos, numhijo1, numhijo2, numhijo, gen, grupoFam];
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
export function productID(_edad, tipoAsoc, gen, miembro, numHijos,group) { 
	let edadId = '';
	let grupoSigla = '';
	let tipo = tipoAsoc;
	let edadID1 = '';
	let edadID2 = '';
	let hijoId = '';
	let hijo2Id = '';
	let edad = _edad;
	
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
export function productIdGaleno(anios_1, anios_2, tipoAsoc, num_Hijos, group) {
    let numHijos = num_Hijos ?? 0;  // Default to 0 if num_Hijos is null or undefined
    let tipoGaleno = tipoAsoc + 'S';
    let grupoSiglaGaleno = 'IND';  // Default group to 'IND'
    let edadIdGaleno = '';
    let anios2 = anios_2 ?? 0;  // Default to 0 if anios_2 is null or undefined
    let anios = anios_1 ?? 0;    // Default to 0 if anios_1 is null or undefined

    // Reset values based on the group type
    if (group === 1) {
        anios2 = 0;
        numHijos = 0;
    } else if (group === 2) {
        anios2 = 0;
    } else if (group === 3) {
        numHijos = 0;
    }

    // Set 'MAT' if age2 is 18 or older
    if (anios2 >= 18) {
        grupoSiglaGaleno = 'MAT';
    }

    // Determine the age range and create the corresponding ID
    if (anios <= 25) {
        edadIdGaleno = `${tipoGaleno}${grupoSiglaGaleno}25+${numHijos}h`;
    } else if (anios <= 36) {
        edadIdGaleno = `${tipoGaleno}${grupoSiglaGaleno}36+${numHijos}h`;
    } else if (anios <= 64) {
        edadIdGaleno = `${tipoGaleno}${grupoSiglaGaleno}64+${numHijos}h`;
    } else if (anios <= 65) {
        edadIdGaleno = `${tipoGaleno}${grupoSiglaGaleno}65+${numHijos}h`;
    }

    return 'galeno' + edadIdGaleno;
}

// // <!----------------------Funcion PRODUCT ID GALENO end---------------------------->
// // <!----------------------Funcion PRODUCT ID PREMEDIC start----------------------------> 
export function productIdPremedic(edad_1, edad_2, tipoAsoc, num_Hijos, group) {
    let edadIdPremedic = '';
    let age2 = edad_2 ?? 0;  // Default to 0 if edad_2 is null or undefined
    let age = edad_1 ?? 0;    // Default to 0 if edad_1 is null or undefined
    let numHijos = num_Hijos ?? 0; // Default to 0 if num_Hijos is null or undefined

    // Handle group-specific logic
    if (group === 1) {
        age2 = 0;
        numHijos = 0;
    } else if (group === 2) {
        age2 = 0;
    } else if (group === 3) {
        numHijos = 0;
    }

    // Ensure age2 is not greater than age
    if (age2 > age) {
        [age, age2] = [age2, age];  // Swap values if age2 is greater than age
    }

    // Define the family group and ID generation based on age
    if (age2 >= 18) {
        // Matched age group ranges for parents (MAT)
        if (age <= 29) {
            edadIdPremedic = `${tipoAsoc}MAT29+${numHijos}h`;
        } else if (age <= 39) {
            edadIdPremedic = `${tipoAsoc}MAT39+${numHijos}h`;
        } else if (age <= 49) {
            edadIdPremedic = `${tipoAsoc}MAT49+${numHijos}h`;
        } else if (age <= 59) {S
            edadIdPremedic = `${tipoAsoc}MAT59+${numHijos}h`;
        }
    } else if (age2 === 0) {
        // Matched age group ranges for individual (IND)
        if (age <= 29) {
            edadIdPremedic = `${tipoAsoc}IND29+0h`;
        } else if (age <= 39) {
            edadIdPremedic = `${tipoAsoc}IND39+0h`;
        } else if (age <= 49) {
            edadIdPremedic = `${tipoAsoc}IND49+0h`;
        } else if (age <= 59) {
            edadIdPremedic = `${tipoAsoc}IND59+0h`;
        } else {
            edadIdPremedic = '';  // Return an empty string for out-of-range ages
        }
    }

    return edadIdPremedic;
}

// <!----------------------Funcion PRODUCT ID PREMEDIC END---------------------------->    
// <!----------------------Funcion PRODUCT ID OMINT start---------------------------->        
export function productIdOmint(anios, tipoAsoc, miembro,group) {
	// console.log("variable anios : " + anios + "- variable tipoAsoc : " + tipoAsoc + " - variable miembro : " + miembro) 
	let edadID = '';
	let tipo = tipoAsoc;
	let edad = anios;
	let edadID1OMINT = '';
	let edadID2OMINT = '';
	let hijoIdOMINT = 'omint' + tipo + 'H1';
	let hijo2IdOMINT =  'omint' + tipo + 'H2';
	if(group === 1 && miembro !== 'titular')
{
	edad=0;
}else if(group === 2)
{
	edad=0;
}else{}

	
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
export function productIdSwiss(edad_1, edad_2, tipoAsoc, group) {
    // Reset age for specific groups (reset edad_1 or edad_2, not a non-existent 'edad')
    let rangoEtario_2 = "";
    let rangoEtario_1 = "";
    console.log('edad_1   Swiss :', edad_1);
    console.log('edad_2   Swiss :', edad_2);

    // Age range definitions
    const ageRanges = [
        { min: 18, max: 25, label: '25' },
        { min: 26, max: 35, label: '35' },
        { min: 36, max: 40, label: '40' },
        { min: 41, max: 45, label: '45' },
        { min: 46, max: 50, label: '50' },
        { min: 51, max: 55, label: '55' },
        { min: 56, max: 60, label: '60' },
        { min: 61, max: 63, label: '63' },
        { min: 64, max: Infinity, label: '' }
    ];

    // Function to map age to range
    function getAgeRange(age) {
        if (isNaN(age) || age < 0) {
            return '';  // Return empty string for invalid age values
        }
        for (const range of ageRanges) {
            console.log('idswiss age :'+age);
            console.log('idswiss range :');console.log(range)

            if (age >= range.min && age <= range.max) {
                return range.label;
            }
        }
        return ''; // If no range matches
    }
    if (group === 1 || group === 2) {
        edad_2 = 0;
        rangoEtario_1 = getAgeRange(edad_1);

    } else {
        rangoEtario_2 = getAgeRange(edad_2);
         rangoEtario_1 = getAgeRange(edad_1);
    }

    // Determine the age ranges for both ages




    // Generate IDs based on the age range and association type
    let idTitular = 'swiss' + tipoAsoc + rangoEtario_1;
    let idConyuge = 'swiss' + tipoAsoc + rangoEtario_2;
    let idHijo1 = 'swiss' + tipoAsoc + '1h';
    let idHijo2 = 'swiss' + tipoAsoc + '2h';
    console.log('Ids Swiss  :');

console.log(idTitular, idConyuge, idHijo1, idHijo2);
    // Return the generated product IDs
    return [idTitular, idConyuge, idHijo1, idHijo2];
}


// <!----------------------Funcion PRODUCT ID END start----------------------------> 

// <!----------------------Funcion PRODUCT ID MEDIFE start----------------------------> 


export function productIdMedife(edad_1, edad_2, tipoAsoc, group) {
    let idMedife = '';
    let age1 = edad_1;
    let age2 = edad_2 ?? 0; // If edad_2 is null, set age2 to 0 by default
    let grupoFam = '';

    // Handle the group types (1 and 2 set age2 to 0)
    if (group === 1 || group === 2) {
        age2 = 0;
    }

    // Ensure age2 is not greater than age1
    if (age2 > age1) {
        [age1, age2] = [age2, age1];  // Swap if age2 is greater than age1
    }

    // Assign family group type based on age2
    if (age2 >= 18) {
        grupoFam = 'MAT';
    } else if (age2 === 0) {
        grupoFam = 'IND';
    }

    // Generate ID based on age ranges
    if (age1 >= 18 && age1 <= 25) {
        idMedife = `medife${tipoAsoc}${grupoFam}0-25`;
    } else if (age1 >= 26 && age1 <= 35) {
        idMedife = `medife${tipoAsoc}${grupoFam}26-35`;
    } else if (age1 >= 36 && age1 <= 40) {
        idMedife = `medife${tipoAsoc}${grupoFam}36-40`;
    } else if (age1 >= 41 && age1 <= 50) {
        idMedife = `medife${tipoAsoc}${grupoFam}41-50`;
    } else if (age1 >= 51 && age1 <= 60) {
        idMedife = `medife${tipoAsoc}${grupoFam}51-60`;
    } else if (age1 >= 61 && age1 <= 65) {
        idMedife = `medife${tipoAsoc}${grupoFam}61-65`;
    } else {
        idMedife = ''; // No valid age range
    }

    // IDs for specific family roles
    const Hijo0a1 = `medife${tipoAsoc}HIJO0a1`;
    const Hijo0a20 = `medife${tipoAsoc}HIJO2a20`;
    const HIJO21a29 = `medife${tipoAsoc}HIJO21a29`;

    // Return all IDs in an array
    return [idMedife, Hijo0a1, Hijo0a20, HIJO21a29];
}







// <!----------------------Funcion PRODUCT ID MEDIFE end----------------------------> 
// <!----------------------Funcion PRODUCT ID PREVENCION SALUD start----------------------------> 

export function productIdPrevencion(edad_1, edad_2,hijos, tipoAsoc){
	let edadIdPrevencion = '';
	let age2 = edad_2;
	let age = edad_1;
	let kids = '+'+ hijos +'H';
	let tipo = tipoAsoc;
    let grupoSiglaPrevencion = '';
    let zona = 'Z4';



	if (edad_2 === null) {
        age2 = 0;
    }
	if (hijos === null || hijos === 0 ) {
        kids = '';
    }
	if (age2 > age) {
		age2 = age;
		age = edad_2;
	};
	
	if (age2 >= 18) {
		grupoSiglaPrevencion = 'MAT';
	} else {
		grupoSiglaPrevencion = 'IND';
	}
		if (age <= 25) {
			edadIdPrevencion = tipo + zona + grupoSiglaPrevencion + kids + '0-25';
		} else if (age <= 30 && age >= 26) {
			edadIdPrevencion = tipo + zona + grupoSiglaPrevencion + kids + '26-30';
		} else if (age <= 35 && age >= 31) {
			edadIdPrevencion = tipo + zona + grupoSiglaPrevencion + kids + '31-35';
		} else if (age <= 40 && age >= 36) {
			edadIdPrevencion = tipo + zona + grupoSiglaPrevencion + kids + '36-40';
		} else if (age <= 45 && age >= 41) {
			edadIdPrevencion = tipo + zona + grupoSiglaPrevencion + kids + '41-45';
		} else if (age <= 50 && age >= 46) {
			edadIdPrevencion = tipo + zona + grupoSiglaPrevencion + kids + '46-50';
		} else if (age <= 55 && age >= 51) {
			edadIdPrevencion = tipo + zona + grupoSiglaPrevencion + kids + '51-55';
		} else if (age <= 60 && age >= 56) {
			edadIdPrevencion = tipo + zona + grupoSiglaPrevencion + kids + '56-60';
		}
        console.log('prevencion',edadIdPrevencion)

		return 'prevencion' + edadIdPrevencion
	} 
	
// <!----------------------Funcion PRODUCT ID PREVENCION SALUD end----------------------------> 
// // <!----------------------Funcion PRODUCT ID DOCTORED start----------------------------> 
export function productIdDoctored(edad_1, edad_2, tipoAsoc, num_Hijos,group) {
	
	let age2 = edad_2;
	let age = edad_1;
	let hijos1y2 =num_Hijos;
	let indOMat = "IND";
    let rangoEtario = '18-25';
    let tipo = tipoAsoc;
	let idDoctored = 'doctored' + indOMat + tipoAsoc + rangoEtario + '+' + hijos1y2 + 'h';
	let idDoctoredHijo3 = 'doctored' + tipo + 'HIJO';
	let idDoctoredAd = 'doctoredAD' + tipo + rangoEtario;

if (hijos1y2 > 2){
    hijos1y2 = 2;
} else {}
if (tipo == 'I'){
    tipo = 'P';
} else if ( tipo == 'M'){
	tipo = 'D'
} else {}
	if(group === 1)
{
	age2=0;
	hijos1y2=0;
} else if(group === 2)
{
	age2=0;
}else if(group === 3)
{
	hijos1y2=0;
}else {}

	if (edad_2 === null) {
        age2 = 0;
    }

	if (age2 > age) {
		age2 = age;
		age = edad_2;
		indOMat = 'MAT';
	};

		if (age <= 25) {
			rangoEtario =  '18-25+';
		} else if (age <= 35 && age >= 26) {
			rangoEtario =  '25-35+';
		} else if (age <= 45 && age >= 36) {
			rangoEtario =  '35-45+';
		} else if (age <= 55 && age >= 46) {
			rangoEtario =  '46-55+';
		} else if (age <= 60 && age >= 56) {
			rangoEtario =  '56-60+';
		} else if (age <= 69 && age >= 61) {
		    rangoEtario =  '61-69+';
		} else if (age <= 79 && age >= 70) {
		    rangoEtario =  '70-79+';	
	}

	return [idDoctored, idDoctoredHijo3, idDoctoredAd]
}
// <!----------------------Funcion PRODUCT ID DOCTORED END----------------------------> 
 
// <!----------------------Funcion PRODUCT ID RAS y CRISTAL start---------------------------->        
export function productIdRasCristal(edad_1, edad_2, tipoAsoc, group) {
	let ids = [];
    let rangoEtario_1 = '';
    let rangoEtario_2 = '';
    const ageRanges = [
        { min: 8, max: 17, label: '08-17' },
        { min: 18, max: 25, label: '18-25' },
        { min: 26, max: 35, label: '26-35' },
        { min: 36, max: 45, label: '36-45' },
        { min: 46, max: 55, label: '46-55' },
        { min: 56, max: 60, label: '56-60' },
        { min: 61, max: 65, label: '61-65' },
        { min: 66, max: 70, label: '66-70' },
        { min: 71, max: 75, label: '71-75' },
        { min: 76, max: 80, label: '76-80' },
        { min: 81, max: 85, label: '81-85' },
        { min: 86, max: Infinity, label: '+85' }
    ];

    // Function to map age to range
    function getAgeRange(age) {
        for (const range of ageRanges) {
            if (age >= range.min && age <= range.max) {
                console.log('edad : '+age)
                console.log('range : ');console.log(range)


                return range.label;
            }
        }
        return ''; // If no range matches
    }
  

    // Adjust the 'tipo' (type) based on the input
    let tipo = tipoAsoc;
    if (tipo === "M") tipo = "D";
    else if (tipo === "I") tipo = "P";
console.log('group  rasid:'+group)
    // Determine the age ranges
    if (group === 1 || group === 2) {
        edad_2 = 0;
        rangoEtario_1 = getAgeRange(edad_1);

    } else {
        console.log('edad_1 ',edad_1)
        console.log('edad_2 ',edad_2)

        rangoEtario_2 = getAgeRange(edad_2);
        rangoEtario_1 = getAgeRange(edad_1);
    }
    console.log('rangoEtario_1 : '+rangoEtario_1)

    console.log('rangoEtario_2 : '+rangoEtario_2)

    // Create IDs for titular, conyuge, and hijos
    let idTitularRas  = "ras" + tipo + rangoEtario_1;
    console.log('id 1 ras y cristal : ' ,idTitularRas );

    let idConyugeRas  = "ras" +  tipo + rangoEtario_2;
    console.log('id 1 ras y cristal : ' ,idConyugeRas  );

    let idHijo1Ras  = "ras" +  tipo + "1H";
    console.log('id 1 ras y cristal : ' ,idHijo1Ras   );

    let idHijo2Ras  = "ras" +  tipo + "2H";
    console.log('id 1 ras y cristal : ' ,idHijo2Ras  );

    let idHijo3Ras  = "ras" +  tipo + "3H";
    console.log('id 1 ras y cristal : ' ,idHijo3Ras  );

	let idTitularCristal = "cristal" +  tipo + rangoEtario_1;
    let idConyugeCristal = "cristal" +  tipo + rangoEtario_2;
    let idHijo1Cristal = "cristal" +  tipo + "1H";
    let idHijo2Cristal = "cristal" +  tipo + "2H";
    let idHijo3Cristal = "cristal" +  tipo + "3H";
	    // Store the IDs in an array
  // Create IDs for titular, conyuge, and hijos

  console.log('id 1 ras y cristal : ' ,idTitularCristal );
  console.log('id 1 ras y cristal : ' ,idConyugeCristal  );
  console.log('id 1 ras y cristal : ' ,idHijo1Cristal  );
  console.log('id 1 ras y cristal : ' ,idHijo2Cristal );
  console.log('id 1 ras y cristal : ' ,idHijo3Cristal );
	ids.push(idTitularRas, idConyugeRas, idHijo3Ras, idHijo2Ras, idHijo1Ras,idTitularCristal, idConyugeCristal, idHijo3Cristal, idHijo2Cristal, idHijo1Cristal)
console.log('ids ',ids)
    return ids;
}

// <!----------------------Funcion PRODUCT ID RAS y CRISTAL end---------------------------->    

// <!----------------------Funcion PRODUCT ID BAYRES PLAN start---------------------------->        
export function productIBayres(edad_1, edad_2, group) {
	let age_1 = edad_1;
	let age_2 = edad_2;
	let kids = ""; 
	let grupo = group;
	let rangoEtario = "";
	let ids = [];
	let idAdultos = "";

	if (grupo === 1 || grupo === 2  ) {
		age_2 = 0;
		
		   if(grupo === 1){
			kids = "";
		   } else if(grupo === 2){
			kids = "+1Hhasta25";
		   }	  
		   grupo = 'IND'; 
	} else if (grupo === 3 || grupo === 4) {
		
		if (age_2 > age_1) {
			age_1 = age_2;
			age_2 = edad_1;
		} else if  (grupo === 3){
			kids = "";
		} else if  (grupo === 4){
			kids = "+1H";
		}	
		grupo = 'MAT';
	}

	const getAgeRange = (age) =>  {
		if (age <= 49) return '0-49';
		if (age <= 59) return '50-59';
		if (age <= 64) return '60-64';
		if (age <= 69) return '65-69';
		if (age <= 74) return '70-74';
		if (age <= 79) return '75-79';
		if (age <= 89) return '80-89';
			return "+90";
	};

	    // Determine ranges for both individuals
	rangoEtario = getAgeRange(age_1);

	
	if( rangoEtario === 0-49 || rangoEtario === 50-59 ){
		idAdultos =	"bayres" + grupo + kids + rangoEtario
	}else {
		idAdultos =	"bayres" + grupo + "-" + rangoEtario
	}



	let idHijohasta25 = "bayres" + "ADHhasta25-" + rangoEtario 
	let idAdicional18a49 = "bayres" + "AD18A49-" + rangoEtario;
	let idSinMaternidad = "bayresIND-JOV-hastas25-SMAT-0-49"
	let idIND18a29 = "bayresIND-18-29"


	ids.push(idAdultos, idHijohasta25, idAdicional18a49,idSinMaternidad,idIND18a29)

return ids	
}
// <!----------------------Funcion PRODUCT ID BAYRES PLAN end----------------------------> 
// <!----------------------Funcion PRODUCT ID ASMEPRIV start---------------------------->        
export function productIdAsmepriv(
    edad_1,
    edad_2,
    hijos,
    tipoAsoc,
    group
     ){


console.log('Asmepriv llgan : ',edad_1);
console.log('Asmepriv llgan : ',edad_2);
console.log('Asmepriv llgan : ',hijos);
console.log('Asmepriv llgan : ',tipoAsoc);
console.log('Asmepriv llgan : ',group);

let age_1 = edad_1;
let age_2 = edad_2;
let tipo = tipoAsoc
let kids = "+" + hijos + "H"; 
let grupo = group;
let rangoEtario = "";
let ids = [];

if (edad_2 === null) {
	age_2 = 0;
}

if (grupo === 1 || grupo === 2  ) {
	age_2 = 0;
	   if(grupo === 1){
		kids = "+0H";
	   }	
	   
	grupo = 'IND';	   
} else if (grupo === 3 || grupo === 4) {
	
	if (age_2 > age_1) {
		age_1 = age_2;
		age_2 = edad_1;
	} else if   (grupo === 3){
		kids = "+0H";
	   }	
	   grupo = 'MAT';
	}

const getAgeRange = (age) =>  {
	if (age < 18) return;
	if (age <= 29) return '-SMAT18-29';
	if (age <= 39) return '30-39';
	if (age <= 49) return '40-49';
	if (age <= 59) return '50-59';
	if (age <= 64) return '60-64';
	if (age <= 64) return '65-69';
	if (age <= 54) return '70-71';
		return;
};


rangoEtario = getAgeRange(age_1);

if ( tipo != "P" && rangoEtario === '60-64' || tipo != "P" && rangoEtario === '65-69' ||  tipo != "P" && rangoEtario === '70-71'  ){
	rangoEtario = ""
} else if ( rangoEtario === '60-64' || rangoEtario === '65-69' ||  rangoEtario === '70-71'  ){
	kids = "";
}


let idAsmepriv = "asmepriv" + tipo + grupo + kids + rangoEtario;

let idAdmenorUno = "asmepriv" + tipo +"ADH-1"; // adicional menor d eun año
let idHijoHasta21 = "asmepriv" + tipo + "H-21"; // hijo hasta 21 años
let idRecargoHijo21a29 = "asmepriv" + tipo + "RECH21A29";  // recargo hijo de 21 a 29 años
let idModuloMat = "asmepriv" + tipo + "MODMAT"; // modulo maternidad

ids.push(idAsmepriv, idAdmenorUno, idHijoHasta21, idRecargoHijo21a29, idModuloMat)
console.log("idAsmepriv :" + idAsmepriv);
console.log("idAdmenorUno :" + idAdmenorUno);
console.log("idHijoHasta21 :" + idHijoHasta21);
console.log("idRecargoHijo21a29 :" + idRecargoHijo21a29);
console.log("idModuloMat :" + idModuloMat);


return ids;

}
// <!----------------------Funcion PRODUCT ID ASMEPRIV end---------------------------->
// <!----------------------Funcion PRODUCT ID LUIS PASTEUR start---------------------------->

export function productIdLuisPasteur(edad_1, edad_2,hijos, tipoAsoc, group) {


	let grupo = group;
	let age2 = edad_2;
	let age = edad_1;
	let kids = 'y'+ hijos;
	let tipo = tipoAsoc;
	let ids = [];


	if (grupo === 1 || grupo === 2  ) {
        age2 = 0;
	
           if(grupo === 1){
			kids = "";
		   }
		   grupo = 'IND';		   
    } else if (grupo === 3 || grupo === 4) {
		
		if ( age2 > age ) {
			 age = age2;
			age2 = edad_1;
		} else if   (grupo ===3){
			kids = "";
		   }	
		   grupo = 'MAT';
		}

	if (hijos === null || hijos === 0 ) {
        kids = '';
    }


	// console.log('grupo : ' + grupo);

	const getAgeRange = (age) =>  {
		if (age < 18) return;
		if (age <= 25) return '18-25';
        if (age <= 30) return '26-30';
		if (age <= 35) return '31-35';
		if (age <= 45) return '36-45';
		if (age <= 49) return '46-49';
		if (age <= 54) return '50-54';
		if (age <= 59) return '55-59';
			return '60';
	};
	

    let rangoEtario = getAgeRange(age);
	// console.log('grupo : ' + grupo);
	// console.log('tipo : ' + tipo);
	// console.log('rangoEtario : ' + rangoEtario);
	// console.log('hijos : ' + kids);

	let idLuispasteur =	"luispasteur"  + grupo + tipo + rangoEtario + kids;
	// console.log('idLuispasteur : ' + idLuispasteur);

	let idNieto = "luispasteur" + "NIETO" + tipo 
	let idAd =	"luispasteur" + "AD" + tipo
	let idHijo = "luispasteur" + "HIJO" + tipo
	// console.log('idNieto : ' + idNieto);
	// console.log('idAd : ' + idAd);
	// console.log('idHijo : ' + idHijo);


	ids.push(idLuispasteur, idNieto, idAd, idHijo)

    return ids;

}
// <!----------------------Funcion PRODUCT ID LUIS PASTEUR end----------------------------> 


// <!----------------------Funcion PRODUCT ID AVALIAN  start----------------------------> 
export function productIdAvalian(anios1, anios2, tipoAsoc, group) {

    let age_1 = anios1;
    let age_2 = anios2;
    let grupo = group;
    let rangoEtario_1 = "";
    let rangoEtario_2 = "";
    let zonaComercial = ["BA", "E", "P"];
    let tipo = tipoAsoc;
    let idTitular = "";
    let idConyuge = "";
    let idHijo1 = "";
    let idHijo2 = "";
    let idHijo3 = "";
    let idHijo25 = "";
    let ids = [];

    // Correct comparison operators (== or ===) instead of assignment (=)
    if (tipo === "M") {
        tipo = "D";
    } else if (tipo === "I") {
        tipo = "P";
    }

    // console.log("ID AVALIAN EN CURSO - tipo: " + tipo);

    // Function to determine age range
    const getAgeRange = (age) => {
        if (age <= 25) return '25';
        if (age <= 30) return '26-30';
        if (age <= 35) return '31-35';
        if (age <= 40) return '36-40';
        if (age <= 45) return '41-45';
        if (age <= 49) return '46-49';
        if (age <= 55) return '50-55';
        if (age <= 60) return '56-60';
        if (age <= 64) return '61-64';
        return '+65';
    };

    // Determine ranges for both individuals
    rangoEtario_1 = getAgeRange(age_1);

    // For the group 3 or 4, we calculate age for both people
    if (grupo === 3 || grupo === 4) {
        rangoEtario_2 = getAgeRange(age_2);
    } else {
        rangoEtario_2 = rangoEtario_1; // Same range as the first person
    }

    // console.log("rangoEtario_1: " + rangoEtario_1);
    // console.log("rangoEtario_2: " + rangoEtario_2);

    // Generate IDs for each role
    idTitular = "avalian" +  "Z" + zonaComercial[0] + tipo + rangoEtario_1;
    idConyuge = "avalian" +  "Z" + zonaComercial[0] + tipo + rangoEtario_2;
    idHijo3 = "avalian" +  "Z" + zonaComercial[0] + tipo + "3H";
    idHijo2 = "avalian" +  "Z" + zonaComercial[0] + tipo + "2H";
    idHijo1 = "avalian" +  "Z" + zonaComercial[0] + tipo + "1H";
    idHijo25 = "avalian" +  "Z" + zonaComercial[0] + tipo + "25";

	ids.push(idTitular, idConyuge, idHijo3, idHijo2, idHijo1, idHijo25);

    // Return array of ids
    return ids;
}

// <!----------------------Funcion PRODUCT ID AVALIAN end----------------------------> 


// <!----------------------Funcion PRODUCT ID HOMINIS  start----------------------------> 
export function productIdHominis(edad_1, edad_2, tipoAsoc, numHijos, group) {

    let age_1 = edad_1;
    let age_2 = edad_2;
    let grupo = group;
	let kids = "+" + numHijos + "H";
    let rangoEtario = "";
    let tipo = tipoAsoc;
    // Correct comparison operators (== or ===) instead of assignment (=)
    if (tipo === "M") {
        tipo = "D";
    } else if (tipo === "I") {
        tipo = "P";
    }

// console.log("hominis Grupo   :" + grupo)
    // Function to determine age range
    const getAgeRange = (age) => {
        if (age <= 39) return '18-39';
        if (age <= 49) return '40-49';
        if (age <= 64) return '50-64';
        return '65';
    };

	rangoEtario = getAgeRange(age_1)
	if (grupo === 1 || grupo === 2  ) {
        age_2 = 0;
	
           if(grupo === 1	){
			kids = "+0H";
		   } else if (grupo === 1 && age_1 <= 25 ){
			rangoEtario = "18-25";

		   } else {rangoEtario = getAgeRange(age_1);
		   } 
		   grupo = 'IND';
    } else if (grupo === 3 || grupo === 4) {
		if ( age_2 > age_1 ) {
			 age_1 = age_2;
			age_2 = edad_1;
		} else if   (grupo === 3){
			kids = "+0H";
		   }else if (grupo === 3 && age_1 <= 25 ){
			rangoEtario = "18-25";
		   } else {rangoEtario = getAgeRange(age_1);
		   }  	
		   grupo = 'MAT';
		}
		let idHominis = "hominis" + grupo + kids + tipo + rangoEtario;

    return idHominis;
}

// <!----------------------Funcion PRODUCT ID HOMINIS end----------------------------> 


// <!----------------------Funcion PRODUCT ID SALUD CENTRAL  start----------------------------> 
export function productIdSaludcentral(edad_1, edad_2) {

    if (typeof edad_1 !== 'number' || typeof edad_2 !== 'number' || edad_1 < 0 || edad_2 < 0) {
        console.error('Invalid ages provided');
        return [];
    }

    // Helper function to determine the age range
    const getAgeRange = (age) => {
        const ranges = [
            { max: 29, range: '18-29' },
            { max: 35, range: '30-35' },
            { max: 40, range: '36-40' },
            { max: 50, range: '41-50' },
            { max: 60, range: '51-60' },
            { max: 65, range: '61-65' },
            { max: 70, range: '66-70' },
            { max: 75, range: '71-75' },
            { max: 79, range: '76-79' },
            { max: 85, range: '80-85' }
        ];

        return ranges.find(r => age <= r.max)?.range || 'Unknown';
    };

    let rangoEtario_1 = getAgeRange(edad_1);
    let rangoEtario_2 = getAgeRange(edad_2);

    let idSaludcentralTitular = `saludcentral${rangoEtario_1}`;
    let idSaludcentralConyuge = `saludcentral${rangoEtario_2}`;

    const idHijo1 = 'saludcentral1H';
    const idHijo2 = 'saludcentral2H';

    const ids = [idSaludcentralTitular, idSaludcentralConyuge, idHijo1, idHijo2];

    // console.log('ids salud central:', ids);
    return ids;
}

// <!----------------------Funcion PRODUCT ID SALUD CENTRAL end----------------------------> 



