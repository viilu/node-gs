node-gs
=====

NodeJS wrapper for `GhostScript` with the ability to set executable path.

Installation
=====
`npm install https://github.com/sina-masnadi/node-gs/tarball/master`

Usage
=====

    var gs = require('gs');
    gs()
        .batch()
        .nopause()
        .option('-r' + 50 * 2)
        .option('-dDownScaleFactor=2')
        .executablePath('ghostscript/bin/./')
        .device('png16m')
        .output('/tmp/' + fileName + '-%d.png')
        .input('/tmp/' + fileName)
        .exec(function (err, stdout, stderr) {
            if (!err) {
               // no error
            } else {
               // handle errors
            }
        });


API
=====

* `batch`
* `nopause`
* `device` - device - defaults to `txtwrite`
* `output` - file - defaults to `-` which represents stdout
* `option` - you can add any options that is not provided through the functions to the command
* `input` - file
* `executablePath` - path to the Ghostscript executable files (example: ghostscript/bin/./). This can be useful for Lambda functions.
* `exec` - callback
