import express from 'express';
import { register } from '../controller/login-controller.js';
import { login } from '../controller/login-controller.js';
import { addproblem,getproblems,getproblem} from '../controller/problem-controller.js';

const router = express.Router();

router.post("/register",register);

router.get("/login",login);

//problem
router.post("/addproblem",addproblem);
router.get("/getproblems",getproblems);
router.get("/getproblem",getproblem);
//router.delete("/deleteproblem",deleteproblem);
//router.put("/updateproblem",updateproblem);


export default router;