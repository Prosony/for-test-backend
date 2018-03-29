import Logger   from './Logger'
import mongoose from 'mongoose'
import config   from '../config.json'

mongoose.Promise = global.Promise
mongoose.connect(config.DataBase.URL)
    .then(() => {
        Logger.success('DATABASE', 'Покдлючение установлено')
    })
    .catch(error => {
        Logger.error('DATABASE', `Ошибка подключения: ${error.message}`)
    })

export default mongoose