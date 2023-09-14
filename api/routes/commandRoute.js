import express from "express";
import commandController from "../controllers/command.controller.js";

const router = express.Router();

router.get('/temp', commandController.getTemp);
router.put('/temp', commandController.changeTemp);
router.get('/status', commandController.getStatus) 
router.put('/status', commandController.changeStatus) 

export default router; 