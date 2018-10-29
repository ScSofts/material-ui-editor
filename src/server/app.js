var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var projectsRouter = require('./routes/projects');
var uploadRouter = require('./routes/upload');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static('dist'));
app.use('/api/projects', projectsRouter);
app.use('/api/upload', uploadRouter);

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
});

module.exports = app;
