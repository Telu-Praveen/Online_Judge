import express from 'express';
import { register } from '../controller/login-controller.js';
import { login } from '../controller/login-controller.js';

const router = express.Router();

router.post("/register",register);

router.get("/login",login);


export default router;