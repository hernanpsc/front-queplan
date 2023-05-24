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
exports.planesRouter = void 0;
const express = __importStar(require("express"));
const planes_controller_1 = require("../controllers/planes.controller");
exports.planesRouter = express.Router();
exports.planesRouter.use(express.json());
exports.planesRouter.get('/', planes_controller_1.getPlanes);
exports.planesRouter.get('/:id', planes_controller_1.getPlanById);
exports.planesRouter.post('/', planes_controller_1.createPlan);
exports.planesRouter.put('/:id', planes_controller_1.updatePlan);
exports.planesRouter.delete('/:id', planes_controller_1.deletePlan);
//# sourceMappingURL=planes.routes.js.map