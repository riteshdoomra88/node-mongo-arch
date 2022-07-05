'use strict'
const mongoose = require('mongoose');
const { Schema } = mongoose;

const Role = new Schema({
    _id: {      
        type: mongoose.Schema.Types.ObjectId,
    },
    role: { 
        type: String,
        required: true
    }
}, { timestamps: true })
module.exports = Role;