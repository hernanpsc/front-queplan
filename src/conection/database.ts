import * as mongodb from "mongodb";
import { Employee } from "../models/employee.model";
import { Empresa } from "../interfaces/empresas";
import { Planes } from "../interfaces/planes";
import { Clinicas } from "../interfaces/clinicas";
import { Precios } from "../interfaces/precios";
import { Posts } from "../interfaces/posts";




export const collections: {
    employees?: mongodb.Collection<Employee>,
    empresas?: mongodb.Collection<Empresa>,
    todoslosplanes?: mongodb.Collection<Planes>,
    clinicas?: mongodb.Collection<Clinicas>,
    precios?: mongodb.Collection<Precios>,
    posts?: mongodb.Collection<Posts>,
 
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();
    

    const db = client.db("api-crud");
    const db1 = client.db("planes");
    const db2 = client.db("precios");
    const db3 = client.db("posts");



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

    // Agregar un console.log para imprimir la colección de precios
    // console.log("Colección de Precios:", collections.precios);

    const postsCollection = db3.collection<Posts>("posts"); 
    collections.posts = postsCollection;

    

}

