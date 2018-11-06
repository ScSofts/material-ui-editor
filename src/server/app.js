var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var projectsRouter = require('./routes/projects');
var previewRouter = require('./routes/preview');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static('dist'));
app.use('/api/projects', projectsRouter);
app.use('/api/preview', previewRouter);

// next parameter is required eventhough it is not used
// eslint-disable-next-line
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
});

module.exports = app;
