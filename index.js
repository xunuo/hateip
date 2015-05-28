var nodeIP = require('ip'),
    http = require("http"),
    net = require('net'),
    Q = require('q'),
    request = require('request');

var run = function(args){
    
    // sudomain for hateip.com
    var deferred = Q.defer();   // prepare promise callback
        name = args.name,
        ip = args.ip ? args.ip : nodeIP.address(),
        publicIp = args.publicIp,
        withPac = args.withPac,
        pacPort = args.pacPort ? args.pacPort : "1234",
        pacProxyPort = args.pacProxyPort ? args.pacProxyPort : "8888",
        fromBin = args.fromBin
        ;
    
    if(!name || typeof(name) != 'string'){
        var error = {
            error : true,
            message : 'name param missing. need name for hateip.com subdomin.'
        }
        console.log(error.message);
        deferred.reject(error);
        return false;
    }
    
    // register youname.hateip.com
    var registerHateIp = function(){
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
            if(fromBin){
                console.log( name + '.hateip.com » ' + ip + ' \n' + callback.message);
            }
            deferred.resolve(callback);
        })
    };
    
    // If set as public ip
    if(!publicIp){
        
        registerHateIp();
        
    }else{
        
        // Get internet host ip.
        client = net.connect({
            host: 'ns1.dnspod.net',
            port: 6666
        }, function () {
        }).on('data', function (data) {
            ip = data.toString();
            client.end();
        }).on('end', function () {
            registerHateIp();
        }).on('error', function (error) {
            console.log(error);
            deferred.reject(error);
        });
        
    }
    
    // If with PAC
    if(withPac){
        
        http.createServer(function(request, response) {
            
          var output = 'function FindProxyForURL(url, host){return "PROXY ' + name + '.hateip.com:' + pacProxyPort + '; DIRECT";}';
          response.writeHead(200, {"Content-Type": "application/javascript"});
          response.write(output);
          response.end();
        
        }).listen(pacPort);
        
        console.log(' »', 'PAC PATH : http://' + name + '.hateip.com:' + pacPort , '\n »', 'PAC PROXY TO : ' + name + '.hateip.com:' + pacProxyPort );
        
    }
    
    return deferred.promise;

};

module.exports = {
    run : run
};