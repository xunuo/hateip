var nodeIP = require('ip'),
    http = require("http"),
    request = require('request');

var run = function(args){

    // sudomain for hateip.com
    var name = args.name,
        ip = args.ip ? args.ip : nodeIP.address(),
        withPac = args.withPac,
        pacPort = args.pacPort ? args.pacPort : "1234",
        pacProxyPort = args.pacProxyPort ? args.pacProxyPort : "8888"
        ;
    

    if(!name || typeof(name) != 'string'){
        console.log('name param missing. need name for hateip.com subdomin.');
        return false;
    }
    
    var rand = Math.floor(Math.random()*100000000).toString(),
        getOptions = {
            url: 'http://hateip.com:999/',
            json: true,
            qs: {
                name: name,
                ip: ip,
                rand: rand
            }
        }
    
    request.get(getOptions, function (error, response, callback) {
        console.log(' »', callback.msg);
    })
    
    if(withPac){
        
        http.createServer(function(request, response) {
            
          var output = 'function FindProxyForURL(url, host){return "PROXY ' + name + '.hateip.com:' + pacProxyPort + '; DIRECT";}';
          response.writeHead(200, {"Content-Type": "application/javascript"});
          response.write(output);
          response.end();
        
        }).listen(pacPort);
        
        console.log(' »', 'PAC PATH : http://' + name + '.hateip.com:' + pacPort , '\n »', 'PAC PROXY TO : ' + name + '.hateip.com:' + pacProxyPort );
        
    }

};

module.exports = {
    run : run
};