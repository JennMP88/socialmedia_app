const express = require('express');
const usersRouter = express.Router();
const UserService = require('../services/users');

// POST - CREATE USER
usersRouter.post('/register', (req, res, next) => {
  const {username,named,email,avatar} = req.body;
//   const {id} = req.params;
    // console.log(req.body)

    console.log(username)

  UserService.create(username,named,email,avatar)
    .then(data => {
      res.json({success: `Created User named ${named}`});
    })
    .catch(err => {
        console.log(err)
      next(err);
    })
});


// GET - User Login 
usersRouter.get('/login', (req, res, next) => {
  const {named} = req.body;

  UserService.login(named)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    })
});

// Q2 User Profile
// usersRouter.get('/userpost', (req, res, next) => {
//   const {username} = req.body;

//   UserService.login(username)
//     .then(data => {
//       res.json(data);
//     })
//     .catch(err => {
//       next(err);
//     })
// });

// GET - READ 
//Q3--------NEWSFEED

usersRouter.get('/userpost/:id', (req, res, next) => {
  const {id} = req.params;
  // const{username,avatar,number_of_comments,image_url,caption,post_id}=req.body;

  UserService.readPostsFeed(id)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    })
});


//READ A PARTICULAR USER BY NAME 
usersRouter.get('/:username', (req, res, next) => {
  const {username} = req.params;

  UserService.read(username)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    })
});


// // PUT - UPDATE
usersRouter.put('/:id', (req, res, next) => {
  const {username,named,email,avatar} = req.body;
  const {id} = req.params;
  

  UserService.update(id,username,named,email,avatar)
    .then(data => {
      res.json({success: `Updated user named ${named} with id ${id}`});
    console.log(req.body)
    })
    .catch(err => {
      next(err);
    })
});

// DELETE - DELETE
usersRouter.delete('/:id', (req, res, next) => {
  const {id} = req.params;

  UserService.delete(id)
    .then(data => {
      res.json({success: `Deleted user with ID: ${id}`});
    })
    .catch(err => {
      next(err);
    })
});

// ------------------------------------needs more testing
//reads users profile top section only
//-------------------CAN I LINK TO SAME ROUTE......????TUTOR QUESTION 
usersRouter.get('/:userstats', (req, res, next) => {
  const {id} = req.params;

  UserService.readUserStats(id)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    })
});

//bottom part to userprofile
usersRouter.get('/:userstats', (req, res, next) => {
  const {id} = req.params;

  UserService.readUserProfile(id)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    })
});

//bottom part to userprofile but by username 
usersRouter.get('/:userstats', (req, res, next) => {
  const {username} = req.params;

  UserService.readProfile(username)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    })
});

module.exports = usersRouter;