var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var employeeSchema = new Schema({
    firstName :{
        type: String,
        unique : false,
        required : true
    },
    lastName : {
        type: String,
        unique : false,
        required : true
    },
    email : {
        type: String,
        unique : false,
        required : true
    },
    dateOfBirth : {
        type: Date,
        unique : false,
        required : true
    },
    salary : {
        type: Number,
        unique : false,
        required : true
    },
    department : {
        type: String,
        unique : false,
        required : true
    },
    country : {
        type: String,
        unique : false,
        required : true
    }
}, {
    timestamps: true
});

module.exports = employeeSchema;