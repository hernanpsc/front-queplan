import mongoose, { Schema, Document } from 'mongoose';
import * as mongodb from "mongodb";

export interface Employee extends Document {
  name: string;
  position: string;
  level: 'junior' | 'mid' | 'senior';
  _id?: mongodb.ObjectId;
}

const EmployeeSchema: Schema = new Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  level: { type: String, enum: ['junior', 'mid', 'senior'], required: true },
});

export default mongoose.model<Employee>('Employee', EmployeeSchema);
