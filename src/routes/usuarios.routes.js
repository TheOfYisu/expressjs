import { Router } from "express";
const router = Router();
import { getUsuarios,createUsuarios, updateUsuarios, deleteUsuarios, getUsuario  } from "../controllers/usuarios.controllers.js";

router.get ('/usuarios', getUsuarios);

router.get ('/usuarios/:Id', getUsuario);

router.post ('/usuarios', createUsuarios);

router.patch ('/usuarios/:Id', updateUsuarios);

router.delete ('/usuarios/:Id', deleteUsuarios);

export default router