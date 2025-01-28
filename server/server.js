const express = require('express');
const models = require('./models');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./services/auth');
const MongoStore = require('connect-mongo');
const schema = require('./schema/schema');

const app = express();

const MONGO_URI = 'mongodb+srv://goncharova_anastasia:YTVWSdJSLC1yPIUb@cluster0.nxti6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.Promise = global.Promise;

mongoose.set('strictQuery', false);

mongoose.connect(MONGO_URI);
mongoose.connection
  .once('open', () => console.log('Connected to Mongo Atlas instance.'))
  .on('error', (error) =>
    console.log('Error connecting to Mongo Atlas:', error)
  );

app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: 'aaabbbccc',
    store: MongoStore.create({
      mongoUrl: MONGO_URI,
      autoReconnect: true
    })
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
