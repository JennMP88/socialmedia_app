const {db} = require('./dbConnect');
const UserService = {};

//register to create a new user-p1
UserService.create = (username,named,email,avatar) => {
  const sql = "INSERT INTO users (username,named,email,avatar) VALUES (${username}, ${named}, ${email}, ${avatar})";
  console.log(username)
  return db.none(sql, {username,named,email,avatar});
}

//login user -p1
UserService.login = (named) => {
  const sql = `
  SELECT *
  FROM users
  WHERE named = $[named]`
  return db.any(sql, {named});
}

// Q2 User Profile -- Users + Posts + followers table
// UserService.readPosts = (username,avatar,image_url,person_being_followed_id,person_following_id) => {
//   const sql = `
//   SELECT users.username, users.avatar, posts.image_url, followers.person_following_id, person_being_followed_id 
//   FROM users, posts, followers
//   WHERE users.id = ${id} `
//   return db.any(sql, {id});
// }

//READ THE USER STUFF 
// News feed -- 
UserService.readPostsFeed = (id) => {
  const sql = `
 SELECT users.username, users.avatar, posts.number_of_comments,posts.image_url, posts.caption, COUNT(likes.post_id) as number_of_likes
 FROM users
 JOIN posts ON users.id = posts.user_id
 LEFT JOIN likes ON likes.post_id=posts.id
 WHERE users.id= ${id}
 GROUP BY users.username, users.avatar, posts.number_of_comments,posts.image_url, posts.caption`
  return db.any(sql, {id});
}


// View Post -- (When you Click an image) posts table


//READ A PARTICULAR USER by NAME
UserService.read = (username) => {
  const sql = `
  SELECT users.username
  FROM users
  WHERE users.username = $[username] `
  return db.any(sql, {username});
}

//PUT-USER UPDATE 
UserService.update = (id,username,named,email,avatar) => {
  const sql = `
  UPDATE users
  SET
    username=$[username],
    named=$[named], 
    email=$[email],
    avatar=$[avatar]
  WHERE
    id=${id}
  `;
 
  return db.none(sql, {id,username,named,email,avatar});
}






//DELETE A USER
UserService.delete = (id) => {
  const sql = `
  DELETE FROM users WHERE id=$[id]
  `;
  return db.none(sql, {id});
}

// -----------------------------------needs more testing
//---reads top section of user profile

UserService.readUserStats=(id)=>{
const sql=`
SELECT users.username, users.avatar,COUNT(being_followed.person_being_followed_id) as followers, COUNT(follows.person_being_followed_id) as following
	FROM users
	LEFT JOIN followers follows ON users.id=follows.person_following_id 
	LEFT JOIN followers being_followed ON users.id=being_followed.person_being_followed_id
	WHERE users.id=$[id]
GROUP BY users.username, users.avatar`;
return db.any(sql,{id})}


//bottom part to user profile
UserService.readUserProfile=(id)=>{
  const sql=
`SELECT posts.image_url 
	FROM posts
  WHERE posts.user_id=$[id]`;
  
  return db.any(sql,{id})}

  //bottom part to userprofile but by username 
  UserService.readProfile=(username)=>{
    const sql=
  `SELECT posts.image_url 
	FROM posts
	JOIN users a ON posts.user_id=a.id  
  WHERE username=$[username]`
  return db.any(sql,{username})}
  
module.exports = UserService;