const express = require('express');
const postsRouter = express.Router();
const PostsService = require('../services/posts');

// POST - CREATE USER
postsRouter.post('/posts', (req, res, next) => {
  const {user_id, image_url,caption,title,number_of_comments} = req.body;
  //   const {id} = req.params;
    // console.log(req.body)

PostsService.create(user_id, image_url,caption,title,number_of_comments)
    .then(data => {
      res.json({success: `${user_id} created a post.`});
    })
    .catch(err => {
      next(err);
    })
});



//------------------------------needs more testing
//POST page reads a post
postsRouter.get('/posts', (req, res, next) => {
  const {id} = req.body;
  //   const {id} = req.params;
    // console.log(req.body)

PostsService.read(id)
    .then(data => {
      res.json({success: `${id} created a post.`});
    })
    .catch(err => {
      next(err);
    })
});

//bottom part to view post page
postsRouter.get('/posts', (req, res, next) => {
  const {id} = req.body;
  //   const {id} = req.params;
    // console.log(req.body)

PostsService.reads(id)
    .then(data => {
      res.json({success: `${id} created a post.`});
    })
    .catch(err => {
      next(err);
    })
});


module.exports = postsRouter;

