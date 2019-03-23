DROP DATABASE IF EXISTS socialmedia;
CREATE DATABASE socialmedia;

\c socialmedia;

-- All
-- - id (unqiue)
-- - createdAt
-- - updatedAt

CREATE TABLE users (
id SERIAL PRIMARY KEY,
username VARCHAR NOT NULL, --unique
named VARCHAR NOT NULL,
email VARCHAR NOT NULL,    --unique
avatar VARCHAR );   --the attachment?

CREATE TABLE posts (
id SERIAL PRIMARY KEY,
user_id INT REFERENCES users(id) NOT NULL,
image_url VARCHAR NOT NULL,
caption VARCHAR NOT NULL,
title VARCHAR NOT NULL,
number_of_comments INT NOT NULL);

CREATE TABLE comments(
id SERIAL PRIMARY KEY,
post_id INT REFERENCES posts(id)  NOT NULL,
user_id INT REFERENCES users(id) NOT NULL,
texts VARCHAR NOT NULL);

-- SELECT * FROM Comments WHERE post_id = :id

CREATE TABLE likes(
id SERIAL PRIMARY KEY,
user_id INT REFERENCES users(id) NOT NULL,
post_id INT REFERENCES posts(id)  NOT NULL);

CREATE TABLE followers (
id SERIAL PRIMARY KEY,
person_following_id  INT REFERENCES users(id) NOT NULL, --- person_following_id
person_being_followed_id  INT REFERENCES users(id) NOT NULL); --- person_being_followed_id )


-- SELECT * FROM Followers WHERE person_being_followed = :id

-- /api/posts/feed/:user_id

-- SELECT * FROM Posts WHERE user_id = 1

-- CREATE TABLE notifications(

-- )