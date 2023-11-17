import { Router } from "express";
import * as express from "express";
import { getItems, getItemById, createItem, updateItem, deleteItem, searchItem  } from '../controllers/items';

const router = Router();

router.use(express.json());
router.get('/',(req, res) => { getItems(req, res, "planes");});
router.get('/:id', (req, res) => { getItemById(req, res, "planes");});
router.post('/', (req, res) => {createItem(req, res, "planes" ) });
router.put('/:id', (req, res) => { updateItem(req, res, "planes" )});
router.delete('/:id', (req, res) => { deleteItem(req, res, "planes" )});
router.get('/search',(req, res) => {searchItem(req, res, "planes");
  });
 
export { router }


