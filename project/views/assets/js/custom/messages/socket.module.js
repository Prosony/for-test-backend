import MessagesModule   from    '/assets/js/custom/messages/messages.module.js'
import Socket           from    '/assets/js/custom/messages/socket.js'

let id_account = window.localStorage.getItem('id_account');

function ws_message_has_read(id_dialog){
    let pack = JSON.parse(
        '{' +
        '  "type":"read",' +
        '  "data":{' +
        '    "id_dialog":"",' +
        '    "id_reader":""' +
        '  }' +
        '}'
    );
    pack.type = "read";
    pack.data.id_dialog = id_dialog;
    pack.data.id_reader= id_account;
    console.log("reading message")
    console.log(pack);
    Socket.socket.send(JSON.stringify(pack));
    message_is_read(true);
    //TODO setPost color message by isRead;

}
function message_is_read(is) {
    if(is){
        $('.another').css('background-color', '');
    }else{
        $('.me').css('background-color', '');
    }
}
function ws_close_connection(){
    Socket.socket.close();
}

function play_sound_notification() {
    audio.play();
}
function ws_send_message(){
    let message_pack = JSON.parse(
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
        MessagesModule.get_uuid('messages').then( function (uuid) {
            message_pack.type = "message";
            message_pack.data.id_message = uuid;
            message_pack.data.id_dialog = id_dialog;
            message_pack.data.id_outcoming_account = window.id_account;
            message_pack.data.date_time = Date.now();
            message_pack.data.message = value;
            message_pack.data.is_read = false;
            console.log('#INFO [SOCKET] [wsSendMessage] [SEND] message: ',message_pack);
            Socket.socket.send(JSON.stringify(message_pack));
            show_message(message_pack, true);
            $('#message').val('')
        });
    }
}
function update_notification(){
    MessagesModule.get_unread(window.localStorage.getItem('token')).then(function (count) {
        console.log('count unread message: ',count);
        $('#unread-message-label').html('');
        $('#unread-message-label').html(count);
    });
}
$(() => {
    $('#message').unbind("click").click(function() {
        message_is_read(true);
        ws_message_has_read(MessagesModule.id_dialog);
    });
    $('#message').unbind("click").click(function() {
        message_is_read(true);
        ws_message_has_read(MessagesModule.id_dialog);
    });
    $(document.body).on('click','.item',function () {
        // console.log();
        // console.log('click');
        MessagesModule.open_dialog($(this),$(this).attr('id'));
    })
});

export default {

    ws_message_has_read: ws_message_has_read,
    update_notification: update_notification,
    play_sound_notification: play_sound_notification,
    ws_send_message: ws_send_message,
    message_is_read: message_is_read
}