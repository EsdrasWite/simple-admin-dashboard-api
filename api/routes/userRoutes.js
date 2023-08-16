import express from "express";

import userControllers from "../controllers/user.controllers.js";

const router = express.Router();

router.get('/', userControllers.get_all_users);

router.get('/:id', userControllers.get_user_by_id );

router.post('/signup', userControllers.signup);
 
router.post('/signin', userControllers.signin);

router.post('/forget-password', userControllers.forget_password);

router.post('/reset-password/:id/:token',userControllers.reset_password);

export default router;