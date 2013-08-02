var express = require('express');
var webmake = require('webmake');

var app = express();

app.use(express.static(__dirname));

app.get('/bundle.js', function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'application/javascript; charset=utf-8',
        'Cache-Control': 'no-cache'
    });

    webmake('main.js', { cache: true }, function (err, content) {
        if (err) {
            res.end('document.write(' + JSON.stringify(err.message) + ');');
        } else {
            res.end(content);
        }
    });
});

app.listen(3003);