"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const mongo_1 = __importDefault(require("./config/mongo"));
const body_parser_1 = __importDefault(require("body-parser"));
const PORT = process.env.PORT || 3001;
const whitelist = [
    'http://localhost:4200',
    'http://localhost:4300',
    'http://localhost:4400',
    'http://localhost:4500',
    'https://sakai-ng-front.vercel.app',
    'https://soloclinic.vercel.app',
    'https://front-prepagas.vercel.app'
];
const portRegex = /^http:\/\/localhost(?::\d+)?$/;
const filteredWhitelist = whitelist.filter((origin) => portRegex.test(origin));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: '*',
    // origin: filteredWhitelist,
    allowedHeaders: ['Authorization', 'Content-Type']
}));
app.use(express_1.default.json());
app.use(routes_1.router);
app.use(body_parser_1.default.json({ limit: '50mb' })); // Puedes ajustar el límite según tus necesidades
app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true }));
(0, mongo_1.default)().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:` + PORT + `...`);
    });
})
    .catch(error => console.error(error));
//# sourceMappingURL=app.js.map