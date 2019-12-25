const Express = require('express');
const Cors = require('cors');

const app = Express();
const port = 3129;

app.use(Cors());
app.use(Express.urlencoded({ extended: false }));
app.use(Express.json());

const usersRouter = require('./Routes/UsersRouter');
app.use('/users', usersRouter);

const postsRouter = require('./Routes/PostsRouter');
app.use('/posts', postsRouter);

const albumsRouter = require('./Routes/AlbumsRouter');
app.use('/albums', albumsRouter);

const picturesRouter = require('./Routes/PicturesRouter');
app.use('/pictures', picturesRouter);

const commentsRouter = require('./Routes/CommentsRouter');
app.use('/comments', commentsRouter);

const likesRouter = require('./Routes/LikesRouter');
app.use('/likes', likesRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});