const
	http          = require('http')
	router        = require('express').Router()
	opt	          = require('./options')
	UserSchema    = require('./model/User')
	other_service = require('./service/other_service.js')

router.get('/messages', (request, response) => {
	UserSchema.findOne({ id_session: request.sessionID })
	.then(result => {
		if (result.token !== undefined) {
      response.render('messages.ejs', {
      	id: result.id_account,
      	token: result.token,
      	url: '/add-advertisement',
      	is_me: false
      })
      //TODO delete url param and rename is_me to mustLoad
    } else {
        console.log(`#INFO [routing.js][/messages] token not found, redirect to /sign-in`)
        response.redirect('/sign-in')
    }
	})
	.catch(error => {
			console.log(error.message)
			response.redirect('/sign-in')
		})
})

router.get('/profile/:id', (request, response) => {
  console.log(request.connection.remoteAddress)
  let id = request.params.id
  
  if (typeof id !== 'undefined' && id !== ':') {
  	UserSchema.findOne({ id_session: request.sessionID }).then(result_my => {
      id = id.substring(1, id.length)
      console.log(result_my)
      let is_me = id == result_my.id_account
            UserSchema.findOne({ id_account : id })
    	.then(result => {
        console.log('#INFO [routing.js][/profile/:' + id + ']  user data: ', result)
        if (result_my.token !== 'undefined' && result_my.token !== undefined) {
          response.render('profile', {
          	id: id,
          	token: result_my.token,
          	url: '/profile',
          	is_me:is_me
          })
        } else {
          console.log('#ERROR [routing.js][/profile] token is undefined, redirect to /sign-in')
          response.redirect('/sign-in')
        }
      }).catch(error => {
      	let requestToServer =  http.request(opt.option_check_account, (res) => {
          console.log(`#INFO [routing.js][/check-account] STATUS: ${res.statusCode}`);
          res.setEncoding('utf8');
          res.on('data', (answer) => {
            console.log('#INFO [routing.js][/check-account] answer: ',answer);
            if (answer){
              response.render('profile', { 'id': id, 'token':result_my.token, 'url':'/profile', 'is_me':is_me});
            }else{
              console.log('#ERROR [routing.js][/check-account], account not found');
              console.log('#INFO [/check-account] [ERROR], redirect to /sign-in');
              response.redirect('/sign-in');
            }
          });
      	});
        requestToServer.on('error', (e) => {
          console.error(`#INFO [/check] [http.request][/check].on[error] problem with request: ${e.message}`);
        });
        requestToServer.write(JSON.stringify({ id: id }))
        requestToServer.end()
    	});
  	})
  	.catch(error => console.log(error))
  } else {
    console.log(`#ERROR [routing.js][/profile] param id undefined, redirect to /sign-in `)
    response.redirect('/sign-in')
  }
})

router.get('/bookmarks', (request, response) => {
	UserSchema.findOne({ id_session: request.sessionID })
	.then(result => {
    if (typeof result.token !== 'undefined') {
      response.render('parts/profile-parts/center/bookmarks/bookmarks.ejs', {
      	id: result.id_account,
      	token: result.token,
      	url: '/bookmarks'
      })
    } else {
    	response.redirect('/sign-in')
    }
	})
  .catch(error => {
  	console.log(error)
  })
})

router.get('/check-auth', (request, response) => {
  UserSchema.findOne({ id_session: request.sessionID })
  .then(result => {
    console.log("#INFO [router.js][/check-auth] result: " + result)
    return result
	})
	.catch(error => {
		console.log(error)
	})
})

router.get('/advertisement', (request, response) => {
  UserSchema.findOne({ id_session: request.sessionID })
  .then(result => {
    console.log('#INFO [routing.js][/advertisement] getUsersByIdSession result: ', result)
    if (result.token !== undefined) {
        response.render('find-pet.ejs', {
          id: result.id_account,
          token: result.token,
          url: '/advertisement',
          is_me: false
        })
    } else {
      response.redirect('/sign-in')
    }
  })
  .catch(error => {
    console.log(error)
  })
})

router.get('/add-advertisement', (request, response) => {
  UserSchema.findOne({ id_session: request.sessionID })
  .then(result => {
    if (result.token !== undefined) {
      response.render('add-advertisement.ejs', {
        id: result.id_account,
        token: result.token,
        url: '/add-advertisement',
        is_me: false
      })
    } else {
      console.log(`#INFO [/add-advertisement][/add-advertisement] token not found, redirect to /sign-in `);
      response.redirect('/sign-in')
    }
  })
  .catch(error => {
    console.error(error)
    response.redirect('/sign-in')
  })
})

/********************************************************************************************
 *                                      AUTHENTICATION                                      *
 *******************************************************************************************/

router.get('/', (request, response) => {
    console.log('#INFO [router.js][/] address: [%s], sessionID: %s',request.url, request.sessionID);
    if (request.sessionID !== null && request.sessionID !== undefined) {
        UserSchema.findOne({ id_session: request.sessionID })
        .then(result => {
            console.log("#INFO [router.js][/] user data: "+result);
            if (result !== null && result.token !== undefined) {
                response.redirect('/profile/:'+result.id_account);
            } else {
                response.render('sign-in.ejs');
            }
        })
        .catch(error => {
            console.error(error);
        })
    } else {
        response.redirect('/sign-in');
    }
});

router.get('/sign-in', function(request, response){
    console.log('#INFO [router.js][/] address: [%s], sessionID: %s',request.url, request.sessionID);
    if (request.sessionID !== null && request.sessionID !== undefined){
        UserSchema.findOne({ id_session: request.sessionID }).then(result => {
            console.log("#INFO [router.js][/sign-in] result: ",result);
            if (result !== null && result.token !== undefined){
                response.redirect('/profile/:'+result.id_account);
            }else{
                response.render('sign-in.ejs');
            }
        }).catch(error => {
            console.error(error)
        })
    }else{
        response.render('sign-in.ejs');
    }
});

router.post('/check', function(request, response){

    let email = request.body.email;
    let password = request.body.password;
    console.log('#INFO [routing.js][/check] email %s, token: %s', email, password);

    let requestToServer =  http.request(opt.options_sign_in, (res) => {

        console.log(`#INFO [/check] AUTHENTICATION STATUS: ${res.statusCode}`);
        let answerFromBackEnd;
        res.setEncoding('utf8');
        res.on('data', (chunk) => {

            console.log('chunk: ',chunk);
            if  (res.statusCode !== 500){
                answerFromBackEnd = JSON.parse(chunk);
                if (typeof answerFromBackEnd .id !=='undefined' && typeof answerFromBackEnd .token !=='undefined'){
                    new UserSchema({
                        id_account: answerFromBackEnd.id,
                        id_session: request.sessionID,
                        token: answerFromBackEnd.token
                    }).save()
                    .then(result => {
                        console.log('createUsers result: ',JSON.stringify(result));
                        response.send({err: 0, redirectUrl: '/profile/:'+result.id_account});
                    }).catch(function(error){
                        console.error(error);
                    });
                }else{
                    console.log("#ERROR [routing.js][/check] answerFromBackEnd undefined");
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

router.get('/log-out', function(request, response) {
    UserSchema.findOne({ id_session: request.sessionID }).then(function (result) {
        console.log('#INFO [routing.js][/log-out] getUsersByIdSession result: ',result);
        if (result.token !== undefined){
            console.log(`#INFO [/log-out] token: `,result.token);

            let requestToServer =  http.request(opt.options_sign_out, (res) => {
                console.log(`#INFO [/log-out] STATUS: ${res.statusCode}`);
                res.setEncoding('utf8');
                UserSchema.deleteOne({id_session : request.sessionID})
                .then(function () {
                  response.render('sign-in');
                })
                .catch(error => {console.log(error)})
            });
            requestToServer.on('error', (e) => {
                console.error(`#INFO [routing.js][/log-out] error: ${e.message}`);
            });
            requestToServer.write(JSON.stringify({'token':result.token})); // write data to request body
            requestToServer.end();

        }else{
            console.log(`#INFO [routing.js][/log-out] redirect to /sign-in `);
            response.redirect('/sign-in');
        }
    }).catch(function(error){
        console.error(error);
        response.redirect('/sign-in');
    });
});

module.exports = router;