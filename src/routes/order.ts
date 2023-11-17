
import { Router } from "express";
import * as express from "express";
import { checkJwt } from "../middleware/session";
import { getItems, getItemById, createItem, updateItem, deleteItem, searchItem  } from '../controllers/items';

const router = Router();

router.use(express.json());
router.get('/', checkJwt, (req, res) => { getItems(req, res, "order");});
router.get('/:id', checkJwt,  (req, res) => { getItemById(req, res, "order");});
router.post('/', checkJwt, (req, res) => {createItem(req, res, "order" ) });
router.put('/:id', checkJwt, (req, res) => { updateItem(req, res, "order" )});
router.delete('/:id',checkJwt,  (req, res) => { deleteItem(req, res, "order" )});
router.get('/search',checkJwt, (req, res) => {searchItem(req, res, "order");
  });
 
export { router }


