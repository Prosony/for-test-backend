let http = require('http');
let server = require('./server.js');
let opt = require('./options/options.js');
let db_service = require('./service/db.js');
let other_service = require('./service/other_service.js');

server.app.get('/messages',function (request, response) {
    db_service.getUsersByIdSession(request.sessionID).then(function (result) {

        if (result.token !== undefined){
            response.render('messages.ejs', { 'id': result.id_account, 'token':result.token, 'url':'/add-advertisement', 'is_me':true});
        }else{
            console.log(`#INFO [/messages] token not found, redirect to /sign-in `);
            response.redirect('/sign-in');
        }
    }).catch(function(error){
        console.log('Error get users by sessionID, ',error);
        response.redirect('/sign-in');
    });
});

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


server.app.get('/profile/:id', function(request, response){
    let id = request.params.id;
    console.log('request.params.id: ',id);
    if(typeof id !== 'undefined' && id !== ':' ){
        db_service.getUsersByIdSession(request.sessionID).then(function (result_my) {
            id = id.substring(1,id.length);
            let is_me;
            if(id !== result_my.id_account){
                is_me = false;
            }else{
                is_me = true;
            }
            console.log('#INFO [/profile/:id] request id: ',id);
            db_service.getUsersById(id).then(function (result) {
                console.log('#INFO [/profile/:id]  getUsers result: ',result);

                if (result_my.token !== undefined){
                    console.log(`#INFO [/profile:id] token: `,result_my.token);

                    response.render('profile', { 'id': id, 'token':result_my.token, 'url':'/profile', 'is_me':is_me});
                }else{
                    console.log(`#INFO [/profile] refirect to /sign-in `);
                    response.redirect('/sign-in');
                }
            }).catch(function(error){

                let requestToServer =  http.request(opt.option_check_account, (res) => {
                    console.log(`#INFO [/check-account] STATUS: ${res.statusCode}`);
                    res.setEncoding('utf8');
                    res.on('data', (answer) => {
                        console.log('#INFO [/check-account] answer: ',answer);
                        if (answer){
                            response.render('profile', { 'id': id, 'token':result_my.token, 'url':'/profile', 'is_me':is_me});
                        }else{
                            console.log('#INFO [/check-account] [ERROR.checkAccount], account not found');
                            console.log('#INFO [/check-account] [ERROR], redirect to /sign-in');
                            response.redirect('/sign-in');
                        }
                    });
                });
                requestToServer.on('error', (e) => {
                    console.error(`#INFO [/check] [http.request][/check].on[error] problem with request: ${e.message}`);
                });
                requestToServer.write( JSON.stringify({'id':id})); // write data to request body
                requestToServer.end();
            });
        });

    }else{
            console.log(`#INFO [/profile] refirect to /sign-in `);
        response.redirect('/sign-in');
    }

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
            response.render('find-pet.ejs', { 'id': result.id_account, 'token':result.token, 'url':'/advertisement', 'is_me':false});
        }else{
            response.redirect('/sign-in');
        }
    });
});
server.app.get('/add-advertisement',function (request, response) {
    db_service.getUsersByIdSession(request.sessionID).then(function (result) {

        if (result.token !== undefined){
            response.render('add-advertisement.ejs', { 'id': result.id_account, 'token':result.token, 'url':'/add-advertisement', 'is_me':false});
        }else{
            console.log(`#INFO [/add-advertisement]token not found, redirect to /sign-in `);
            response.redirect('/sign-in');
        }
    }).catch(function(error){
        console.log('Error get users by sessionID, ',error);
        response.redirect('/sign-in');
    });
});

/********************************************************************************************
 *                                      AUTHENTICATION                                      *
 *******************************************************************************************/

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
    console.log('request.body: ', request.body);
    let email = request.body.email;
    let password = request.body.password;
    console.log('email %s, token: %s', email, password);

    let requestToServer =  http.request(opt.options_sign_in, (res) => {
        let answerFromBackEnd;
        console.log(`#INFO [/check] STATUS: ${res.statusCode}`);
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            console.log('chunk: ',chunk);
            if  (res.statusCode !== 500){
                answerFromBackEnd = JSON.parse(chunk);
                if (typeof answerFromBackEnd .id !=='undefined' && typeof answerFromBackEnd .token !=='undefined'){
                    db_service.createUsers(answerFromBackEnd, request.sessionID).then(function (result) {
                        console.log('createUsers result: ',JSON.stringify(result));
                        response.send({err: 0, redirectUrl: '/profile/:'+result.id_account});
                    }).catch(function(error){
                        console.log('Error create users, ',error);
                    });
                }else{
                    console.log('typeof chunk.id !==undefined && typeof chunk.token !==undefined');
                    response.send({err: 204, redirectUrl: '/sign-in'});
                }
            }else{
                response.send({err: 204, redirectUrl: '/sign-in'});
            }

        });
        if (res.statusCode === 204){
            response.send({err: 204, redirectUrl: '/sign-in'});
            // response.redirect('/profile/:'+result.id_account);
        }
    });
    requestToServer.on('error', (e) => {
        console.error(`#INFO [/check] [http.request][/check].on[error] problem with request: ${e.message}`);
    });
    if (email !== undefined && password!== undefined ){
        requestToServer.write(JSON.stringify({'email':email, 'password':password})); // write data to request body
        requestToServer.end();
    }else{
        response.send({err: 204, redirectUrl: '/sign-in'});
    }
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
        console.log('Error get users by sessionID, ',error);
        response.redirect('/sign-in');
    });
});