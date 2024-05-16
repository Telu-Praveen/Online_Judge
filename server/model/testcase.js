const mongoose=require('mongoose');

const testcaseSchema = new mongoose.Schema({
    testcase: {
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

module.exports = mongoose.model('Problem', testcaseSchema);