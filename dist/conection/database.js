"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = exports.collections = void 0;
const mongodb = __importStar(require("mongodb"));
exports.collections = {};
function connectToDatabase(uri) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new mongodb.MongoClient(uri);
        yield client.connect();
        const db = client.db("api-crud");
        const db1 = client.db("planes");
        const db2 = client.db("precios");
        // await applySchemaValidation(db);
        // await applySchemasValidation(db1);
        const employeesCollection = db.collection("employees");
        exports.collections.employees = employeesCollection;
        const empresasCollection = db1.collection("empresas");
        exports.collections.empresas = empresasCollection;
        const planesCollection = db1.collection("todoslosplanes");
        exports.collections.todoslosplanes = planesCollection;
        const clinicasCollection = db1.collection("clinicas");
        exports.collections.clinicas = clinicasCollection;
        const sancorCollection = db2.collection("Sancor");
        exports.collections.preciosSancor = sancorCollection;
        const omintCollection = db2.collection("Omint");
        exports.collections.preciosOmint = sancorCollection;
        const swissCollection = db2.collection("Swiss");
        exports.collections.preciosSwiss = swissCollection;
        const avalianCollection = db2.collection("Avalian");
        exports.collections.preciosAvalian = avalianCollection;
        const medifeCollection = db2.collection("Medife");
        exports.collections.preciosMedife = medifeCollection;
        const galenoCollection = db2.collection("Galeno");
        exports.collections.preciosGaleno = galenoCollection;
        const osdeCollection = db2.collection("Osde");
        exports.collections.preciosOsde = osdeCollection;
        const hominisCollection = db2.collection("Hominis");
        exports.collections.preciosHominis = hominisCollection;
        const premedicCollection = db2.collection("Premedic");
        exports.collections.preciosPremedic = premedicCollection;
        const doctoredCollection = db2.collection("Doctored");
        exports.collections.preciosDoctored = doctoredCollection;
        const saludCentralCollection = db2.collection("SaludCentral");
        exports.collections.preciosSaludCentral = saludCentralCollection;
    });
}
exports.connectToDatabase = connectToDatabase;
//# sourceMappingURL=database.js.map