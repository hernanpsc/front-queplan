import { Router } from "express";
import * as express from "express";
import { getItems, getItemById, createItem, updateItem, deleteItem, searchItem  } from '../controllers/items';

const router = Router();

router.use(express.json());
router.get('/',(req, res) => { getItems(req, res, "posts");});
router.get('/:id', (req, res) => { getItemById(req, res, "posts");});
router.post('/', (req, res) => {createItem(req, res, "posts" ) });
router.put('/:id', (req, res) => { updateItem(req, res, "posts" )});
router.delete('/:id', (req, res) => { deleteItem(req, res, "posts" )});
router.get('/search',(req, res) => {searchItem(req, res, "posts");
  });
 
export { router }


