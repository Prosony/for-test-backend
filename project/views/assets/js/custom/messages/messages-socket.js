
    const socket    = new WebSocket('ws://185.77.204.249:8080/messages-socket/{' + window.localStorage.getItem('token') + '}')

    socket.on('open', message =>{
        console.log('#INFO [message-socket.module.js][onopen] Connection success, date.now: ['+Date.now()+"], url: [",window.location.pathname+"]");
        update_notification();
        console.log('#INFO Socket opened')
    })

    socket.on('message', message => {
        message = JSON.parse(message.data)

        const type      = message.type
        const answer    = message

        if (window.location.pathname === '/messages') {
            switch (type) {
                case 'read':
                    if (answer.data.id_dialog !== id_dialog) {
                        message_is_read(false)
                    }
                    break
                case 'message':
                    if (answer.data.id_dialog === id_dialog) {
                        play_sound_notification()
                        show_message(answer, false)
                    }
                    break
            }
        } else {
            switch (type) {
                case 'message':
                    get_unread_messages(window.token)
                        .then(count => {
                            $('#unread-message-label').html(count)
                            play_sound_notification()
                        })
                    break
            }
        }
    })

    socket.on('close', event => {
        if (event.reason.concat('204')) {
            console.log('Delete authentication')
        }
    })

    socket.on('error', error => {
        console.log('#ERROR error: ' + error.message)
    })



/************************
 *          BUTTON
 ************************/

function ws_send_message(){
    let package = JSON.parse(
        '{' +
        '  "type":"message",' +
        '  "data":{' +
        '    "id_message":"",' +
        '    "id_dialog":"",' +
        '    "id_outcoming_account":"",' +
        '    "date_time":"",' +
        '    "message":"",' +
        '    "is_read":""' +
        '  }' +
        '}'
    );
    let value = document.getElementById("message").value;
    $('#'+id_dialog).find('#last-message-block').text(value.substring(0,36));
    if(typeof value !== 'undefined' && value !== ""){
        get_uuid('messages').then( function (uuid) {
            package.type = "message";
            package.data.id_message = uuid;
            package.data.id_dialog = id_dialog;
            package.data.id_outcoming_account = window.id_account;
            package.data.date_time = Date.now();
            package.data.message = value;
            package.data.is_read = false;
            console.log('#INFO [SOCKET] [wsSendMessage] [SEND] message: ',package);
            webSocket.send(JSON.stringify(package));
            show_message(package, true);
            $('#message').val('')
        });
    }
}

/**
 * EVENTS
 */

function play_sound_notification() {
    audio.play();
}
$(window).bind("beforeunload", function() {
    webSocket.close();
});
/**
 * Send to the writer that the reader has read message
 * @param id_dialog
 */
function ws_message_has_read(id_dialog){

    let package = JSON.parse(
        '{' +
        '  "type":"read",' +
        '  "data":{' +
        '    "id_dialog":"",' +
        '    "id_reader":""' +
        '  }' +
        '}'
    );
    package.type = "read";
    package.data.id_dialog = id_dialog;
    package.data.id_reader= window.id_account;
    console.log("reading message")
    console.log(package);
    webSocket.send(JSON.stringify(package));
    message_is_read(true);
    //TODO setPost color message by isRead;

}
function ws_close_connection(){
    webSocket.close();
}

/************************
 *          DATE
 ************************/
function get_date_time(date){ //TODO replace to date.js
    let years = date.getUTCFullYear();
    let month = date.getUTCMonth();
    let day = date.getUTCDate();

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    let result = years+'-';

    if(month < 10){
        result +='0'+month+'-';
    }else{
        result +=''+month+'-';
    }
    if(day < 10){
        result +='0'+day+' ';
    }else{
        result +=''+day+' ';
    }

    if (hours < 10){
        result += '0'+hours;
    }else{
        result += ''+hours;
    }
    if (minutes < 10){
        result += ':0'+minutes;
    }else{
        result += ':'+minutes;
    }
    if (seconds < 10){
        result += ':0'+seconds;
    }else{
        result += ':'+seconds;
    }
    // result += new Date().getHours()+':'+new Date().getMinutes()+':'+new Date().getSeconds();
    // console.log('#INFO [SOCKET] [get_date_time] result_data: ',result);
    //Dec 8, 2017, 5:20:52 PM from 2017-12-08 17:26:57
    return result;
}