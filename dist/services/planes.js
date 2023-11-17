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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePlan = exports.updatePlan = exports.createPlan = exports.getPlanById = exports.getPlanes = void 0;
const mongodb = __importStar(require("mongodb"));
const planes_1 = __importDefault(require("../models/planes"));
const getPlanes = async () => {
    const planes = await planes_1.default.find({});
    return planes;
};
exports.getPlanes = getPlanes;
const getPlanById = async (id) => {
    const plan = await planes_1.default.findOne({ _id: id });
    return plan;
};
exports.getPlanById = getPlanById;
const createPlan = async (item) => {
    if (item._id) {
        item._id = new mongodb.ObjectId(item._id);
    }
    const responseCreate = await planes_1.default.create(item);
    return responseCreate;
};
exports.createPlan = createPlan;
const updatePlan = async (id, data) => {
    const responseUpdate = await planes_1.default.findOneAndUpdate({ _id: id }, data, { new: true });
    return responseUpdate;
};
exports.updatePlan = updatePlan;
const deletePlan = async (id) => {
    const result = await planes_1.default.deleteOne({ _id: id });
    return result;
};
exports.deletePlan = deletePlan;
//# sourceMappingURL=planes.js.map