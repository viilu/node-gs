node-gs
=====

NodeJS wrapper for `GhostScript` with the ability to set executable path in order to use with services like `AWS Lambda`.

Installation
=====
`npm install https://github.com/sina-masnadi/node-gs/tarball/master`

or

    "dependencies": {
        "gs": "https://github.com/sina-masnadi/node-gs/tarball/master"
    }

Usage
=====
To set the executable path you can use:
`executablePath('ghostscript/bin/./gs')`

A compiled version of GhostScript (v9.20) for AWS Lambda can be find here:
https://github.com/sina-masnadi/lambda-ghostscript


Sample usage:

    var gs = require('gs');
    gs()
        .batch()
        .nopause()
        .option('-r' + 50 * 2)
        .option('-dDownScaleFactor=2')
        .executablePath('ghostscript/bin/./gs')
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


# License

MIT - http://ncb000gt.mit-license.org/
