const mongoose = require('mongoose')

const boardSchema = new mongoose.Schema({

    Owner:{ type:Array, require: true},
    name:{ type: String, require:true},
    isActive:{ type:Boolean, require:true},
    columns:{ type: Array, require:true},
})

const Board = mongoose.model('Board', boardSchema)

module.exports = Board