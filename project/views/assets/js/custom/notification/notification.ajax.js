import SocketModule from '../messages/socket.module.js'
export default {
    get_posts () {
        SocketModule.get_unread(window.localStorage.getItem('token'))
            .then(count => {
                $('#unread-message-label').html('');
                $('#unread-message-label').html(count); //TODO rewrite this shit plz
        }).catch(error => {
            console.log(`#ERROR [notification.ajax.js][get_posts] error: `,error);
        });
    }
}