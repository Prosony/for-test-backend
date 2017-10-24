var http = require('http');
var path = require('path');
var request = require('request');
var Coocies = require('cookies');

var session = require('express-session');
var server = require('./server.js');
var opt = require('./options/options.js');
var db_servise = require('./service/db.js');

server.app.get('/sign-in',function(request, responce){
    responce.sendFile(path.join(__dirname,'/view/sign-in.html'));
});

server.app.post('/check', function(request, responce){
    console.log('#INFO address: %s',request.url);
    request.on('data', function (data) {

        var answer = JSON.parse(data);
        var phone = answer.phone;
        var password = answer.password;
        console.log('phone %s, token: %s', phone, password);

            var requestToServer =  http.request(opt.options, (res) => { 
                var answerFromBackEnd;
                console.log(`#INFO [/check] STATUS: ${res.statusCode}`);
                res.setEncoding('utf8');
                res.on('data', (chunk) => {
                    answerFromBackEnd = JSON.parse(chunk);
                    db_servise.createUser(answerFromBackEnd);
                    var test_log = db_servise.getUser(answerFromBackEnd);
                    console.log(`testLof ${test_log}`);
                    console.log(`#INFO [/check] [http.request][/check].on[data] answerFromBackEnd token: ${answerFromBackEnd.token}, id: ${answerFromBackEnd.id}`);
                });
                res.on('end', () => {
                console.log(`#INFO [/check] [http.request][/check].on[end] No more data in response.`);

                if(answerFromBackEnd.id.trim() && answerFromBackEnd.token.trim()){
                    request.session.user = answerFromBackEnd;
                    console.log(`#INFO [/check] [http.request][/check].on[end] session: ${request.session.user}`);
                    console.log(`#INFO [/check] [http.request][/check].on[end] session: ${request.sessionID}`);
                    responce.send({err: 0, redirectUrl: "/profile"});
                }else{
                    responce.send({err: 204, redirectUrl: "/sign-in"});
                }
                });
            
            });

            requestToServer.on('error', (e) => {
            console.error(`#INFO [/check] [http.request][/check].on[error] problem with request: ${e.message}`);
          });
          
          requestToServer.write(JSON.stringify({'phone':phone, 'password':password})); // write data to request body
          requestToServer.end();
    });
});

server.app.route('/profile')
.get(function(request, responce){
    console.log('#INFO address: %s',request.url);
    console.log(`request.session.user: ${request.session.user}`);
    if(request.session.user != undefined){
        var dataUser = request.session.user;
        console.log(`dataUser.token: ${dataUser.token}, dataUser.id: ${dataUser.id}`);
        responce.sendFile(path.join(__dirname,'/view/profile.html'));    
    }else{
        responce.redirect('/sign-in');
        // responce.sendFile(path.join(__dirname,'/view/sign-in.html'));
    }
});