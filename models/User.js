const mongoose = require("mongoose");
const {isEmail} = require('validator') 
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required:[true,'Please enter an email'],
        unique:true,
        lowercase:true,
        validate:[isEmail,'Please enter a valid email']
    },
    password:{
        type: String,
        required:[true,'Please enter a password'],
        minlength:[6,'minimum password length is 6 characters'],
    },
});

/** Hooks, function that runs before/after the document operation is performed */
//fire a funtion before doc is saved to db
userSchema.pre('save',async function(next){
    //generate a salt to be appended to password
    const salt = await bcrypt.genSalt();
    // pass salt+password to generate a new hashcode and make new password
    this.password = await bcrypt.hash(this.password,salt);

    next();
});

const User = mongoose.model('User',userSchema);

module.exports = User;