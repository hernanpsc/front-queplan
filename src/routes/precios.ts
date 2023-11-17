import { Router } from "express";
import * as express from "express";
import { getItems, getItemById, createItem, updateItem, deleteItem, searchItem  } from '../controllers/items';

const router = Router();

router.use(express.json());
router.get('/',(req, res) => { getItems(req, res, "precios");});
router.get('/:id', (req, res) => { getItemById(req, res, "precios");});
router.post('/', (req, res) => {createItem(req, res, "precios" ) });
router.put('/:id', (req, res) => { updateItem(req, res, "precios" )});
router.delete('/:id', (req, res) => { deleteItem(req, res, "precios" )});
router.get('/search',(req, res) => {searchItem(req, res, "precios");
  });
 
export { router }


