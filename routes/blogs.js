const express = require('express');
const multer = require('multer');
const {blog_index,blog_details,blog_create_get,blog_create_post, blog_delete} = require('../controllers/blog');
const router = express.Router();

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads');
    },
    filename:(req,file,cb)=>{
        cb(null,new Date().toISOString().replace(/:/g, '-')+file.originalname);
    }
});
const upload = multer({storage})

// blog route
router.get('/',blog_index)
router.post('/',upload.single('notes'),blog_create_post);
router.get('/create',blog_create_get);
router.get('/:id',blog_details)
router.delete('/:id',blog_delete)

module.exports = router;