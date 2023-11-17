import { Router } from "express";
import * as express from "express";
import { getItems, getItemById, createItem, updateItem, deleteItem, searchItem  } from '../controllers/items';

const router = Router();

router.use(express.json());
router.get('/',(req, res) => { getItems(req, res, "empleyees");});
router.get('/:id', (req, res) => { getItemById(req, res, "empleyees");});
router.post('/', (req, res) => {createItem(req, res, "empleyees" ) });
router.put('/:id', (req, res) => { updateItem(req, res, "empleyees" )});
router.delete('/:id', (req, res) => { deleteItem(req, res, "empleyees" )});
router.get('/search',(req, res) => {searchItem(req, res, "empleyees");
  });
 
export { router }


