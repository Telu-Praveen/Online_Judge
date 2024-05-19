const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true,
    },
    input: { type: String },
    whoSolved: [
        { 
            user: { type: String },
            code: { type: String },
            language:{type:String}
         }
        ],
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