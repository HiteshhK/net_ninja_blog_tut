const {Router} = require('express');
const {
    signup_page,
    login_page,
    signup_post,
    login_post,
} = require('../controllers/auth');
const authRouter = Router();

authRouter.get('/signup',signup_page);
authRouter.post('/signup',signup_post);
authRouter.get('/login',login_page);
authRouter.post('/login',login_post);

module.exports =authRouter;