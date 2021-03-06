const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');

const requestHandle = require('./controller');

const users = require('./db/tables/users');
const questions = require('./db/tables/questions');
const answers = require('./db/tables/answers');
const childAnswers = require('./db/tables/child_answers');
const tags = require('./db/tables/tags');
const q_tag = require('./db/tables/q_tag');
const q_user = require('./db/tables/q_user');
const posts = require('./db/tables/posts');
const replies = require('./db/tables/replies');
const a_user = require('./db/tables/a_user');

const app = express();

dotenv.config();

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());
app.use(fileUpload());
app.use('/', express.static(path.join(__dirname, '/public/build')));
app.use('/image', express.static(path.join(__dirname, '/public/image/profile')));
requestHandle(app);
app.get('*', function(req, res) {
  console.log('hahahahgagagagag');
  res.sendFile(path.resolve(__dirname, 'public/build/index.html'));
});


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3001);
console.log('listening, 3001');
