'use strict';

const express = require('express');
var modRewrite = require('connect-modrewrite');

const PORT = 42301;
const app = express();

app.get('/', function (req, res) {
  res.sendfile('./index.html');
});

app.use(modRewrite([
    '!/api|/assets|\\.html|\\.js|\\.css|\\woff|\\ttf|\\swf$ /index.html'
  ]));

app.use(express.static(__dirname + '/'));
app.get('/', function(req, res) {
	res.render('index');
});

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);