import Problem from "../model/Problem.js";

export const addproblem = async (req, res) => {
    try {
        const {statement,name,code,difficuly}=req.body;
        // save the user in DB
        const existingProblem = await Problem.findOne({ name });
        if(existingProblem){
            res.send("problem exists already")
        }
        const problem = await Problem.create({
            statement,
            name,
            code,
            difficuly,
        });
        res.send(problem);
    } catch (error) {
        console.log(error);
    }
}

export const getproblems = async (req, res) => {
    try {
        const documents = await Problem.find({});
        res.send(documents);
        //console.log(documents.length);
    } catch (error) {
        console.log(error);
    }
}

//get one problem at a time
export const getproblem = async (req, res) => {
    try {
        const {name}=req.body;
        const document = await Problem.findOne({name});
        res.send(document);
        console.log(name);
    } catch (error) {
        console.log(error);
    }
}

//update

