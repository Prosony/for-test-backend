var express = require('express');
var http = require('http');
var path = require('path');
var request = require('request');
// var options = require('./options/options.js');

var app = express();
var port = 3000;

var id_account;
var token;
app.use(express.static(path.join(__dirname, 'view')));

app.get('/sign-in',function(request, responce){
    responce.sendFile(path.join(__dirname,'/view/sign-in.html'));
});

app.post('/check', function(request, responce){
    // console.log('request',request);
    request.on('data', function (data) {
        var answer = JSON.parse(data);
        id_account = answer.id;
        token = answer.token;
        var opt = {
            hostname: 'localhost',
            port: 8080,
            path: '/profile',
            method: 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
        };
        const req = http.request(opt, (res) => {
            console.log(`STATUS: ${res.statusCode}`);
            console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
              console.log(`BODY: ${chunk}`);
            });
            res.on('end', () => {
              console.log('No more data in response.');
            });
          });
          
          req.on('error', (e) => {
            console.error(`problem with request: ${e.message}`);
          });
          
          // write data to request body
          req.write(JSON.stringify({'token':token}));
          req.end();
    });
        // console.log('#INFO address: %s',request.url);
        // console.log('id_account %s, token: %s',id_account,token);

        // if(id_account.trim() && token.trim()){
        //     console.log('token and id not empty');
        //     // responce.redirect(200,'/profile');
        //     responce.send({err: 0, redirectUrl: "/profile"});
        //     // responce.send({redirect: '/profile'});
        // }else{
        //     responce.send({err: 204, redirectUrl: "/sign-in"});
        // }
});

app.route('/profile')
.get(function(request, responce){
    console.log('#INFO address: %s',request.url);
    
    if(id_account !=undefined && token !=undefined ){
        console.log('token and id not empty');
        responce.cookie('cookie','this is cookie',{
            httpOnly: true,
            maxAge: 2000
        });
        responce.cookie('anotherCookie','this is another cookie!');
        responce.clearCookie('anotherCookie');
        responce.sendFile(path.join(__dirname,'/view/profile.html'));    
    }else{
        responce.redirect('/sign-in');
        // responce.sendFile(path.join(__dirname,'/view/sign-in.html'));
    }
});
app.listen(port, function(){
    console.log('server start on port 3000');
});
