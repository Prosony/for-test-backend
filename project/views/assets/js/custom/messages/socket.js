import DateModule       from    '/assets/js/custom/date/date.module.js'
import SocketModule     from    '/assets/js/custom/messages/socket.module.js'
import MessagesModule   from    '/assets/js/custom/messages/messages.module.js'

const token = window.localStorage.getItem('token');
const id_account = window.localStorage.getItem('id_account');

    let socket    = new WebSocket('ws://185.77.204.249:8080/messages-socket/{' + window.localStorage.getItem('token') + '}');

    socket.onopen= function(message){
        SocketModule.update_notification();
        console.log('#INFO [message-socket.module.js][onopen] Connection success, date.now: ['+Date.now()+"], url: [",window.location.pathname+"]");
    };

    socket.onmessage = function (message){
        message = JSON.parse(message.data)
        const type      = message.type;
        const answer    = message;
        if (window.location.pathname === 'messages') {
            switch (type) {
                case 'read':
                    if (answer.data.id_dialog !== id_dialog) {
                        SocketModule.message_is_read(false)
                    }
                    break;
                case 'message':
                    if (answer.data.id_dialog === id_dialog) {
                        SocketModule.play_sound_notification();
                        MessagesModule.show_message(answer, false)
                    }
                    break;
            }
        } else {
            switch (type) {
                case 'message':
                    SocketModule.get_unread(token).then(count => {
                            $('#unread-message-label').html(count);
                            play_sound_notification()
                        });
                    break;
            }
        }
    };
    socket.onclose = function(event){
        console.log(`#INFO [socket.js][ON CLOSE] reason: `,event.reason);
        // if (event.reason.concat('204')) {
        //     console.log('Delete authentication')
        // }
    };
    socket.onerror = function(error){
        console.log('#ERROR error: ' + error.message)
    };

    $(window).bind("beforeunload", function() {
        socket.close();
    });
$(() => {
    console.log(token);
    MessagesModule.set_dialog();
});
export default {
    socket: socket
}
