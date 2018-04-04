import DateModule           from    '/assets/js/custom/date/date.module.js'
import SocketModule         from    '/assets/js/custom/messages/socket.module.js'
import MessagesModule       from    '/assets/js/custom/messages/messages.module.js'
import NotificationModule   from '/assets/js/custom/notification/notification.module.js'


const token = window.localStorage.getItem('token');
const id_account = window.localStorage.getItem('id_account');
const url = window.localStorage.getItem('url');
    let socket    = new WebSocket('ws://185.77.204.249:8080/messages-socket/{' + window.localStorage.getItem('token') + '}');

    socket.onopen= function(message){
        NotificationModule.set_unread(token);
        console.log('#INFO [socket.js][onopen] Connection success, date.now: ['+Date.now()+"], url: [",window.location.pathname+"]");
    };

    socket.onmessage = function (message){
        message = JSON.parse(message.data);
        const type      = message.type;
        const answer    = message;
        let id_dialog   = MessagesModule.get_id_dialog();

        console.log(`#INFO [socket.js][onmessage] package: `,message);
        if (window.location.pathname === '/messages/') {
            switch (type) {
                case 'read':
                    if (answer.data.id_dialog === id_dialog) {
                        NotificationModule.set_unread(token);
                        SocketModule.message_is_read(false)
                    }
                    break;
                case 'message':
                    if (answer.data.id_dialog === id_dialog) {
                        NotificationModule.set_unread(token);
                        NotificationModule.play_sound_notification();
                        MessagesModule.show_message(answer, false)
                    }else{
                        NotificationModule.set_unread(token);
                        NotificationModule.play_sound_notification();
                        MessagesModule.set_last_message(answer.data.id_dialog, message.data.message)
                    }
                    break;
            }
        } else {
            switch (type) {
                case 'message':
                    NotificationModule.set_unread(token);
                    NotificationModule.play_sound_notification();
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
    if (window.location.pathname === '/messages/'){
        MessagesModule.get_my_data();
    }
    MessagesModule.set_dialog();
});
export default {
    socket: socket
}
