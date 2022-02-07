const mongoose = require("mongoose");
const {isEmail} = require('validator') 

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
//fire a function after document is saved
userSchema.post('save',(doc,next)=>{
    console.log('New user was created and saved', doc);
    
    //need to call this callback otherwise further execution will stop
    next();
});

//fire a funtion before doc is saved to db
userSchema.pre('save',function(next){
    //we are using function keyword instead of ()=> becasue we need to use this keyword, which will reference to userSchema, i.e before saving the doc state from schema object
    console.log('User about to be created & saved', this);
    next();
});

const User = mongoose.model('User',userSchema);

module.exports = User;