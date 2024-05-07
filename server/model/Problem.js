const mongoose=require('mongoose');

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

module.exports = mongoose.model('Problem', problemSchema);