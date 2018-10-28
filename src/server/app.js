var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var downloadRouter = require('./routes/download');
var uploadRouter = require('./routes/upload');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static('dist'));
app.use('/api/download', downloadRouter);
app.use('/api/upload', uploadRouter);

module.exports = app;
