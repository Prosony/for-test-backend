let json_message = JSON.parse('{' +
    '    "id_message" : "",' +
    '    "id_dialog" : "",' +
    '    "id_outcoming_account" : "",' +
    '    "date_time":"",' +
    '    "message":"",' +
    '    "is_last":""' +
    '}');
let webSocket = new WebSocket('ws://185.77.205.82:8080/messages-socket/{'+window.token+'}');
let message = document.getElementById("message");

webSocket.onopen = function(message){

console.log('Connection success, date '+new Date().toISOString().substring(0,10)+' '+new Date().toLocaleTimeString());
    get_uuid().then( function (uuid) {
        console.log('uuid: ', uuid);
    });
};

webSocket.onmessage = function(message){
    let answer = JSON.parse(message.data);
    console.log('message.data: ', answer);
    show_message( answer, false);
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
    get_uuid().then( function (uuid) {
        console.log('uuid: ',uuid);

        json_message.id_message = uuid;
        json_message.id_dialog = id_dialog;
        json_message.id_outcoming_account = window.id_account;
        json_message.date_time = new Date().toISOString().substring(0,10)+' '+new Date().toLocaleTimeString();
        json_message.message = message.value;
        json_message.is_read = 0;
        json_message.is_last = 1;

        webSocket.send(JSON.stringify(json_message));
        show_message(json_message, true);
        message.value = "";
    });


}
function wsCloseConnection(){
    webSocket.close();
}
function show_message(json_message, is_me) {
    let target;
    if(is_me){
        target = j_array_data_my;
    }else{
        target = j_array_data_incoming;
    }
    $('#messages-block').append(' <div class="ui minimal comments" id="'+json_message.id_message+'" style="margin-top: 5px; ">\n' +
        '                    <div class="comment">\n' +
        '                        <a class="avatar">\n' +
        '                            <img src="'+target.img+'">\n' +
        '                        </a>\n' +
        '                        <div class="content">\n' +
        '                            <a class="author">'+target.full_name+'</a>\n' +
        '                            <div class="metadata">\n' +
        '                                <span class="date">'+json_message.date_time+'</span>\n' +
        '                            </div>\n' +
        '                            <div class="text">\n' +
        '                                <p>'+json_message.message+'</p>\n' +
        '                            </div>\n' +
        '                            <div class="actions">\n' +
        '                                <a class="delete">Delete</a>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>');
}