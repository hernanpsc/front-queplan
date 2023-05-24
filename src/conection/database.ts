import * as mongodb from "mongodb";
import { Employee } from "../models/employee.model";
import { Empresa } from "../interfaces/empresas";
import { Planes } from "../interfaces/planes";
import { Clinicas } from "../interfaces/clinicas";
import { Precios } from "../interfaces/precios";



export const collections: {
    employees?: mongodb.Collection<Employee>,
    empresas?: mongodb.Collection<Empresa>,
    todoslosplanes?: mongodb.Collection<Planes>,
    clinicas?: mongodb.Collection<Clinicas>,
    precios?: mongodb.Collection<Precios>,
 
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();
    

    const db = client.db("api-crud");
    const db1 = client.db("planes");
    const db2 = client.db("precios");


    // await applySchemaValidation(db);
    // await applySchemasValidation(db1);

    const employeesCollection = db.collection<Employee>("employees");
    collections.employees = employeesCollection;
    
    
    const empresasCollection = db1.collection<Empresa>("empresas");
    collections.empresas = empresasCollection;

    const planesCollection = db1.collection<Planes>("todoslosplanes");
    collections.todoslosplanes = planesCollection;

    const clinicasCollection = db1.collection<Clinicas>("clinicas");
    collections.clinicas = clinicasCollection;

    const preciosCollection = db2.collection<Precios>("listasdeprecios"); 
    collections.precios = preciosCollection;

    

}

