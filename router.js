var http = require('http');
var path = require('path');
var request = require('request');
var Coocies = require('cookies');
var User = require('./model/user.js');
var session = require('express-session');
var server = require('./server.js');
var opt = require('./options/options.js');
var db_service = require('./service/db.js');
var session = require('express-session');

server.app.get('/sign-in',function(request, response){
    response.sendFile(path.join(__dirname,'/view/sign-in.html'));
});

server.app.post('/check', function(request, response){
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
                    db_service.createUsers(answerFromBackEnd, request.sessionID).then(function (result) {
                        console.log('createUsers result: ',JSON.stringify(result));
                        // db_service.getUsers(request.sessionID).then(function (result) {
                        //     console.log('getUsers result: ',JSON.stringify(result));
                            response.send({err: 0, redirectUrl: "/profile"});
                        // }).catch(function(error){
                        //     console.log('Error get users, ',error);
                        //     responce.send({err: 204, redirectUrl: "/sign-in"});
                        // });
                    }).catch(function(error){
                        console.log('Error create users, ',error);
                    });
                });
                // res.on('end', () => {
                // console.log(`#INFO [/check] [http.request][/check].on[end] No more data in response.`);
                //
                // });
            });

            requestToServer.on('error', (e) => {
            console.error(`#INFO [/check] [http.request][/check].on[error] problem with request: ${e.message}`);
          });
          
          requestToServer.write(JSON.stringify({'phone':phone, 'password':password})); // write data to request body
          requestToServer.end();
    });
});
server.app.get('/sidID', function(request, responce){
    console.log(`request.sessionID: `,request.sessionID);
    const user = db_service.getUsers(request.sessionID);
    console.log('user ',user.toString());
});
server.app.get('/profile', function(request, responce){
    db_service.getUsers(request.sessionID).then(function (result) {
        console.log('getUsers result: ',result);

        if (result.token !== undefined){
            console.log(`#INFO [/profile] token: `,result.token);
            responce.sendFile(path.join(__dirname,'/view/profile.html'));
        }else{
            console.log(`#INFO [/profile] refirect to /sign-in `);
            responce.redirect('/sign-in');
        }

    }).catch(function(error){
        console.log('Error get users, ',error);
        responce.redirect('/sign-in');
    });
});