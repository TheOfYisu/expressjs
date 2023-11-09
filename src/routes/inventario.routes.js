import { Router } from "express";
const router = Router();

import { getInventario ,createProducto, updateProducto, deleteProducto, getProducto  } from "../controllers/inventario.controller.js";

router.get ('/inventario', getInventario);

router.get ('/inventario/:id', getProducto);

router.post ('/inventario', createProducto);

router.patch ('/inventario/:id', updateProducto);

router.delete ('/inventario/:id', deleteProducto);

export default router