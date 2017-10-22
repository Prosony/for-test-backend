var express = require('express');
var http = require('http');
var path = require('path');
var request = require('request');
var Coocies = require('cookies');
var app = express();
var port = 3000;

var id_account;
var token;

var answerFromBackEnd = 'hey';

app.use(express.static(path.join(__dirname, 'view')));

app.get('/sign-in',function(request, responce){
    responce.sendFile(path.join(__dirname,'/view/sign-in.html'));
});

app.post('/check', function(request, responce){
    
    console.log('#INFO address: %s',request.url);
    
    var phone;
    var password 

    request.on('data', function (data) {

        var answer = JSON.parse(data);
        phone = answer.phone;
        password = answer.password;
        console.log('phone %s, token: %s', phone, password);
        var opt = {
            hostname: 'localhost',
            port: 8080,
            path: '/authentication/sign-in',
            method: 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
        };
            var requestToServer =  http.request(opt, (res) => {
                console.log(`STATUS: ${res.statusCode}`);
               
                res.setEncoding('utf8');
                res.on('data', (chunk) => {
                    answerFromBackEnd = JSON.parse(chunk);
                    console.log('answerFromBackEnd token %s',answerFromBackEnd.token);
                    console.log('answerFromBackEnd id %s',answerFromBackEnd.id);
                });
                res.on('end', () => {
                console.log('No more data in response.');
                console.log('past http ',answerFromBackEnd);
                
                if(answerFromBackEnd.id.trim() && answerFromBackEnd.token.trim()){
                    console.log('token and id not empty');
                    responce.send({err: 0, redirectUrl: "/profile"});
                }else{
                    responce.send({err: 204, redirectUrl: "/sign-in"});
                }
                });

            });
          
            requestToServer.on('error', (e) => {
            console.error(`problem with request: ${e.message}`);
          });
          
          requestToServer.write(JSON.stringify({'phone':phone, 'password':password})); // write data to request body
          requestToServer.end();
    });
});

app.route('/profile')
.get(function(request, responce){
    console.log('#INFO address: %s',request.url);
    
    if(answerFromBackEnd.token != undefined && answerFromBackEnd.id != undefined){
        console.log(`token: ${answerFromBackEnd.token}, id: ${answerFromBackEnd.id}`);
        responce.sendFile(path.join(__dirname,'/view/profile.html'));    
    }else{
        responce.redirect('/sign-in');
        // responce.sendFile(path.join(__dirname,'/view/sign-in.html'));
    }
});
app.listen(port, function(){
    console.log('server start on port 3000');
});