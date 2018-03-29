import message from '../messages/message.js'
export default {
    get_posts () {
        message.getUnread(window.localStorage.getItem('token'))
            .then(count => {
                $('#unread-message-label').html('');
                $('#unread-message-label').html(count);
        })
    }
}