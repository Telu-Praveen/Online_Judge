const Problem = require('../model/Problem.js');
const express = require('express');
const {generateFile,generateInputFile,execute}=require('../controller/file-controller.js')

const addproblem = async (req, res) => {
    try {
        const { statement, input, whoSolved, output, constraints, timelimit, createdBy, testcase, name, code } = req.body;
        // save the user in DB
        const existingProblem = await Problem.findOne({ name });
        if (existingProblem) {
            res.send("problem exists already")
        }
        const problem = await Problem.create({
            statement,
            input,
            whoSolved,
            output,
            constraints,
            timelimit,
            createdBy,
            testcase,
            name,
            code,
        });
        res.status(200).json({ message: "Problem added successfully!", problem });
    } catch (error) {
        console.log(error);
    }
}

const getproblems = async (req, res) => {
    try {
        const problems = await Problem.find();
        res.status(200).json({ problems });
    } catch (error) {
        console.log(error);
    }
}

//get one problem at a time
const getproblem = async (req, res) => {
    try {
        const name = req.params.id;
        console.log(name);
        const problem = await Problem.findById(req.params.id);
        if (!problem) return res.status(404).send('Problem not found');
        res.status(200).json({ problem });
        //res.send(problem)
    } catch (error) {
        console.log(error);
    }
}

//update
const updateproblem = async (req, res) => {
    try {
        const problem = await Problem.findByIdAndUpdate(req.params.id, {
            statement: req.body.statement,
            name: req.body.name,
            code: req.body.code,
            input: req.body.input,
            whoSolved: req.body.whoSolved,
            output: req.body.output,
            constraints: req.body.constraints,
            timelimit: req.body.timelimit,
            createdBy: req.body.createdBy,
            testcase: req.body.testcase,
        },
            { new: true });
        if (!problem) return res.status(404).send('Book not found');
        res.send(problem);
    } catch (error) {
        console.log(error);
    }
}

//delete problem
const deleteproblem = async (req, res) => {
    try {
        const problem = await Problem.findByIdAndDelete(req.params.id);
        if (!problem) return res.status(404).send('Problem not found');
        res.status(204).send();
    } catch (error) {
        console.log(error);
    }
}

const runproblem = async (req, res) => {
    const { language = 'cpp', code, input } = req.body;
    if (code === undefined) {
        return res.status(404).json({ success: false, error: "Empty code!" });
    }
    try {
        const filePath = await generateFile(language, code);
        const inputPath = await generateInputFile(input);
        const output = await execute(filePath, inputPath);
        res.json({ filePath, inputPath, output });
    } catch (error) {
        console.log(error);
    }
}




module.exports = {
    updateproblem, addproblem, getproblems, getproblem, deleteproblem, runproblem
}