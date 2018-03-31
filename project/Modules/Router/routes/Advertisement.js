import { Router } from 'express'
import Logger     from '../../Logger'
import UserSchema from '../../../Models/UserSchema'

export default Router()
  .get('/', (request, response) => {
      UserSchema.findOne({ id_session: request.sessionID }).then(result => {
          if (result.token) {
              response.render('advertisement/advertisement.ejs', {
                  id: result.id_account,
                  token: result.token,
                  url: 'advertisement',
                  is_me: false
              })
          }else{
              Logger.error('DATABASE', 'токен не найден');
              response.redirect('authentication/sign-in');
          }
      }).catch(error => {
          Logger.error('DATABASE', `ошибка базы данных ${error.message}`);
      })
  })
  .get('/add', (request, response) => {
      UserSchema.findOne({ id_session: request.sessionID }).then(result => {
          if (result.token) {
              response.render('advertisement/add-advertisement.ejs', {
                  id: result.id_account,
                  token: result.token,
                  url: 'advertisement/add',
                  is_me: false
              })
          }else{
              Logger.error('DATABASE', 'токен не найден');
              response.redirect('authentication/sign-in');
          }
      }).catch(error => {
          Logger.error('DATABASE', `ошибка базы данных ${error.message}`);
      })
  })