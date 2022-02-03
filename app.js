const express= require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogs');

// express app (creating an instance of express app)
const app = express();

//connect-to mongodb
const dbURI =`mongodb+srv://<username>:password@node-tuts.ulgkb.mongodb.net/node-blog-tuts?retryWrites=true&w=majority`;

mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true})
.then((result)=> {
    //listen for request only after connected to db
    app.listen(3000);})
.catch((err)=> console.log({err}));

//register view engine for templating, by default express look into views folder
app.set('view engine','ejs');

//listen for request
// app.listen(3000);

//middleware for static file, so that browser allow them
app.use(express.static('public'));

//takes url encoded data and pass it into an object, (req.body) that we can use, for example: form data from create form
app.use(express.urlencoded({extended:true}));

//listen for request
app.use(morgan('dev'));

//routes
app.get('/',(req,res)=>{
   
    res.redirect('/blogs');    
});

app.get('/about',(req,res)=>{

    res.render('about',{title:'About'});    
});

//blog routes
app.use('/blogs',blogRoutes);

//404 page( if request does not match any above get handler it will execute below code)
app.use((req,res)=>{
    res.status(404).render('404',{title:'404'});
})