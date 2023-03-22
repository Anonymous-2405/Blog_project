const express = require('express');
const Blog = require('../models/blog');
const router = express.Router();

router.get('/', (req, res) => {
    Blog.find()
    .then((result) => {
        res.render('index', { title: 'All Blogs', blogs: result })
    })
    .catch((err)  => {
        console.log(err);
    })
})

router.post('/', (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
    .then((result) => {
        res.redirect('/blogs');
    })
    .catch((err)  => {
        console.log(err);
    })
})

router.get('/create',(req, res) => {;
    res.render('create',{title: 'Create'});
 });

router.get('/:id', (req, res) => {
    const id = req.params.id;
    // console.log(id);
    Blog.findById(id)
    .then((result) => {
        res.render('details', {blog: result, title: 'Blog Details'});
    })
    .catch((err)  => {
        console.log(err);
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)

    .then((result) => {
        res.json({ redirect: '/blogs '})
    })
    .catch((err)  => {
        console.log(err);
    })
    
})


module.exports = router;