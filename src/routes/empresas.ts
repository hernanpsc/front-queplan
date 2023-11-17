import { Router } from "express";
import * as express from "express";
import { getItems, getItemById, createItem, updateItem, deleteItem, searchItem  } from '../controllers/items';

const router = Router();

router.use(express.json());
router.get('/',(req, res) => { getItems(req, res, "empresas");});
router.get('/:id', (req, res) => { getItemById(req, res, "empresas");});
router.post('/', (req, res) => {createItem(req, res, "empresas" ) });
router.put('/:id', (req, res) => { updateItem(req, res, "empresas" )});
router.delete('/:id', (req, res) => { deleteItem(req, res, "empresas" )});
router.get('/search',(req, res) => {searchItem(req, res, "empresas");
  });
 
export { router }


