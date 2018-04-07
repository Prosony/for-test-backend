import MessagesModule       from    '/assets/js/custom/messages/messages.module.js'
import Socket               from    '/assets/js/custom/messages/socket.js'
import NotificationModule   from    "/assets/js/custom/notification/notification.module.js";
let path = window.location.pathname;
let id_account = window.localStorage.getItem('id_account');
let token = window.localStorage.getItem('token');

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
    console.log("reading message");
    console.log(pack);
    Socket.socket.send(JSON.stringify(pack));
    message_is_read(true);

    NotificationModule.set_unread(token);
    //TODO setPost color MessageModule by isRead;

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

function ws_send_message(){
    let message_pack = JSON.parse(
        '{' +
        '  "type":"message",' +
        '  "data":{' +
        '    "id_message":"",' +
        '    "id_dialog":"",' +
        '    "id_outcoming_account":"",' +
        '    "date":"",' +
        '    "message":"",' +
        '    "is_read":""' +
        '  }' +
        '}'
    );
    let value = document.getElementById("message_input").value;
    let id_dialog = MessagesModule.get_id_dialog();
    console.log('MessagesModule.get_id_dialog: ',id_dialog);

    if(typeof value !== 'undefined' && value !== "" && typeof id_dialog !== 'undefined' && id_dialog !== ""){
        MessagesModule.set_last_message(id_dialog,value);
        MessagesModule.get_uuid('messages').then( function (uuid) {
            message_pack.type = "message";
            message_pack.data.id_message = uuid;
            message_pack.data.id_dialog = id_dialog;
            message_pack.data.id_outcoming_account = id_account;
            message_pack.data.date = Date.now();
            message_pack.data.message = value;
            message_pack.data.is_read = false;
            console.log('#INFO [SOCKET] [socket.module.js] [ws_send_message] message: ',message_pack);
            Socket.socket.send(JSON.stringify(message_pack));
            MessagesModule.show_message(message_pack, true);
            $('#message_input').val('')
        });
    }
}

$(() => {
    if (path === '/messages/') {
        $('item').unbind("click").click(function() {
                console.log(`read from: `, $(this).find('.item').attr('id'));
                ws_message_has_read($(this).find('.item').attr('id'));

        });

        $('#message_input').unbind("click").click(function() {
            ws_message_has_read(MessagesModule.get_id_dialog());
        });

        $(document.body).on('click','.item',function () {
            // console.log();
            // console.log('click');
            if (window.location.pathname === '/messages/') {
                MessagesModule.open_dialog($(this), $(this).attr('id'));
                // $('.input').removeClass('disabled');
                // $('.button').removeClass('disabled');
            }else{
                console.log(`window.location.pathname: `,window.location.pathname )
            }
        });
        $('#ws_send_button').unbind("click").click(function () {
            ws_send_message()
        });
        document.onkeydown = function (e) {
            if (e.keyCode == 13) {
                ws_send_message()
            }
            // console.log(e.keyCode)
        }
    }


});

export default {

    ws_message_has_read: ws_message_has_read,
    ws_send_message: ws_send_message,
    message_is_read: message_is_read
}