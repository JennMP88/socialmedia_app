const {db} = require('./dbConnect');
const PostsService = {};

//register to create a new user-post
PostsService.create = (user_id, image_url,caption,title,number_of_comments) => {
  const sql = `INSERT INTO users (user_id, image_url,caption,title,number_of_comments) VALUES ($[user_id], $[image_url], $[caption], $[title],$[number_of_comments])`;
  // console.log(username)
  return db.none(sql, {user_id, image_url,caption,title,number_of_comments});
}

//shows posts by id 
// PostsService.login = (user_id) => {
//   const sql = `
//   SELECT *
//   FROM posts 
//   WHERE user_id = $[user_id]`
//   return db.any(sql, {user_id});
// }


//---------------------------------neeeds more testing
//POST page reads a post 
PostsService.read = (id) => {
` SELECT users.username, users.avatar, posts.number_of_comments,posts.image_url, posts.caption, COUNT(likes.post_id) as number_of_likes
FROM posts
JOIN users ON users.id = posts.user_id
LEFT JOIN likes ON likes.post_id=posts.id
WHERE posts.id= $[id]
GROUP BY users.username, users.avatar, posts.number_of_comments,posts.image_url, posts.caption`
return db.any(sql, {id})};

//bottom part to view post page 
PostsService.read = (id) => {
`SELECT users.username,comments.texts,users.avatar
FROM comments
	JOIN users ON users.id=comments.user_id
  WHERE comments.post_id=$[id]`
return db.any(sql, {id})};



module.exports = PostsService;