import { Router }           from 'express'
import SessionModule        from '../Session'
import ProfileRouter        from './routes/Profile'
import AdvertisementRouter  from './routes/Advertisement'
import AuthenticationRouter from './routes/Authentication'
import MessagesRouter       from './routes/Messages'


export default Router()
    .use(SessionModule)
    .use('/profile', ProfileRouter)
    .use('/advertisement', AdvertisementRouter)
    .use('/authentication', AuthenticationRouter)
    .use('/messages', MessagesRouter)