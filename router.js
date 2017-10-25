let http = require('http');
let path = require('path');
let request = require('request');
let Coocies = require('cookies');
let User = require('./model/user.js');
let server = require('./server.js');
let opt = require('./options/options.js');
let db_service = require('./service/db.js');
let session = require('express-session');

server.app.get('/sign-in',function(request, response){
    response.render('sign-in');
});

server.app.post('/check', function(request, response){
    console.log('#INFO address: %s',request.url);
    request.on('data', function (data) {

        let answer = JSON.parse(data);
        let phone = answer.phone;
        let password = answer.password;
        console.log('phone %s, token: %s', phone, password);

            let requestToServer =  http.request(opt.options, (res) => {
                let answerFromBackEnd;
                console.log(`#INFO [/check] STATUS: ${res.statusCode}`);
                res.setEncoding('utf8');
                res.on('data', (chunk) => {
                    answerFromBackEnd = JSON.parse(chunk);
                    db_service.createUsers(answerFromBackEnd, request.sessionID).then(function (result) {
                        console.log('createUsers result: ',JSON.stringify(result));
                        // response.render('index', { title: 'The index page!' })
                            response.send({err: 0, redirectUrl: "/profile"});
                    }).catch(function(error){
                        console.log('Error create users, ',error);
                    });
                });
            });
            requestToServer.on('error', (e) => {
            console.error(`#INFO [/check] [http.request][/check].on[error] problem with request: ${e.message}`);
          });
          
          requestToServer.write(JSON.stringify({'phone':phone, 'password':password})); // write data to request body
          requestToServer.end();
    });
});
server.app.get('/profile', function(request, response){
    db_service.getUsers(request.sessionID).then(function (result) {
        console.log('getUsers result: ',result);

        if (result.token !== undefined){
            console.log(`#INFO [/profile] token: `,result.token);
            response.render('profile', { token: result.token })
        }else{
            console.log(`#INFO [/profile] refirect to /sign-in `);
            response.redirect('/sign-in');
        }

    }).catch(function(error){
        console.log('Error get users, ',error);
        response.redirect('/sign-in');
    });
});
server.app.get('/sidID', function(request, response){
    console.log(`request.sessionID: `,request.sessionID);
});
