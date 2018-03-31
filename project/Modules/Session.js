import Logger     from './Logger'
import UserSchema from '../Models/UserSchema'

export default (request, response, next) => {
  if (request.path === '/favicon.ico') {
    next()
  } else {
    Logger.info('SESSION', `проверка сессии: ${request.sessionID}`)
    UserSchema.findOne({ id_session: request.sessionID })
      .then(result => {
        if (result != null && result.token !== undefined) {
          Logger.success('SESSION DATABASE', 'сессия прошла проверку')
          request.path === '/authentication'
          || request.path === '/authentication/sign-in'
          || request.path === '/authentication/sign-up'
          || request.path === '/profile'
          || request.path === '/'
            ? response.redirect(`/profile/${result.id_account}`)
            : next()
        } else {
          Logger.error('SESSION DATABASE', 'сессия не найдена')
          request.path === '/authentication'
          || request.path === '/authentication/sign-in'
          || request.path === '/authentication/sign-up'
            ? next()
            : response.redirect('/authentication/sign-in')
        }
      })
      .catch(error => {
        response.redirect('/authentication/sign-in');
        Logger.error('SESSION DATABASE', `ошибка базы данных: ${error.message}`)
      })
  }
}