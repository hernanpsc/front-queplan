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
exports.router = void 0;
const express_1 = require("express");
const express = __importStar(require("express"));
const htmlconverter_1 = require("../controllers/htmlconverter");
const router = (0, express_1.Router)();
exports.router = router;
router.use(express.json());
// router.get('/:id', (req, res) => { getFileById(req, res); });
// router.post('/', (req, res) => { createFile(req, res); });
// router.delete('/:id', (req, res) => { deleteFile(req, res); });
// router.get('/search', (req, res) => { searchFile(req, res); });
// router.get('/', (req, res) => { createImage(req, res); }); // Nueva ruta
router.get('/', (req, res) => { (0, htmlconverter_1.getItems)(req, res); });
//# sourceMappingURL=htmlconverters.js.map