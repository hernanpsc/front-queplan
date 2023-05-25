import * as express from "express";
import { getPosts, getPostById, createPost, updatePost, deletePost } from '../controllers/posts.controller';

export const postsRouter = express.Router();
postsRouter.use(express.json());
postsRouter.get('/',getPosts);
postsRouter.get('/:id', getPostById);
postsRouter.post('/', createPost);
postsRouter.put('/:id', updatePost);
postsRouter.delete('/:id', deletePost);

