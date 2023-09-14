import express from "express";
import salleController from '../controllers/infoSalle.controller.js';

const router = express.Router();

router.get('/', salleController.getSalleInfo ) 

export default router;