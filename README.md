# HateIP

HateIP is a DDNS serve for who hate enter ip everytime.

Auto get your Local/Public IP address and association with the domain : {name}.hateip.com




## Usage

- with gulp

    [gulp-hateip](https://www.npmjs.com/package/gulp-hateip)


- with bin

### Install

```
npm install hateip -g
```
  
```
hateip --name snow [ [--ip 127.0.0.1] [--public-ip true] [--with-pac --pac-port 1234 --pac-proxy-port 8888] ]
```

- with bin & nohup

```
## start
nohup hateip --name snow --with-pac >> ./hateip.log &
# wait a moment
cat ./hateip.log
```

```
## stop
jobs -l
kill %id
rm ./hateip.log
```

- with api
    
### Install

```
npm install hateip
```

```
var hateip = require('hateip');
hateip.run({
    name : 'snow'
    // ip : '127.0.0.1', // [optional] default binding your local ip.
    // publicIp : true, // [optional] if set as public ip.
    // withPac : true, // [optional] if start pac server.
    // pacPort : 1234, // [optional] pac server port, default: 1234.
    // pacProxyPort : 8888 // [optional] pac proxy port, default: 8888, just like Charles proxy default port.
}).then(
function(res){
    console.log(res);
},
function(error){
    console.log(error);
}
);

```

---

> Then you can :  
>> Ping : snow.hateip.com  
>> Get pac file : http://snow.hateip.com:1234  
>> Use proxy by :  snow.hateip.com:8888  
