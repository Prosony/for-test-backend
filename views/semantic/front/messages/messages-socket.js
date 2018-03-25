
let webSocket = new WebSocket('ws://localhost:8080/messages-socket/{'+window.token+'}');
/**
 *  DATA WITHOUT LOCAL TIME *
 *
 * var d1 = new Date();
 * d1.toUTCString();
 * "Sun, 18 Mar 2012 05:50:34 GMT" // two hours less than my local time
 * Math.floor(d1.getTime()/ 1000)
 * 1332049834
 *
 * var d2 = new Date( d1.getUTCFullYear(), d1.getUTCMonth(), d1.getUTCDate(), d1.getUTCHours(), d1.getUTCMinutes(), d1.getUTCSeconds() );
 * d2.toUTCString();
 * "Sun, 18 Mar 2012 03:50:34 GMT" // four hours less than my local time, and two hours less than the original time - because my GMT+2 input was interpreted as GMT+0!
 * Math.floor(d2.getTime()/ 1000)
 * 1332042634
 *
 * var UTCseconds = (Math.floor(x.getTime()/1000) + x.getTimezoneOffset()*60)
 */
webSocket.onopen = function(message){
    console.log('Connection success, date.now '+Date.now());
    console.log("url: ",window.location.pathname);

    get_unread_messages(window.token, id_dialog).then(function (count) {
        console.log('count unread message: ',count);
        $('#unread-message-lable').html(count)
    });

};

webSocket.onmessage = function (packet){
    console.log(packet);
    let type = JSON.parse(packet.data).type;
    let answer = JSON.parse(packet.data);
    // console.log('#INFO [SOCKET] [onMessage}: ', answer);
    console.log('TYPE: '+type);

    if(window.location.pathname ==='/messages'){
        switch (type){
            case 'message':
                console.log('#INFO [message-socket.js][onmessage] type:[message] received the package with [answer]: ',answer);
                $('#'+answer.data.id_dialog).find('#last-message-block').text(answer.data.message.substring(0,36));
                if (typeof id_dialog !== 'undefined' && id_dialog === answer.data.id_dialog){
                    play_sound_notification();
                    show_message( answer, false);
                }else{

                }
                break;
            case 'read':
                if (typeof id_dialog !== 'undefined' && answer.data.id_dialog === id_dialog){
                    console.log("YEAAH");
                    message_is_read(false); // change color messages
                }
                break;
        }
    }else{
        get_unread_messages(window.token, id_dialog).then(function (count) {
            $('#unread-message-label').html(count);
            console.log('count unread message: ',count);
        });
    }
};
webSocket.onclose = function(message){
    console.log(message.reason);
    if (message.reason.concat('204')){
        console.log('delete authentication!');
    }
};

webSocket.onerror = function(message){
console.log('#INFO [message-socket] error: '+message)
};
$(window).bind("beforeunload", function() {
    webSocket.close();
});

/************************
 *          BUTTON
 ************************/

function wsSendMessage(){
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
    //TODO set color message by isRead;

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