const mongoose = require('mongoose');
const User = require('./User');
const Schema = mongoose.Schema;

const customerSchema = new Schema({ 
    firstName: String, 
    lastName: String,
    invoices: [{
        type: Schema.Types.ObjectId,
        ref: 'Invoice'
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Customer', customerSchema);