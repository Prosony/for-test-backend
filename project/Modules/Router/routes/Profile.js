import { Router } from 'express'
import http       from 'http'
import Logger     from '../../Logger'
import config     from '../../../config.json'
import UserSchema from '../../../Models/UserSchema'

export default Router().get('/:id', (request, response) => {
    UserSchema.findOne({ id_session: request.sessionID }).then(result => {
        if (result.token) {
            const is_me = request.params.id === result.id_account;
            Logger.info('Profile.js',`is_me ${is_me}`);
            response.render('profile/index', {
                id: request.params.id, //TODO this is shit! that is my think
                id_account: result.id_account,
                token: result.token,
                url: 'profile',
                is_me: is_me,
            })
        } else {
          response.redirect('authentication/sign-in')
          Logger.error('DATABASE', 'токен не найден')
        }
      })
      .catch(error => {
        Logger.error('DATABASE', `ошибка базы данных ${error.message}`)
      })
  })