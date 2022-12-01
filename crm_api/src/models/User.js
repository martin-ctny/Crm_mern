const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({ 
    firstName:{
        type: String,
        required: true,
        min: 2,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase : true,
        trim: true    
    }, 
    password: {
        type: String,
        required: true,
        min: 6
    },
    customers: [{
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    }],

})
userSchema.pre('save', async function(next){
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
})

module.exports = mongoose.model('user', userSchema);