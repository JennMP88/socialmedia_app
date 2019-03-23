const bodyParser=require('body-parser');
const express =require ('express')
const app= express()
const port = 3000;

//define routes
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const followerRouter = require('./routes/follower');

// const followersRouter = require('./routes/followers');
// const commmentsRouter = require('./routes/comments');

// MIDDLEWARE NEEDED?
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


//routes
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/follower', followerRouter);
// app.use('/followers', followersRouter);
// app.use('/comments', commmentsRouter);

app.use((err, req, res, next) => {
    res.status(400).json({error: err.toString()});
});

app.listen(port, ()=>{
    console.log(`listening at port ${port}`)
} )