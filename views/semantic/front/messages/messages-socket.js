
let webSocket = new WebSocket('ws://185.77.205.82:8080/messages-socket/{'+window.token+'}');
let message_input = document.getElementById("message-inpt");//$('#message-inpt')[0];
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

webSocket.onmessage = function(message){
    let answer = JSON.parse(message.data);
    console.log('#INFO [SOCKET] [onMessage}: ', answer);
    play_sound_notification();
    if(window.location.pathname ==='/messages'){

        console.log('answer: ',answer);
        console.log('id_dialog: ',id_dialog,' answer.answer.id_dialog: ',answer.id_dialog);
        $('#'+answer.id_dialog).find('#last-message-block').text(answer.message.substring(0,36));
        if (typeof id_dialog !== 'undefined' && id_dialog === answer.id_dialog){
            show_message( answer, false);
        }
    }else{
        get_unread_messages(window.token, id_dialog).then(function (count) {
            $('#unread-message-lable').html(count);
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

function wsSendMessage(){
    let json_message = JSON.parse('{' +
        '    "id_message" : "",' +
        '    "id_dialog" : "",' +
        '    "id_outcoming_account" : "",' +
        '    "date_time":"",' +
        '    "message":"",' +
        '    "is_read":""' +
        '}');
    let value = document.getElementById("message").value;

    if(typeof value !== 'undefined' && value !== ""){
        get_uuid('messages').then( function (uuid) {

            json_message.id_message = uuid;
            json_message.id_dialog = id_dialog;
            json_message.id_outcoming_account = window.id_account;
            json_message.date_time = Date.now();
            json_message.message = value;
            json_message.is_read = false;
            console.log('#INFO [SOCKET] [wsSendMessage] [SEND] message: ',json_message);
            webSocket.send(JSON.stringify(json_message));
            show_message(json_message, true);
        });
    }
}
function wsCloseConnection(){
    webSocket.close();
}
$(window).bind("beforeunload", function() {
    webSocket.close();
});

function get_date_time(date){ //TODO USE Date.now() [timestamp]
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