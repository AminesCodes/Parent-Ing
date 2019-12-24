DROP DATABASE IF EXISTS parent_ing;

CREATE DATABASE parent_ing;

\c parent_ing;

-- USERS TABLE:
CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    username VARCHAR NOT NULL,
    firstname VARCHAR NOT NULL,
    lastname VARCHAR NOT NULL,
    dob DATE NOT NULL,
    email VARCHAR NOT NULL,
    user_password VARCHAR NOT NULL,
    signing_date DATE NOT NULL DEFAULT CURRENT_DATE
);


-- CATEGORIES TABLE:
CREATE TABLE categories
(
    id SERIAL PRIMARY KEY,
    category VARCHAR UNIQUE NOT NULL
)


-- POSTS TABLE:
CREATE TABLE posts
(
    id SERIAL PRIMARY KEY,
    poster_id VARCHAR REFERENCES users (id) ON DELETE CASCADE,
    category_id INT REFERENCES categories (id) ON DELETE CASCADE,
    body VARCHAR NOT NULL,
    posting_date DATE NOT NULL DEFAULT CURRENT_DATE
);


-- ALBUMS TABLE:
CREATE TABLE albums
(
    id SERIAL PRIMARY KEY,
    album_name VARCHAR,
    owner_id VARCHAR REFERENCES users (id) ON DELETE CASCADE,
    album_category INT REFERENCES categories (id) ON DELETE CASCADE,
    album_date DATE NOT NULL DEFAULT CURRENT_DATE
);


-- PICTURES TABLE
CREATE TABLE pictures
(
    id SERIAL PRIMARY KEY,
    album_id INT REFERENCES albums (id) ON DELETE CASCADE,
    picture_link VARCHAR NOT NULL,
    picture_date DATE NOT NULL DEFAULT CURRENT_DATE
);


-- COMMENTS TABLE:
CREATE TABLE comments
(
    id SERIAL PRIMARY KEY,
    author_id VARCHAR REFERENCES users (id) ON DELETE CASCADE,
    post_id INT REFERENCES posts (id) ON DELETE CASCADE,
    picture_id INT REFERENCES pictures (id) ON DELETE CASCADE,
    comment TEXT,
    comment_date DATE NOT NULL DEFAULT CURRENT_DATE
);


-- LIKES TABLE:
CREATE TABLE likes
(
    id SERIAL PRIMARY KEY,
    liker_id VARCHAR REFERENCES users (id) ON DELETE CASCADE,
    post_id INT REFERENCES posts (id) ON DELETE CASCADE,
    picture_id INT REFERENCES pictures (id) ON DELETE CASCADE
);

-- ##############################################################
-- SEEDING SOME DATA

INSERT INTO users
    (username, firstname, lastname, dob, user_password, email)
VALUES
    ('vonbar', 'Voniel', 'Brown', '1995-08-23', '123', 'voniel@vonbar.com'),
    ('aminescodes', 'Amine', 'Bensalem', '1983-06-14', '456', 'amine.ben@codes.com'),
    ('sergiocohens', 'Sergio', 'Cohen-Salama', '1987-04-10', '789', 'sergio@salama.com'),
    ('jenama', 'Johanne', 'Enama', '1991-03-15', '1011', 'johane@jenama.com');


INSERT INTO categories 
    (category)
VALUES
    ('newborn'),
    ('baby'),
    ('toddler'),
    ('kid'),
    ('teenager');


INSERT INTO posts
    (poster_id, category_id, body)
VALUES
    (2, 1,'some good memories about when my son was born'),
    (2, 2,'it was a pleasure taking care of my son when a baby'),
    (2, 3,'now it\''s getting harder and harder, the more he grows and the less he listen to what we say'),
    (1, 1,'some good memories my niece'),
    (1, 2,'troubles on the sight'),
    (1, 3,'cuties'),
    (3, 2,'it\''the parents start to have full nights of sleep... hopefully'),
    (3, 3,'potty training time'),
    (3, 4,'my daughter is almost in the age of going to school'),
    (4, 2,'toddler toddler toddler... many nieces and nephewes'),
    (4, 3,'they are so cute on that age (kids)'),
    (4, 4,'try to deal with a teenager!!!');


-- INSERT INTO comments
--     (author_id, post_id, comment)
-- VALUES
--     (, 1, 'Better late then never'),
--     ('jenama', 2, 'cute creatures'),
--     ('aminescodes', 2, 'yeah, unless they are a ninja one'),
--     ('vonbar', 5, 'Go fot it!!'),
--     ('vonbar', 8, 'Interesting point of view');


INSERT INTO albums
    (album_name, owner_id, category_id)
VALUES
    ('Kids', 4, 3),
    ('teen', 4, 4),
    ('newB', 3, 1),
    ('babies', 3, 2),
    ('Kids Kids', 2, 3),
    ('welcome to this crazy world', 2, 1),
    ('tody', 1, 2),
    ('Kidzy kid', 1, 3);


INSERT INTO pictures
    (album_id, picture_link)
VALUES
    (1, 'https://cdn.tinybuddha.com/wp-content/uploads/2015/10/Having-Fun.png'),
    (1, 'https://image.freepik.com/free-vector/cute-happy-kids-having-fun-cartoons_18591-60558.jpg'),
    (2, 'https://ichef.bbci.co.uk/images/ic/800xn/p07gq3kw.jpg'),
    (2, 'https://www.bensound.com/bensound-img/happyrock.jpg'),
    (3, 'http://www.imfdb.org/images/thumb/6/61/Vampire_knight_poster.jpg/301px-Vampire_knight_poster.jpg'),
    (3, 'http://otakurevolution.com/storyimgs/juukuchi/Escaflowne/vlcsnap-2016-04-09-15h39m02s69.png'),
    (4, 'https://image.shutterstock.com/image-vector/sea-turtle-cartoon-260nw-701671366.jpg'),
    (4, 'https://i.pinimg.com/originals/56/5a/f5/565af5258e27b98b07c31a594b880534.jpg'),
    (5, 'https://www.pop-culture.biz/images17/0737CABF.jpg'),
    (5, 'https://pbs.twimg.com/profile_images/884528226630086657/LNt9G3HJ_400x400.jpg');



-- INSERT INTO comments
--     (author_id, picture_id, comment)
-- VALUES
--     ('aminescodes', 1, 'Amine Comment on Johanne album1 picture1'),
--     ('sergiocohens', 2, 'Sergio Comment on Johanne album1 picture2'),
--     ('jenama', 3, 'Johanne Comment Sergio on album1 picture1'),
--     ('jenama', 4, 'Johanne Comment Sergio on album1 picture2'),
--     ('vonbar', 5, 'VonielComment on Amin album1 picture1'),
--     ('sergiocohens', 6, 'Sergio Comment Amin on album1 picture2'),
--     ('vonbar', 7, 'Voniel Comment on Voniel album1 picture1'),
--     ('jenama', 8, 'Johanne Comment on Voniel album1 picture2'),
--     ('vonbar', 9, 'Voniel Comment on Amin album2 picture1'),
--     ('sergiocohens', 7, 'Sergio Comment on Voniel album1 picture1');


-- INSERT INTO likes
--     (liker_username, post_id)
-- VALUES
--     ('jenama', 1),
--     ('jenama', 2),
--     ('jenama', 3),
--     ('jenama', 4),
--     ('sergiocohens', 2),
--     ('sergiocohens', 4),
--     ('sergiocohens', 5),
--     ('sergiocohens', 6);


-- INSERT INTO likes
--     (liker_username, picture_id)
-- VALUES
--     ('aminescodes', 1),
--     ('aminescodes', 2),
--     ('aminescodes', 3),
--     ('aminescodes', 7),
--     ('vonbar', 1),
--     ('vonbar', 2),
--     ('vonbar', 3),
--     ('vonbar', 4);