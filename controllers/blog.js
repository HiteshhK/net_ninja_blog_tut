//blog_indes, blog_details, blog_create_get, blog_create_post, blog_delete
const Blog = require('../models/blog');

const blog_index=(req,res)=>{
    Blog.find().sort({createdAt:-1})
    .then((blogs)=>{
        res.render('index',{title:'All Blogs',blogs})
    }).catch(err=> console.log(err));
}

const blog_details = (req,res)=>{
    const id = req.params.id;
    Blog.findById(id)
    .then(blog=>{
        res.render('details',{blog,title:'Blog details'})
    }).catch(err=> res.render('404',{title:'Blog not found'}));
}

const blog_create_get = (req,res)=>{
    res.render('create',{title:'create new blog'});
}

const blog_create_post =(req,res)=>{
    const body = {...req.body,notes:req.file.path}
    const blog  = new Blog(body);

    blog.save().then(result=>{
        res.redirect('/blogs');
    }).catch(err=> console.log(err));
}

const blog_delete = (req,res)=>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id).then(result=>{
        res.json({redirect:'/blogs'})
    }).catch(err=> console.log(err));
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete,
}