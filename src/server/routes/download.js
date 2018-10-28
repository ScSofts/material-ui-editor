var express = require('express');
var router = express.Router();
var fs = require('fs');
var archiver = require('archiver');

/* GET download. */
router.get('/', function(req, res, next) {
  var destFile = __dirname + '/../../../export/testProject.zip';

  // create a file to stream archive data to.
  var output = fs.createWriteStream(destFile);
  var archive = archiver('zip');

  // listen for all archive data to be written
  // 'close' event is fired only when a file descriptor is involved
  output.on('close', function() {
    console.log(archive.pointer() + ' total bytes');
    console.log('archiver has been finalized and the output file descriptor has closed.');

    res.download(destFile);
  });

  // good practice to catch this error explicitly
  archive.on('error', function(err) {
    throw err;
  });

  // pipe archive data to the file
  archive.pipe(output);

  // append files from a sub-directory and naming it `new-subdir` within the archive
  archive.directory(__dirname + '/../../../projects/testProject/', 'testProject');
 
  // finalize the archive (ie we are done appending files but streams have to finish yet)
  // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
  archive.finalize();
});

module.exports = router;
