import audio        from '/assets/js/custom/audio/audio.js'
import message      from '/assets/js/custom/messages/message.js'
import notification from '/assets/js/custom/notification/notification.module.js'

$(() => {
    const socket = new WebSocket('ws://185.77.204.249:8080/messages-socket/{' + window.localStorage.getItem('token') + '}');

    socket.addEventListener('open', () => {
        notification.update();
        console.log('#INFO Socket opened')
    });

    socket.addEventListener('message', message => {
        message = JSON.parse(message.data);

        const type      = message.type;
        const answer    = message;

        if (window.location.pathname === '/messages') {
            switch (type) {
                case 'read':
                    if (answer.data.id_dialog !== id_dialog) {
                        message.changeState(false)
                    }
                    break;
                case 'message':
                    if (answer.data.id_dialog === id_dialog) {
                        message.show(answer, false);
                        audio.play()
                    }
                    break
            }
        } else {
            switch (type) {
                case 'message':
                    message.getUnread(window.localStorage.getItem('token'))
                        .then(count => {
                            $('#unread-message-label').html(count);
                            audio.play()
                        });
                    break
            }
        }
    });

    socket.addEventListener('close', event => {
        if (event.reason.concat('204')) {
            console.log('#INFO : delete authentication')
        }
    });

    socket.addEventListener('error', error => {
        console.log('#ERROR : ' + error.message)
    })
});