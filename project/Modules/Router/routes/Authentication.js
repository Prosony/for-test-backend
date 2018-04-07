import { Router } from 'express'
import http       from 'http'
import config     from '../../../config.json'
import Logger     from '../../Logger'
import UserSchema from '../../../Models/UserSchema'

export default Router()
  
  .get('/sign-in', (request, response) => {
    response.render('authentication/sign-in')
    Logger.success('AUTHENTICATION ROUTER', 'отрисовка sign-in.ejs')
  })
  
  .post('/sign-in', (request, response) => {
    console.log("request.body. ",request.body.email, request.body.password);

    if (request.body.email && request.body.password) {

        const httpRequest = http.request(config.HttpRequest.SIGNIN, httpResponse => {

            httpResponse.setEncoding('UTF-8')

            httpResponse.on('data', data => {
              if (httpResponse.status !== 500) {
                  console.log(data);
                data = JSON.parse(data);
                if (data.id !== undefined && data.token !== undefined) {
                  new UserSchema({
                    id_account: data.id,
                    id_session: request.sessionID,
                    token: data.token
                  }).save().then(result => {
                      Logger.success('AUTHENTICATION ROUTER', `вход успешно выполнен: ${result.id_account}`)
                      response.send({err: 0, redirectUrl: '/profile/'+result.id_account});
                      // response.redirect(`/profile/${result.id_account}`)
                    }).catch(error => {
                      response.status(204);
                      response.render('authentication/sign-in');
                      Logger.error('SCHEMA', `ошибка базы данных ${error.message}`);
                    })
                }else{
                   Logger.error('TOKEN','Something wrong with token!');
                }
              }else{
                  Logger.error('BACKEND','Status code 500!');
              }
            })
            if (httpResponse.statusCode === 204){
                response.send({err: 204, redirectUrl: '/authentication/sign-in'});
                // response.redirect('/profile/:'+result.id_account);
            }
          })
        httpRequest.on('error', error => {
          console.log('ERROR')
          response.status(204)
          response.render('/authentication/sign-in')
          Logger.error('HTTP REQUEST', `ошибка запроса ${error.message}`)
        })
        httpRequest.write(JSON.stringify(request.body))
        httpRequest.end()
    } else {
        response.send({err: 204, redirectUrl: '/authentication/sign-in'});
    }
  })

  .get('/sign-up', (request, response) => {
    response.render('authentication/sign-up');
    Logger.success('AUTHENTICATION ROUTER', 'отрисовка sign-up.ejs')
  })
  
  .get('/sign-out', (request, response) => {
    UserSchema.findOne({ id_session: request.sessionID })
      .then(result => {
        const httpRequest = http.request(config.HttpRequest.SIGNOUT,
          httpResponse => {
            httpResponse.setEncoding('UTF-8')
            UserSchema.deleteOne({ id_session: request.sessionID })
              .then(() => {
                response.redirect('/authentication/sign-in')
                Logger.success('SIGNOUT', 'user successfully sign out')
              })
              .catch(error => {
                Logger.error('DATABASE', `failed delete session: ${error.message}`)
              })
          })
          httpRequest.on('error', error => {
            Logger.error('BACKEND REQUEST', `error on backend request ${error.message}`)
          })
          httpRequest.write(JSON.stringify({ token: result.token }))
          httpRequest.end()
      })
      .catch(error => {
        response.status(500)
        response.end()
        Logger.error('DATABASE', `failed find session ${error.message}`)
      })
  })