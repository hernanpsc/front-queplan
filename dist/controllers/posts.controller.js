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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.createPost = exports.getPostById = exports.getPosts = void 0;
const database_1 = require("../conection/database");
const mongodb = __importStar(require("mongodb"));
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield database_1.collections.posts.find({}).toArray();
        res.status(200).send(posts);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.getPosts = getPosts;
const getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const post = yield database_1.collections.posts.findOne(query);
        if (!post) {
            return res.status(404).send('post not found');
        }
        res.status(200).send(post);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.getPostById = getPostById;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = req.body;
        const result = yield database_1.collections.posts.insertOne(post);
        if (result.acknowledged) {
            res.status(201).send(`Se creo una nueva post: ID ${result.insertedId}.`);
        }
        else {
            res.status(500).send("Falló crear una nueva post.");
        }
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});
exports.createPost = createPost;
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const id = (_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.id;
        const post = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = yield database_1.collections.posts.replaceOne(query, post);
        if (result.modifiedCount === 0) {
            return res.status(404).send('post not found');
        }
        res.status(200).send(yield database_1.collections.posts.findOne(query));
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const id = (_c = req === null || req === void 0 ? void 0 : req.params) === null || _c === void 0 ? void 0 : _c.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = yield database_1.collections.posts.deleteOne(query);
        if (result && result.deletedCount) {
            res.status(202).send(`Post eliminado: ID ${id}`);
        }
        else if (!result) {
            res.status(400).send(`Falló eliminar post: ID ${id}`);
        }
        else if (!result.deletedCount) {
            res.status(404).send(`Fallo eliminar post: ID ${id}`);
        }
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.deletePost = deletePost;
//# sourceMappingURL=posts.controller.js.map