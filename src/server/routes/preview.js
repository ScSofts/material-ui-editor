const express = require('express');
const router = express.Router();
const proxy = require('express-http-proxy');

router.get('/:port/*', proxy((req) => {
    // dynamically proxy to the port the preview is running
    const port = req.params.port;
    return `http://localhost:${port}/`;
}, {
    proxyReqPathResolver: (req) => {
        // update the path so that it matches the paths in the preview
        // eslint-disable-next-line
        const updatedPath = req.path.replace(/\/[^\/]*/,''); // remove path between the first two slashes

        return updatedPath;
    }
}));

module.exports = router;
