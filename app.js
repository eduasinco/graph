const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./src/schema');
const bodyParser = require("body-parser");
const sessions = require("client-sessions");
const auth = require("./auth");

const settings = require("./settings");

const adminRouter = require('./routes/admin.router');
const userRouter = require('./routes/user');
const foodPostRouter = require('./routes/foodPost');

const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost/db')
mongoose.connection.once('open', () => {
  console.log('conneted to database');
});

app.use(sessions({
  cookieName: "session",
  secret: settings.SESSION_SECRET_KEY,
  duration: settings.SESSION_DURATION,
  activeDuration: settings.SESSION_EXTENSION_DURATION,
  cookie: {
    httpOnly: true,
    ephemeral: settings.SESSION_EPHEMERAL_COOKIES,
    secure: settings.SESSION_SECURE_COOKIES
  }
}));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
// app.use(csurf());
app.use(auth.loadUserFromSession);

app.use('/admin', adminRouter);
app.use('/user', userRouter);
// app.use(auth.loginRequired)
app.use('/food', foodPostRouter);
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

module.exports = app