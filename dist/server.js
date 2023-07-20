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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmployees2 = void 0;
const dotenv = __importStar(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const database_1 = require("./conection/database");
const employees_routes_1 = require("./routes/employees.routes");
const empresas_routes_1 = require("./routes/empresas.routes");
const planes_routes_1 = require("./routes/planes.routes");
const clinicas_routes_1 = require("./routes/clinicas.routes");
const cotizacion_routes_1 = require("./routes/cotizacion.routes");
const database_2 = require("./conection/database");
const listasdeprecios_routes_1 = require("./routes/listasdeprecios.routes");
const posts_routes_1 = require("./routes/posts.routes");
// Load environment variables from the .env file, where the ATLAS_URI is configured
dotenv.config();
const { ATLAS_URI, PORT } = process.env;
const whitelist = [
    'http://localhost:4200',
    'http://localhost:4300',
    'http://localhost:4400',
    'http://localhost:4500',
    'https://sakai-ng-front.vercel.app',
    'https://soloclinic.vercel.app',
    'https://brokersalud.vercel.app'
];
const portRegex = /^http:\/\/localhost(?::\d+)?$/;
const filteredWhitelist = whitelist.filter((origin) => portRegex.test(origin));
if (!ATLAS_URI) {
    console.error("No ATLAS_URI environment variable has been defined in config.env");
    process.exit(1);
}
(0, database_1.connectToDatabase)(ATLAS_URI)
    .then(() => {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)({
        origin: whitelist,
        allowedHeaders: ['Authorization', 'Content-Type']
    }));
    app.get('/', (req, res) => {
        res.send('Hello World!');
    });
    app.use("/employees", employees_routes_1.employeesRouter);
    app.use("/empresas", empresas_routes_1.empresasRouter);
    app.use("/planes", planes_routes_1.planesRouter);
    app.use("/clinicas", clinicas_routes_1.clinicasRouter);
    app.use('/cotizacion', cotizacion_routes_1.cotizacionRouter);
    app.use('/precios', listasdeprecios_routes_1.listasdepreciosRouter);
    app.use('/posts', posts_routes_1.postsRouter);
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:` + PORT + `...`);
    });
})
    .catch(error => console.error(error));
const getEmployees2 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield database_2.collections.employees.find({}).toArray();
        res.status(200).send(employees);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.getEmployees2 = getEmployees2;
//# sourceMappingURL=server.js.map