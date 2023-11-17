import { Schema, model } from "mongoose";
import { Clinicas } from "../interfaces/clinicas";

const clinicasSchema = new Schema<Clinicas>(



)
const ClinicasModel = model('clinicas', clinicasSchema);
export default ClinicasModel;