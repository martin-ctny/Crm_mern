const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invoiceSchema = new Schema({ 
    amount: Number,
    status: {
        type: String,
        enum: ['send', 'cancel', 'paid']
    }, 
    createdAt: {
        type: Date,
        default: Date.now()
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    }

})

module.exports = mongoose.model('Invoice', invoiceSchema);