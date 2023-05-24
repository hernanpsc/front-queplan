import * as express from "express";
import { getEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee } from '../controllers/employees.controller';

export const employeesRouter = express.Router();
employeesRouter.use(express.json());
employeesRouter.get('/',getEmployees);
employeesRouter.get('/:id', getEmployeeById);
employeesRouter.post('/', createEmployee);
employeesRouter.put('/:id', updateEmployee);
employeesRouter.delete('/:id', deleteEmployee);

