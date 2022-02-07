const User= require('../models/User');

// handle errors
const handleErrors = (err) => {
    let errors = { email: '', password: '' };
  
    // duplicate email error
    if (err.code === 11000) {
      errors.email = 'that email is already registered';
      return errors;
    }
  
    // validation errors
    if (err.message.includes('user validation failed')) {
      Object.values(err.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
      });
    }
    return errors;
  }
  

const signup_page=(req,res)=>{
  res.render('signup',{title:'user registration'})
};

const login_page=(req,res)=>{
    res.render('login',{title:'login'})
  };

const signup_post = async(req,res)=>{
    const { email, password } = req.body;
  try {
    const user = await User.create({ email, password });
    res.status(201).json(user);
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
}

const login_post = (req,res)=>{
    res.send('new login');
}
module.exports = {
    signup_page,
    login_page,
    signup_post,
    login_post,
}