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
exports.employeesRouter = void 0;
const express = __importStar(require("express"));
const employees_controller_1 = require("../controllers/employees.controller");
exports.employeesRouter = express.Router();
exports.employeesRouter.use(express.json());
exports.employeesRouter.get('/', employees_controller_1.getEmployees);
exports.employeesRouter.get('/:id', employees_controller_1.getEmployeeById);
exports.employeesRouter.post('/', employees_controller_1.createEmployee);
exports.employeesRouter.put('/:id', employees_controller_1.updateEmployee);
exports.employeesRouter.delete('/:id', employees_controller_1.deleteEmployee);
//# sourceMappingURL=employees.routes.js.map