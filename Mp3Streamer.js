/**
 * Created with JetBrains RubyMine.
 * User: SaberMacbook
 * Date: 5/2/14
 * Time: 10:36 PM
 * To change this template use File | Settings | File Templates.
 */

var http = require('http')
    , fs = require('fs')
    , request = require('request')
    , url = require('url')
    , util = require('util');
    ;

var server = http.createServer(function (req, res) {

    //test: http://localhost:8000/?link=http://tinyurl.com/nkfjunx
    var parsedUrl = url.parse(req.url, true);
    var queryAsObject = parsedUrl.query;
    var link = queryAsObject["link"];
//    console.log(link);
    var range = req.headers.range;
    var parts = range.replace(/bytes=/, "").split("-");
    var partialstart = parts[0];
    var partialend = parts[1];

    if (partialstart > 0) {
        console.log('Starting at seeked position...');

        var start = parseInt(partialstart, 10);
        var end = parseInt(partialend, 10);
        var chunksize = (end-start)+1;

        var stream = request(link);
        stream.on( 'response', function ( data ) {
            end =  parseInt(data.headers[ 'content-length' ], 10) - 1;
            chunksize = (end-start)+1;
            res.writeHead(206, { 'Content-Range': 'bytes ' + start + '-' + end + '/' + end, 'Accept-Ranges': 'bytes', 'Content-Length': chunksize, 'Content-Type': 'audio/mp3' });
            stream.pipe(res, {start: start, end: end});
        } );
    }
    else{
        console.log('Starting at beginning position...');
        var stream = request(link);

        stream.pipe(res);
    }




});
server.listen(8000);
