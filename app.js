const express = require('express');
const graphqlHTTP = require('express-graphql');
const userSchema = require('./src/user/mutation');
const schema = require('./src/schema');

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

var adminRouter = require('./routes/admin.router');
app.use('/admin', adminRouter);

module.exports = app

