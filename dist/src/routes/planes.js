"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const planes_1 = require("../controllers/planes");
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', (req, res) => { (0, planes_1.getItems)(req, res); });
router.get('/:id', (req, res) => { (0, planes_1.getItemById)(req, res); });
router.post('/', (req, res) => { (0, planes_1.createItem)(req, res); });
router.put('/:id', (req, res) => { (0, planes_1.updateItem)(req, res); });
router.delete('/:id', (req, res) => { (0, planes_1.deleteItem)(req, res); });
router.get('/search', (req, res) => { (0, planes_1.searchItem)(req, res); });
//# sourceMappingURL=planes.js.map