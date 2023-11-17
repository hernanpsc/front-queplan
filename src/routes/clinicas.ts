import { Router } from "express";
import * as express from "express";
import { getItems, getItemById, createItem, updateItem, deleteItem, searchItem  } from '../controllers/items';

const router = Router();

router.use(express.json());
router.get('/',(req, res) => { getItems(req, res, "clinicas");});
router.get('/:id', (req, res) => { getItemById(req, res, "clinicas");});
router.post('/', (req, res) => {createItem(req, res, "clinicas" ) });
router.put('/:id', (req, res) => { updateItem(req, res, "clinicas" )});
router.delete('/:id', (req, res) => { deleteItem(req, res, "clinicas" )});
router.get('/search',(req, res) => {searchItem(req, res, "clinicas");
  });
 
export { router }


