const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./squema/squema');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost/db')
mongoose.connection.once('open', () => {
  console.log('conneted to database');
});

// bind express with graphql
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin.router');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);

module.exports = app
