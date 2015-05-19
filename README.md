# HateIP

A tool for who hate enter ip everytime.

## Install

```
npm install hateip -g
```

## Usage

- with bin
  
```
hateip --name snow [--ip 127.0.0.1 --with-pac --pac-port 1234 --pac-proxy-port 8888]
```

- with api
  
```
var hateip = require('hateip');
hateip.run({
    name : 'snow',
    ip : '127.0.0.1', // [optional] default binding your local ip.
    withPac : argv['withPac'], // [optional] if start pac server.
    pacPort : argv['pacPort'], // [optional] pac server port, default: 1234.
    pacProxyPort : argv['pacProxyPort'] // [optional] pac proxy port, default: 8888, just like Charles proxy default port.
});
```


> then ping : snow.hateip.com / get pac file : http://snow.hateip.com:1234 / user proxy :  snow.hateip.com:8888