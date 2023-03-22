const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

//express app
const app = express();

const dbURI = 'mongodb+srv://anonymous1803:vinod1803@lifters.t5ibjad.mongodb.net/lifters?retryWrites=true&w=majority'
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
 .then((result) => app.listen(3000))
 .catch((err) => console.log('error connecting to db'))

// register view engine
app.set('view engine', 'ejs');

//listen for requests


//middleware and static files
app.use(express.urlencoded({ extended: true}));

// app.use(express.static('public'))

app.use(morgan('tiny'));

// app.get('/add-blog', (req, res) => {
//     const blog = new Blog({
//         title: 'binod',
//         snippet: 'new blog content',
//         body: 'more about my blog'
//     });

//     blog.save()
//     .then((result) => {
//         res.send(result)
//     })
//     .catch((err)  => {
//         console.log(err)
//     })
// })

// app.get('/all-blogs', (req, res) => {
//     Blog.find()
//     .then((result) => {
//         res.send(result);
//     })
//     .catch((err)  => {
//         console.log(err);
//     })
// })

// app.get('/single-blog', (req, res) => {
//     Blog.findById('641ad37be5eec6db9dc7d3d3')
//     .then((result) => {
//         res.send(result);
//     })
//     .catch((err)  => {
//         console.log(err);
//     })
// })
// app.use((req, res, next) => {
//     console.log('New request made:');
//     console.log('method: ',req.method);
//     console.log('url: ', req.url);
//     console.log('host: ', req.hostname)
//     console.log('path: ', req.path);
//     next();
// });
// app.use((req, res,next) => {
//     console.log('In the next middleware:');
//     next();
// });

// routes

app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    // res.send('<p>about page</p>');
    res.render('about',{title: 'About'});
});

// blog routes
app.use('/blogs',blogRoutes);


    // 404 page
// app.get('/error', (req, res) => {
//     // res.send('<p>404 page</p>');
// });

app.use((req, res) => {
    res.status(404).render('404',{title: '404'});
});