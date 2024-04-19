var spawn = require('child_process').spawn;

function gs() {
    return {
        "options":        [],
        "_input":         null,
        "excPath":        '',
        "option":         function (option) {
            this.options.push(option);
            return this;
        },
        "executablePath": function (path) {
            this.excPath = path;
            return this;
        },
        "batch":          function () {
            this.options.push('-dBATCH');
            return this;
        },
        "diskfonts":      function () {
            this.options.push('-dDISKFONTS');
            return this;
        },
        "nobind":         function () {
            this.options.push('-dNOBIND');
            return this;
        },
        "nocache":        function () {
            this.options.push('-dNOCACHE');
            return this;
        },
        "nodisplay":      function () {
            this.options.push('-dNODISPLAY');
            return this;
        },
        "nopause":        function () {
            this.options.push('-dNOPAUSE');
            return this;
        },
        "define":         function (key, val) {
            this.options.push('-d' + key + (val ? '=' + val : ''));
            return this;
        },
        "device":         function (dev) {
            dev = dev || 'txtwrite';
            this.options.push('-sDEVICE=' + dev);
            return this;
        },
        "input":          function (file) {
            this._input = file;
            return this;
        },
        "output":         function (file) {
            file = file || '-';
            this.options.push('-sOutputFile=' + file);
            if (file === '-') return this.q();
            return this;
        },
        "q":              function () {
            this.options.push('-q');
            return this;
        },
        "p":              function () {
            this.options.push('-p');
            return this;
        },
        "papersize":      function (size) {
            this.options.push('-sPAPERSIZE=' + size);
            return this;
        },
        "res":            function (xres, yres) {
            this.options.push('-r' + xres + (yres ? 'x' + yres : ''));
            return this;
        },
        "safer":          function () {
            this.options.push('-dSAFER');
            return this;
        },
        "exec":           function (cb, stdOutCallback) {
            var self = this;
            if (!this._input) return cb.call(self, 'No input specified');

            console.log('gs command: ' + this.options.concat([this._input]));

            if (this.excPath) {
                var proc = spawn(this.excPath, this.options.concat([this._input]));
            } else {
                var proc = spawn('gs', this.options.concat([this._input]));
            }            

            proc.stdin.on('error', cb);
            proc.stdout.on('error', cb);

            var _data      = [];
            var totalBytes = 0;
            proc.stdout.on('data', function (data) {
                totalBytes += data.length;
                _data.push(data);

                if (stdOutCallback) {
                    stdOutCallback(data)
                }
            });
            proc.on('close', function () {
                var buf = Buffer.concat(_data, totalBytes);

                return cb.call(self, null, buf.toString());
            });
            process.on('exit', function () {
                proc.kill();
            });
        }
    };
}

module.exports = exports = gs;
