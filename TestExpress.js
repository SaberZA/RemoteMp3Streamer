/**
 * Created with JetBrains RubyMine.
 * User: SaberMacbook
 * Date: 5/2/14
 * Time: 11:19 PM
 * To change this template use File | Settings | File Templates.
 */

var express = require('express');
var request = require('request');
var app = express();

app.get('/id/:id', function(req, res){
    var url = req.params.id;
    console.log(url);
    var stream = request(url);
    stream.pipe(res);
});

app.listen(3000);