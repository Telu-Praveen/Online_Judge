const Problem = require('../model/Problem.js');
const express = require('express');
const { generateFile, generateInputFile, execute } = require('../controller/file-controller.js')

const addproblem = async (req, res) => {
    try {
        const { statement, input, whoSolved, output, constraints, timelimit, createdBy, testcase, name, code } = req.body;
        // save the user in DB
        const existingProblem = await Problem.findOne({ name });
        if (existingProblem) {
            res.send("problem exists already")
        }
        else {
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
        }
    } catch (error) {
        console.log(error);
    }
}

const getproblems = async (req, res) => {
    try {
        const problems = await Problem.find().select("name _id");
        res.status(200).json({ problems });
    } catch (error) {
        console.log(error);
    }
}

//get one problem at a time
const getproblem = async (req, res) => {
    try {
        const name = req.params.id;
        const email = req.query.email;
        console.log(req.query)
        //console.log(name);
        var code1 = ""
        var language="cpp"
        const find_problem = await Problem.findById(req.params.id);
        if (!find_problem) return res.status(404).send('Problem not found');

        for (var i = 0; i < find_problem.whoSolved.length; i++) {
            if (email == find_problem.whoSolved[i].user) {
                code1 = find_problem.whoSolved[i].code,
                language=find_problem.whoSolved[i].language

            }
        }
        const problem = {
            name: find_problem.name,
            statement: find_problem.statement,
            testcase: find_problem.testcase,
            code: code1,
            language:language,
            constraints: find_problem.constraints
        }
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
        if(filePath==="error"){
            throw errorHandler(500, "Error Compiling Code");
        }
        const inputPath = await generateInputFile(input);

        const output = await execute(filePath, inputPath);
        res.json({ filePath, inputPath, output });
    } catch (error) {
        console.log(error)
        const output=error.message;
        res.status(200).json({output});
       // res.json({ error });
    }
}

const submitproblem = async (req, res) => {
    const { language = 'cpp', code, email } = req.body;
    var input = req.body.input;

    pass = [];
    try {
        var testcase_passed = 0;
        const problem = await Problem.findById(req.params.id);
        for (let i = 0; i < problem.testcase.length; i++) {
            const filePath = await generateFile(language, code);
            const inputPath = await generateInputFile(problem.testcase[i].input);
            var output = await execute(filePath, inputPath);
            output = (String(output)).trim()
            expectedoutput = (String(problem.testcase[i].output)).trim();
            console.log(output + " " + expectedoutput)
            if (output == expectedoutput) {
                testcase_passed++;
                pass.push("Success");
            }
            else {
                pass.push("Fail");
            }
        }
        console.log(pass)
        if (testcase_passed == problem.testcase.length) {
            problem.whoSolved.push({ user: email, code: code ,language:language});
            const updatedProblem = await problem.save();
        }
        res.json({ pass });
    } catch (error) {
        console.log(error);
    }
}




module.exports = {
    updateproblem, addproblem, getproblems, getproblem, deleteproblem, runproblem, submitproblem
}