let http = require('http');
let server = require('./server.js');
let opt = require('./options/options.js');
let db_service = require('./service/db.js');
let session = require('express-session');

server.app.get('/',function(request, response){
    console.log('#INFO [router.js] address: [%s], sessionID: %s',request.url,request.sessionID);
    if (request.sessionID !== null && request.sessionID !== undefined){
        db_service.getUsersByIdSession(request.sessionID).then(function (result) {

            console.log("#INFO [router.js] result: ",result);
            if (result.token !== undefined){
                response.redirect('/profile/:'+result.id_account);
            }else{
                response.redirect('/sign-in');
            }
        }).catch(function(error){
            console.log('Error get account, ',error);
            response.redirect('/sign-in');
        });
    }else{
        response.redirect('/sign-in');
    }

});
server.app.get('/sign-in',function(request, response){
        if (request.sessionID !== null && request.sessionID !== undefined){
            db_service.getUsersByIdSession(request.sessionID).then(function (result) {

                console.log("#INFO [router.js] result: ",result);
                if (result.token !== undefined){
                    response.redirect('/profile/:'+result.id_account);
                }else{
                    response.render('sign-in.ejs');
                }
            }).catch(function(error){
                console.log('Error get account, ',error);
                response.render('sign-in.ejs');
            });
        }else{
            response.render('sign-in.ejs');
        }
    });

server.app.post('/check', function(request, response){
    console.log('#INFO address: %s',request.url);
    request.on('data', function (data) {

        let answer = JSON.parse(data);
        let email = answer.email;
        let password = answer.password;
        console.log('email %s, token: %s', email, password);

            let requestToServer =  http.request(opt.options_sign_in, (res) => {
                let answerFromBackEnd;
                console.log(`#INFO [/check] STATUS: ${res.statusCode}`);
                res.setEncoding('utf8');
                res.on('data', (chunk) => {
                    answerFromBackEnd = JSON.parse(chunk);
                    db_service.createUsers(answerFromBackEnd, request.sessionID).then(function (result) {
                        console.log('createUsers result: ',JSON.stringify(result));
                        response.send({err: 0, redirectUrl: '/profile/:'+result.id_account});
                    }).catch(function(error){
                        console.log('Error create users, ',error);
                    });
                });
            });
            requestToServer.on('error', (e) => {
            console.error(`#INFO [/check] [http.request][/check].on[error] problem with request: ${e.message}`);
          });
          
          requestToServer.write(JSON.stringify({'email':email, 'password':password})); // write data to request body
          requestToServer.end();
    });
});


server.app.get('/profile/:id', function(request, response){
    let id = request.params.id;
    id = id.substring(1,id.length);
    console.log('#INFO [/profile/:id] request id: ',id);

    db_service.getUsersById(id).then(function (result) { //MUST search in db on back end not in cache on front
        console.log('#INFO [/profile/:id]  getUsers result: ',result);

        if (result.token !== undefined){
            console.log(`#INFO [/profile:id] token: `,result.token);
            response.render('profile', { 'id': id, 'token':result.token, 'url':'/profile'});
        }else{
            console.log(`#INFO [/profile] refirect to /sign-in `);
            response.redirect('/sign-in');
        }
    }).catch(function(error){
        console.log('Error get users, ',error);
        response.redirect('/sign-in');
    });
});
server.app.get('/bookmarks', function (request, response) {
    db_service.getUsersByIdSession(request.sessionID).then(function (result) {
        if (typeof result.token !== 'undefined'){
            response.render('parts/profile-parts/center/bookmarks/bookmarks.ejs', { 'id': result.id_account, 'token':result.token, 'url':'/bookmarks'});
        }else{
            response.redirect('/sign-in');
        }
    });


});
server.app.get('/check-auth', function(request, response){
    db_service.getUsersByIdSession(request.sessionID).then(function (result) {
        return result.token !== undefined;
    });
    console.log(`request.sessionID: `,request.sessionID);
});

server.app.get('/advertisement', function (request, response) {
    db_service.getUsersByIdSession(request.sessionID).then(function (result) {
        console.log('#INFO [/advertisement] getUsersByIdSession result: ', result);

        if (result.token !== undefined) {

            response.render('parts/find-pet.ejs', { 'id': result.id_account, 'token':result.token, 'url':'/advertisement'});
        }else{
            response.redirect('/sign-in');
        }
    });
});
server.app.get('/log-out', function(request, response){

    db_service.getUsersByIdSession(request.sessionID).then(function (result) {
        console.log('#INFO [/log-out] getUsersByIdSession result: ',result);
        if (result.token !== undefined){
            console.log(`#INFO [/log-out] token: `,result.token);

            let requestToServer =  http.request(opt.options_sign_out, (res) => {

                console.log(`#INFO [/log-out] STATUS: ${res.statusCode}`);
                res.setEncoding('utf8');
                db_service.logout(request.sessionID).then(function () {
                        response.render('sign-in');
                    });

            });
            requestToServer.write(JSON.stringify({'token':result.token})); // write data to request body
            requestToServer.end();

        }else{
            console.log(`#INFO [/log-out] redirect to /sign-in `);
            response.redirect('/sign-in');
        }
    }).catch(function(error){
        console.log('Error get users, ',error);
        response.redirect('/sign-in');
    });

});