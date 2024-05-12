const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    statement: { type: String },
    input: { type: String },
    whoSolved: [{ type: String }],
    output: { type: String },
    constraints: { type: String },
    timelimit: { type: Number, default: 5.0 },
    statement: { type: String, required: true },
    createdBy: { type: String},
    testcase: [
        {
            input: { type: String },
            output: { type: String },
        },
    ],
},
    { timestamps: true }
);

module.exports = mongoose.model('Problem', problemSchema);