const {db} = require('./dbConnect');
const FollowService = {};

//followers list:followers?
FollowService.read = (id) => {
    `SELECT users.username
    FROM followers
    JOIN users ON users.id=followers.person_being_followed_id
    WHERE followers.person_following_id=$[id] `
    return db.any(sql, {id})};



    module.exports = FollowService;