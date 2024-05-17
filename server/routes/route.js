const express = require('express');
const { register } = require('../controller/login-controller.js');
const { login } = require('../controller/login-controller.js');
const { addproblem,getproblems,getproblem,updateproblem,deleteproblem, runproblem,submitproblem} = require('../controller/problem-controller.js');

const router = express.Router();

router.post("/register",register);

router.post("/login",login);

//problem
router.post("/addproblem",addproblem);
router.get("/getproblems",getproblems);
router.get("/getproblem/:id",getproblem);
router.delete("/deleteproblem/:id",deleteproblem);
router.put("/updateproblem/:id",updateproblem);

//runproblem
router.post("/run",runproblem);
router.post("/submit/:id",submitproblem);


module.exports={
    router,
}