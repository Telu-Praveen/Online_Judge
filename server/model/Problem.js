import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
    statement: {
        type: String,
        default: null,
    },
    name: {
        type: String,
        unique:true,
        default: null,
    },
    code: {
        type: String,
        default: null,
    },
    difficulty: {
        type: String,
    },
});

const Problem = mongoose.model('Problem', problemSchema);

export default Problem;