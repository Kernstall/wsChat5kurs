var srv = require('node-static');
var file = new srv.Server();
require('http').createServer(function(request, response) {
  request.addListener('end', function() {
    console.log('dick');
    file.serve(request, response);
  }).resume();
}).listen(process.env.PORT || 3000);