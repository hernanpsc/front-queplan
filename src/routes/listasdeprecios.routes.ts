import * as express from "express";
import { getPrecios, getPrecioById,getPrices,getPrecioByParam
    // , createPrecio, updatePrecio, deletePrecio 
} from '../controllers/listasdeprecios.controller';

export const listasdepreciosRouter = express.Router();
listasdepreciosRouter.use(express.json());
listasdepreciosRouter.get('/',getPrecios);
listasdepreciosRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    return getPrecioById(req, res, id);
  });
  listasdepreciosRouter.get('/prices', getPrices);
  listasdepreciosRouter.get('/like/:id',(req, res) => {
    const { id } = req.params;
    return getPrecioByParam(req, res, id);
  });

// listasdepreciosRouter.post('/', createPrecio);
// listasdepreciosRouter.put('/:id', updatePrecio);
// listasdepreciosRouter.delete('/:id', deletePrecio);
