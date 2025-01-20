"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const planes_1 = require("../controllers/planes");
const router = (0, express_1.Router)();
exports.router = router;
// Usando la opción más concisa
router.get('/', (req, res) => { (0, planes_1.updateClinicas)(req, res); });
//# sourceMappingURL=update.js.map