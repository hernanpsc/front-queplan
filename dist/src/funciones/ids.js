"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productIdSaludcentral = exports.productIdHominis = exports.productIdAvalian = exports.productIdLuisPasteur = exports.productIdAsmepriv = exports.productIBayres = exports.productIdRasCristal = exports.productIdDoctored = exports.productIdPrevencion = exports.productIdMedife = exports.productIdSwiss = exports.productIdOmint = exports.productIdPremedic = exports.productIdGaleno = exports.productIDSancor = void 0;
// <!----------------------Funcion PRODUCT ID SANCOR start---------------------------->     
function productIDSancor(grupo, tipo) {
    let tipoAsociado = tipo[1].tipo_Ingreso_Original_P_D;
    let edad_1 = grupo[7];
    let edad_2 = grupo[8];
    const ageRanges = [
        { min: 18, max: 25, label: '1', label_2: 'H' },
        { min: 26, max: 29, label: '2', label_2: 'H' },
        { min: 30, max: 35, label: '3', label_2: 'H' },
        { min: 36, max: 39, label: '4', label_2: 'HH' },
        { min: 40, max: 45, label: '5', label_2: 'HH' },
        { min: 46, max: 49, label: '6', label_2: 'HH' },
        { min: 50, max: 59, label: '7', label_2: 'HH' },
        { min: 60, max: 69, label: '8', label_2: 'HH' },
        { min: 70, max: Infinity, label: '9', label_2: 'HH' }
    ];
    // Function to map age to range
    function getAgeRange(age) {
        if (isNaN(age) || age < 0) {
            return ''; // Return empty string for invalid age values
        }
        for (const range of ageRanges) {
            // console.log('sancor age :'+age);
            // console.log('sancor range :');console.log(range)
            if (age >= range.min && age <= range.max) {
                return [range.label, range.label_2];
            }
        }
        return ''; // If no range matches
    }
    let rangoEtario_1 = getAgeRange(edad_1);
    let rangoEtario_2 = getAgeRange(edad_2);
    // Generate IDs based on the age range and association type
    let edadID1 = 'sancor' + rangoEtario_1[0] + tipoAsociado;
    let edadID2 = 'sancor' + rangoEtario_2[0] + tipoAsociado;
    let hijoId = 'sancor' + '1' + rangoEtario_1[1] + tipoAsociado;
    let hijo2Id = 'sancor' + '2' + rangoEtario_1[1] + tipoAsociado;
    return [edadID1, edadID2, hijoId, hijo2Id];
}
exports.productIDSancor = productIDSancor;
;
// <!----------------------Funcion PRODUCT ID SANCOR end---------------------------->   
// <!----------------------Funcion PRODUCT ID GALENO start---------------------------->   
function productIdGaleno(grupo, tipo) {
    let grupoSigla = 'IND'; // Default group to 'IND'
    let edadIdGaleno = '';
    let tipoAsociado = tipo[1].tipo_Ingreso_Original_P_D + 'S';
    let familia = grupo[9];
    let edad_1 = grupo[7] ?? 0;
    let edad_2 = grupo[8] ?? 0;
    let numHijos = grupo[3] ?? 0; // Default to 0 if num_Hijos is null or undefined
    // Set 'MAT' if age2 is 18 or older
    if (edad_2 >= 18) {
        grupoSigla = 'MAT';
    }
    // Determine the age range and create the corresponding ID
    if (edad_1 <= 25) {
        edadIdGaleno = 'galeno' + tipoAsociado + grupoSigla + '25+' + numHijos + 'h';
    }
    else if (edad_1 <= 36) {
        edadIdGaleno = 'galeno' + tipoAsociado + grupoSigla + '36+' + numHijos + 'h';
    }
    else if (edad_1 <= 64) {
        edadIdGaleno = 'galeno' + tipoAsociado + grupoSigla + '64+' + numHijos + 'h';
    }
    else if (edad_1 <= 65) {
        edadIdGaleno = 'galeno' + tipoAsociado + grupoSigla + '65+' + numHijos + 'h';
    }
    let id = [];
    id.push(edadIdGaleno);
    return id;
}
exports.productIdGaleno = productIdGaleno;
// // <!----------------------Funcion PRODUCT ID GALENO end---------------------------->
// // <!----------------------Funcion PRODUCT ID PREMEDIC start----------------------------> 
function productIdPremedic(grupo, tipo) {
    let tipoAsociado = tipo[1].tipo_Ingreso_Original_P_D;
    let edad_1 = grupo[7];
    let numHijos = grupo[3]; // Default to 0 if num_Hijos is null or undefined
    let grupoSigla = grupo[10]; // Default group to 'IND'
    let id_premedic = '';
    let id_hijo_hasta_1 = 'premedic' + tipoAsociado + 'AD-1anio';
    let id_hijo_hasta_25 = 'premedic' + tipoAsociado + 'AD-25';
    // Matched edad_1 group ranges for parents (MAT)
    if (edad_1 <= 29) {
        id_premedic = 'premedic' + tipoAsociado + grupoSigla + '29+' + numHijos + 'h';
    }
    else if (edad_1 <= 39) {
        id_premedic = 'premedic' + tipoAsociado + grupoSigla + '29+' + numHijos + 'h';
    }
    else if (edad_1 <= 49) {
        id_premedic = 'premedic' + tipoAsociado + grupoSigla + '29+' + numHijos + 'h';
    }
    else if (edad_1 <= 59) {
        S;
        id_premedic = 'premedic' + tipoAsociado + grupoSigla + '29+' + numHijos + 'h';
    }
    return [id_premedic, id_hijo_hasta_1, id_hijo_hasta_25];
}
exports.productIdPremedic = productIdPremedic;
// <!----------------------Funcion PRODUCT ID PREMEDIC END---------------------------->    
// <!----------------------Funcion PRODUCT ID OMINT start---------------------------->        
function productIdOmint(grupo, tipo) {
    let tipoAsociado = tipo[1].tipo_Ingreso_Original_P_D;
    // Helper function to generate ID based on age
    const generateEdadID = (edad, tipoAsociado) => {
        if (edad >= 18 && edad <= 25) {
            return 'omint' + tipoAsociado + 25;
        }
        else if (edad >= 26 && edad <= 35) {
            return 'omint' + tipoAsociado + 35;
        }
        else if (edad >= 36 && edad <= 54) {
            return 'omint' + tipoAsociado + 54;
        }
        else if (edad >= 55 && edad <= 59) {
            return 'omint' + tipoAsociado + 59;
        }
        else {
            return 'omint' + tipoAsociado + 60;
        }
    };
    // Assigning variables
    let edad_1 = grupo[7];
    let edad_2 = grupo[8];
    let id_hijo_1 = 'omint' + tipoAsociado + 'H1';
    let id_hijo_2 = 'omint' + tipoAsociado + 'H2';
    // Generate IDs for both titular and conyuge (person 1 and person 2)
    let id_titular = generateEdadID(edad_1, tipoAsociado);
    let id_conyuge = generateEdadID(edad_2, tipoAsociado);
    // Logging for debugging (you can remove it once done)
    // console.log("id_titular=" + id_titular + "; id_conyuge=" + id_conyuge + "; id_hijo_1=" + id_hijo_1 + "; id_hijo_2=" + id_hijo_2);
    // Return the generated IDs
    return [id_titular, id_conyuge, id_hijo_1, id_hijo_2];
}
exports.productIdOmint = productIdOmint;
// <!----------------------Funcion PRODUCT ID OMINT end---------------------------->
// <!----------------------Funcion PRODUCT ID SWISS start---------------------------->        
function productIdSwiss(grupo, tipo) {
    // Reset age for specific groups (reset edad_1 or edad_2, not a non-existent 'edad')
    let tipoAsociado = tipo[1].tipo_Ingreso_Original_P_D;
    let familia = grupo[9];
    let edad_1 = grupo[7] ?? 0;
    let edad_2 = grupo[8] ?? 0;
    let rangoEtario_2 = "";
    let rangoEtario_1 = "";
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
            return ''; // Return empty string for invalid age values
        }
        for (const range of ageRanges) {
            // console.log('idswiss age :'+age);
            // console.log('idswiss range :');console.log(range)
            if (age >= range.min && age <= range.max) {
                return range.label;
            }
        }
        return ''; // If no range matches
    }
    if (familia === 1 || familia === 2) {
        rangoEtario_1 = getAgeRange(edad_1);
    }
    else {
        rangoEtario_2 = getAgeRange(edad_2);
        rangoEtario_1 = getAgeRange(edad_1);
    }
    // Determine the age ranges for both ages
    // Generate IDs based on the age range and association type
    let id_titular = 'swiss' + tipoAsociado + rangoEtario_1;
    let id_conyuge = 'swiss' + tipoAsociado + rangoEtario_2;
    let id_hijo_1 = 'swiss' + tipoAsociado + '1h';
    let id_hijo_2 = 'swiss' + tipoAsociado + '2h';
    // console.log('Ids Swiss  :');
    // console.log(id_titular, id_conyuge, id_hijo_1, id_hijo_2);
    // Return the generated product IDs
    return [id_titular, id_conyuge, id_hijo_1, id_hijo_2];
}
exports.productIdSwiss = productIdSwiss;
// <!----------------------Funcion PRODUCT ID END start----------------------------> 
// <!----------------------Funcion PRODUCT ID MEDIFE start---------------------------->
function productIdMedife(grupo, tipo) {
    let idMedife = '';
    let tipoAsociado = tipo[1].tipo_Ingreso_Original_P_D;
    let edad_1 = grupo[7] ?? 0;
    let grupoSigla = grupo[10];
    // Generate ID based on age ranges
    if (edad_1 >= 18 && edad_1 <= 25) {
        idMedife = 'medife' + tipoAsociado + grupoSigla + '0-25';
    }
    else if (edad_1 >= 26 && edad_1 <= 35) {
        idMedife = 'medife' + tipoAsociado + grupoSigla + '26-35';
    }
    else if (edad_1 >= 36 && edad_1 <= 40) {
        idMedife = 'medife' + tipoAsociado + grupoSigla + '36-40';
    }
    else if (edad_1 >= 41 && edad_1 <= 50) {
        idMedife = 'medife' + tipoAsociado + grupoSigla + '41-50';
    }
    else if (edad_1 >= 51 && edad_1 <= 60) {
        idMedife = 'medife' + tipoAsociado + grupoSigla + '51-60';
    }
    else if (edad_1 >= 61 && edad_1 <= 65) {
        idMedife = 'medife' + tipoAsociado + grupoSigla + '61-65';
    }
    else {
        idMedife = ''; // No valid age range
    }
    // IDs for specific family roles
    const Hijo0a1 = 'medife' + tipoAsociado + 'HIJO0a1';
    const Hijo0a20 = 'medife' + tipoAsociado + 'HIJO2a20';
    const HIJO21a29 = 'medife' + tipoAsociado + 'HIJO21a29';
    // Return all IDs in an array
    return [idMedife, Hijo0a1, Hijo0a20, HIJO21a29];
}
exports.productIdMedife = productIdMedife;
// <!----------------------Funcion PRODUCT ID MEDIFE end----------------------------> 
// <!----------------------Funcion PRODUCT ID PREVENCION SALUD start----------------------------> 
function productIdPrevencion(grupo, tipo) {
    let tipoAsociado = tipo[1].tipo_Ingreso_Original_P_D;
    let edad_1 = grupo[7] ?? 0;
    let edad_2 = grupo[8] ?? 0;
    let grupoSigla = 'IND';
    let edadIdPrevencion = '';
    let numHijos = (grupo[3] > 0) ? '+' + grupo[3] + 'H' : ''; // If hijos is 0 or less, leave it empty
    let zona = 'Z4';
    let rangoEtario_1 = '';
    // Logging for debugging (corrected the typo)
    // console.log('Prevencion edad_2', edad_2);
    // console.log('Prevencion edad_1', edad_1);
    // console.log('Prevencion numHijos', numHijos);
    // console.log('Prevencion tipo', tipoAsociado);
    // Define the edad_1 range to append
    const ageRanges = [
        { max: 25, label: '0-25' },
        { max: 30, label: '26-30' },
        { max: 35, label: '31-35' },
        { max: 40, label: '36-40' },
        { max: 45, label: '41-45' },
        { max: 50, label: '46-50' },
        { max: 55, label: '51-55' },
        { max: 60, label: '56-60' }
    ];
    function getAgeRange(age) {
        for (const range of ageRanges) {
            if (age <= range.max) {
                // console.log('edad : '+age)
                // console.log('range : ');console.log(range)
                return range.label;
            }
        }
        return ''; // If no range matches
    }
    rangoEtario_1 = getAgeRange(edad_1);
    edadIdPrevencion = 'prevencion' + tipoAsociado + zona + grupoSigla + numHijos + rangoEtario_1;
    // Log the result
    // console.log('Id en el archivo id:', edadIdPrevencion);
    let id = [];
    id.push(edadIdPrevencion);
    return id;
}
exports.productIdPrevencion = productIdPrevencion;
// <!----------------------Funcion PRODUCT ID PREVENCION SALUD end----------------------------> 
// // <!----------------------Funcion PRODUCT ID DOCTORED start----------------------------> 
function productIdDoctored(grupo, tipo) {
    let tipoAsociado = tipo[1].tipo_Ingreso_Original_P_D;
    let edad_1 = grupo[7] ?? 0;
    let numHijos = grupo[3];
    let grupoSigla = grupo[10];
    if (numHijos > 2) {
        numHijos = 2;
    }
    else { }
    let rangoEtario = '18-25';
    let idDoctored = 'doctored' + grupoSigla + tipoAsociado + rangoEtario + '+' + numHijos + 'h';
    let idDoctoredHijo3 = 'doctored' + tipoAsociado + 'HIJO';
    let idDoctoredAd = 'doctoredAD' + tipoAsociado + rangoEtario;
    if (edad_1 <= 25) {
        rangoEtario = '18-25+';
    }
    else if (edad_1 <= 35 && edad_1 >= 26) {
        rangoEtario = '25-35+';
    }
    else if (edad_1 <= 45 && edad_1 >= 36) {
        rangoEtario = '35-45+';
    }
    else if (edad_1 <= 55 && edad_1 >= 46) {
        rangoEtario = '46-55+';
    }
    else if (edad_1 <= 60 && edad_1 >= 56) {
        rangoEtario = '56-60+';
    }
    else if (edad_1 <= 69 && edad_1 >= 61) {
        rangoEtario = '61-69+';
    }
    else if (edad_1 <= 79 && edad_1 >= 70) {
        rangoEtario = '70-79+';
    }
    return [idDoctored, idDoctoredHijo3, idDoctoredAd];
}
exports.productIdDoctored = productIdDoctored;
// <!----------------------Funcion PRODUCT ID DOCTORED END----------------------------> 
// <!----------------------Funcion PRODUCT ID RAS y CRISTAL start---------------------------->        
function productIdRasCristal(grupo, tipo) {
    let tipoAsociado = tipo[1].tipo_Ingreso_Original_P_D;
    let familia = grupo[9];
    let edad_1 = grupo[7] ?? 0;
    let edad_2 = grupo[8] ?? 0;
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
                // console.log('edad : '+age)
                // console.log('range : ');console.log(range)
                return range.label;
            }
        }
        return ''; // If no range matches
    }
    // console.log('familia  rasid:'+familia)
    // Determine the age ranges
    if (familia === 1 || familia === 2) {
        rangoEtario_1 = getAgeRange(edad_1);
    }
    else {
        // console.log('edad_1 ',edad_1)
        // console.log('edad_2 ',edad_2)
        rangoEtario_2 = getAgeRange(edad_2);
        rangoEtario_1 = getAgeRange(edad_1);
    }
    // Create IDs for titular, conyuge, and hijos
    let idTitularRas = "ras" + tipoAsociado + rangoEtario_1;
    let idConyugeRas = "ras" + tipoAsociado + rangoEtario_2;
    let idHijo1Ras = "ras" + tipoAsociado + "1H";
    let idHijo2Ras = "ras" + tipoAsociado + "2H";
    let idHijo3Ras = "ras" + tipoAsociado + "3H";
    let idTitularCristal = "cristal" + tipoAsociado + rangoEtario_1;
    let idConyugeCristal = "cristal" + tipoAsociado + rangoEtario_2;
    let idHijo1Cristal = "cristal" + tipoAsociado + "1H";
    let idHijo2Cristal = "cristal" + tipoAsociado + "2H";
    let idHijo3Cristal = "cristal" + tipoAsociado + "3H";
    // Store the IDs in an array
    ids.push(idTitularRas, idConyugeRas, idHijo3Ras, idHijo2Ras, idHijo1Ras, idTitularCristal, idConyugeCristal, idHijo3Cristal, idHijo2Cristal, idHijo1Cristal);
    // console.log('ids ',ids)
    return ids;
}
exports.productIdRasCristal = productIdRasCristal;
// <!----------------------Funcion PRODUCT ID RAS y CRISTAL end---------------------------->    
// <!----------------------Funcion PRODUCT ID BAYRES PLAN start---------------------------->        
function productIBayres(grupo) {
    let familia = grupo[9];
    let edad_1 = grupo[7] ?? 0;
    let edad_2 = grupo[8] ?? 0;
    let grupoSigla = grupo[10];
    let kids = "";
    let rangoEtario = "";
    let ids = [];
    let idAdultos = "";
    // Ensure edad_2 is not greater than edad_1
    if (edad_2 > edad_1) {
        [edad_1, edad_2] = [edad_2, edad_1]; // Swap values if edad_2 is greater than edad_1
    }
    if (grupoSigla === 'IND') {
        if (familia === 1) {
            kids = "";
        }
        else if (familia === 2) {
            kids = "+1Hhasta25";
        }
    }
    else if (grupoSigla === 'MAT') {
        kids = "";
    }
    else if (familia === 4) {
        kids = "+1H";
    }
    const getAgeRange = (age) => {
        if (age <= 49)
            return '0-49';
        if (age <= 59)
            return '50-59';
        if (age <= 64)
            return '60-64';
        if (age <= 69)
            return '65-69';
        if (age <= 74)
            return '70-74';
        if (age <= 79)
            return '75-79';
        if (age <= 89)
            return '80-89';
        return "+90";
    };
    // Determine ranges for both individuals
    rangoEtario = getAgeRange(edad_1);
    if (rangoEtario === 0 - 49 || rangoEtario === 50 - 59) {
        idAdultos = "bayres" + grupoSigla + kids + rangoEtario;
    }
    else {
        idAdultos = "bayres" + grupoSigla + "-" + rangoEtario;
    }
    let idHijohasta25 = "bayres" + "ADHhasta25-" + rangoEtario;
    let idAdicional18a49 = "bayres" + "AD18A49-" + rangoEtario;
    let idSinMaternidad = "bayresIND-JOV-hastas25-SMAT-0-49";
    let idIND18a29 = "bayresIND-18-29";
    ids.push(idAdultos, idHijohasta25, idAdicional18a49, idSinMaternidad, idIND18a29);
    return ids;
}
exports.productIBayres = productIBayres;
// <!----------------------Funcion PRODUCT ID BAYRES PLAN end----------------------------> 
// <!----------------------Funcion PRODUCT ID ASMEPRIV start---------------------------->        
function productIdAsmepriv(grupo, tipo) {
    // console.log('Asmepriv llgan : ',grupo[7]);
    // console.log('Asmepriv llgan : ',grupo[8]);
    // console.log('Asmepriv llgan : ',grupo[3]);
    // console.log('Asmepriv llgan : ',tipo[1].tipo_Ingreso_P_D_Monotributo);
    let familia = grupo[9];
    let edad_1 = grupo[7] ?? 0;
    let edad_2 = grupo[8] ?? 0;
    let grupoSigla = grupo[10];
    let tipoAsociado = tipo[1].tipo_Ingreso_P_D_Monotributo;
    let kids = "+" + grupo[3] + "H";
    let rangoEtario = "";
    let ids = [];
    if (edad_2 === null) {
        edad_2 = 0;
    }
    if (grupoSigla === 'IND') {
        if (grupo === 1) {
            kids = "";
        }
        else if (grupo === 1 && tipoAsociado != "D") {
            kids = "-SINMAT";
        }
    }
    else if (familia === 3) {
        kids = "";
    }
    const getAgeRange = (age) => {
        if (age < 18)
            return;
        if (age <= 29)
            return '18-29';
        if (age <= 39)
            return '30-39';
        if (age <= 49)
            return '40-49';
        if (age <= 59)
            return '50-59';
        if (tipoAsociado === "P") {
            if (age <= 64)
                return '60-64';
            if (age <= 64)
                return '65-69';
            if (age <= 54)
                return '70-71';
        }
        return;
    };
    rangoEtario = getAgeRange(edad_1);
    if (rangoEtario === '60-64' || rangoEtario === '65-69' || rangoEtario === '70-71') {
        kids = "";
    }
    let idAsmepriv = "asmepriv" + tipoAsociado + grupoSigla + kids + rangoEtario;
    let idAdmenorUno = "asmepriv" + tipoAsociado + "ADH-1"; // adicional menor d eun año
    let idHijoHasta21 = "asmepriv" + tipoAsociado + "H-21"; // hijo hasta 21 años
    let idRecargoHijo21a29 = "";
    let idModuloMat = "";
    ids.push(idAsmepriv, idAdmenorUno, idHijoHasta21);
    // console.log("idAsmepriv :" + idAsmepriv);
    // console.log("idAdmenorUno :" + idAdmenorUno);
    // console.log("idHijoHasta21 :" + idHijoHasta21);
    if (tipoAsociado != "D") {
        idRecargoHijo21a29 = "asmepriv" + tipoAsociado + "RECH21A29"; // recargo hijo de 21 a 29 años
        idModuloMat = "asmepriv" + tipoAsociado + "MODMAT"; // modulo maternidad
        ids.push(idRecargoHijo21a29, idModuloMat);
    }
    else {
        idRecargoHijo21a29 = ""; // recargo hijo de 21 a 29 años
        idModuloMat = ""; // modulo maternidad
        ids.push(idRecargoHijo21a29, idModuloMat);
    }
    // console.log("idRecargoHijo21a29 :" + idRecargoHijo21a29);
    // console.log("idModuloMat :" + idModuloMat);
    return ids;
}
exports.productIdAsmepriv = productIdAsmepriv;
// <!----------------------Funcion PRODUCT ID ASMEPRIV end---------------------------->
// <!----------------------Funcion PRODUCT ID LUIS PASTEUR start---------------------------->
function productIdLuisPasteur(grupo, tipo) {
    let familia = grupo[9];
    let edad_1 = grupo[7] ?? 0;
    let grupoSigla = grupo[10];
    let tipoAsociado = tipo[1].tipo_Ingreso_P_D_Monotributo;
    let kids = 'y' + grupo[3];
    let ids = [];
    if (familia === 1 || familia === 1 || grupo[3] === null || grupo[3] === 0) {
        kids = "";
    }
    // console.log('grupo : ' + grupo);
    const getAgeRange = (age) => {
        if (age < 18)
            return;
        if (age <= 25)
            return '18-25';
        if (age <= 30)
            return '26-30';
        if (age <= 35)
            return '31-35';
        if (age <= 45)
            return '36-45';
        if (age <= 49)
            return '46-49';
        if (age <= 54)
            return '50-54';
        if (age <= 59)
            return '55-59';
        return '60';
    };
    let rangoEtario = getAgeRange(edad_1);
    // console.log('grupo : ' + grupo);
    // console.log('tipoAsociado : ' + tipoAsociado);
    // console.log('rangoEtario : ' + rangoEtario);
    // console.log('hijos : ' + kids);
    let idLuispasteur = "luispasteur" + grupoSigla + tipoAsociado + rangoEtario + kids;
    // console.log('idLuispasteur : ' + idLuispasteur);
    let idNieto = "luispasteur" + "NIETO" + tipoAsociado;
    let idAd = "luispasteur" + "AD" + tipoAsociado;
    let idHijo = "luispasteur" + "HIJO" + tipoAsociado;
    // console.log('idNieto : ' + idNieto);
    // console.log('idAd : ' + idAd);
    // console.log('idHijo : ' + idHijo);
    ids.push(idLuispasteur, idNieto, idAd, idHijo);
    return ids;
}
exports.productIdLuisPasteur = productIdLuisPasteur;
// <!----------------------Funcion PRODUCT ID LUIS PASTEUR end----------------------------> 
// <!----------------------Funcion PRODUCT ID AVALIAN  start----------------------------> 
function productIdAvalian(grupo, tipo) {
    let tipoAsociado = tipo[1].tipo_Ingreso_Original_P_D;
    let familia = grupo[9];
    let edad_1 = grupo[7];
    let edad_2 = grupo[8];
    let rangoEtario_1 = "";
    let rangoEtario_2 = "";
    let zonaComercial = ["BA", "E", "P"];
    let idTitular = "";
    let idConyuge = "";
    let idHijo1 = "";
    let idHijo2 = "";
    let idHijo3 = "";
    let idHijo25 = "";
    let ids = [];
    // Function to determine age range
    const getAgeRange = (age) => {
        if (age <= 25)
            return '25';
        if (age <= 30)
            return '26-30';
        if (age <= 35)
            return '31-35';
        if (age <= 40)
            return '36-40';
        if (age <= 45)
            return '41-45';
        if (age <= 49)
            return '46-49';
        if (age <= 55)
            return '50-55';
        if (age <= 60)
            return '56-60';
        if (age <= 64)
            return '61-64';
        return '+65';
    };
    // Determine ranges for both individuals
    rangoEtario_1 = getAgeRange(edad_1);
    // For the group 3 or 4, we calculate age for both people
    if (familia === 3 || familia === 4) {
        rangoEtario_2 = getAgeRange(edad_2);
    }
    else {
        rangoEtario_2 = rangoEtario_1; // Same range as the first person
    }
    // console.log("rangoEtario_1: " + rangoEtario_1);
    // console.log("rangoEtario_2: " + rangoEtario_2);
    // Generate IDs for each role
    idTitular = "avalian" + "Z" + zonaComercial[0] + tipoAsociado + rangoEtario_1;
    idConyuge = "avalian" + "Z" + zonaComercial[0] + tipoAsociado + rangoEtario_2;
    idHijo3 = "avalian" + "Z" + zonaComercial[0] + tipoAsociado + "3H";
    idHijo2 = "avalian" + "Z" + zonaComercial[0] + tipoAsociado + "2H";
    idHijo1 = "avalian" + "Z" + zonaComercial[0] + tipoAsociado + "1H";
    idHijo25 = "avalian" + "Z" + zonaComercial[0] + tipoAsociado + "25";
    ids.push(idTitular, idConyuge, idHijo3, idHijo2, idHijo1, idHijo25);
    // Return array of ids
    return ids;
}
exports.productIdAvalian = productIdAvalian;
// <!----------------------Funcion PRODUCT ID AVALIAN end----------------------------> 
// <!----------------------Funcion PRODUCT ID HOMINIS  start----------------------------> 
function productIdHominis(grupo, tipo) {
    let tipoAsociado = tipo[1].tipo_Ingreso_Original_P_D;
    let familia = grupo[9];
    let edad_1 = grupo[7];
    let grupoSigla = grupo[10];
    let kids = "+" + grupo[3] + "H";
    let rangoEtario = "";
    // Function to determine age range
    const getAgeRange = (age) => {
        if (age <= 39)
            return '18-39';
        if (age <= 49)
            return '40-49';
        if (age <= 64)
            return '50-64';
        return '65';
    };
    rangoEtario = getAgeRange(edad_1);
    if (familia === 1 || familia === 2) {
        if (familia === 1) {
            kids = "+0H";
        }
        else if (familia === 1 && edad_1 <= 25) {
            rangoEtario = "18-25";
        }
        else {
            rangoEtario = getAgeRange(edad_1);
        }
    }
    else if (familia === 3 || familia === 4) {
        if (familia === 3) {
            kids = "+0H";
        }
        else if (familia === 3 && edad_1 <= 25) {
            rangoEtario = "18-25";
        }
        else {
            rangoEtario = getAgeRange(edad_1);
        }
    }
    let idHominis = "hominis" + grupoSigla + kids + tipoAsociado + rangoEtario;
    let id = [];
    id.push(idHominis);
    return id;
}
exports.productIdHominis = productIdHominis;
// <!----------------------Funcion PRODUCT ID HOMINIS end----------------------------> 
// <!----------------------Funcion PRODUCT ID SALUD CENTRAL  start----------------------------> 
function productIdSaludcentral(grupo) {
    let edad_1 = grupo[7];
    let edad_2 = grupo[8];
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
    let idSaludcentralTitular = 'saludcentral' + rangoEtario_1;
    let idSaludcentralConyuge = 'saludcentral' + rangoEtario_2;
    const idHijo1 = 'saludcentral1H';
    const idHijo2 = 'saludcentral2H';
    const ids = [idSaludcentralTitular, idSaludcentralConyuge, idHijo1, idHijo2];
    // console.log('ids salud central:', ids);
    return ids;
}
exports.productIdSaludcentral = productIdSaludcentral;
// <!----------------------Funcion PRODUCT ID SALUD CENTRAL end----------------------------> 
//# sourceMappingURL=ids.js.map