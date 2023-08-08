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
exports.fileUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const { ATLAS_URI, PORT } = process.env;
const storage = multer_1.default.diskStorage({
    filename: function (req, file, cb) {
        const ext = file.originalname.split('.').pop();
        const fileName = Date.now();
        cb(null, `${fileName}.${ext}`);
    },
    destination: function (req, file, cb) {
        cb(null, './uploads');
    }
});
const upload = (0, multer_1.default)({ storage });
const fileUpload = async (req, res) => {
    try {
        // Middleware de carga de archivos, aquí se procesa el archivo y lo guarda en `req.file`
        upload.single('myFile')(req, res, function (err) {
            if (err) {
                console.error(err);
                return res.status(500).send(err.message);
            }
            // Acceso a la información del archivo
            const file = req.file.filename;
            res.send({ data: 'ok', url: `http://localhost:` + PORT + `/` + `${file}` });
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
};
exports.fileUpload = fileUpload;
//# sourceMappingURL=uploads.controller.js.map