var express = require('express');
var router = express.Router();
var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './import')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  });
var upload = multer({ storage: storage });

/* POST upload. */
router.post('/', upload.single('project'), (req, res, next) => {
    var file = req.file.filename;
    console.log(req.file);
});

module.exports = router;