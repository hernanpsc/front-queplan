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
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = exports.collections = void 0;
const mongodb = __importStar(require("mongodb"));
exports.collections = {};
async function connectToDatabase(uri) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();
    const db = client.db("api-crud");
    const db1 = client.db("planes");
    const db2 = client.db("precios");
    const db3 = client.db("posts");
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
    const preciosCollection = db2.collection("listasdeprecios");
    exports.collections.precios = preciosCollection;
    // Agregar un console.log para imprimir la colección de precios
    // console.log("Colección de Precios:", collections.precios);
    const postsCollection = db3.collection("posts");
    exports.collections.posts = postsCollection;
}
exports.connectToDatabase = connectToDatabase;
//# sourceMappingURL=database.js.map