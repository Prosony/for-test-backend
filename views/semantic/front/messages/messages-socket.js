let json_message = JSON.parse('{' +
    '    "id_dialog" : "",' +
    '    "message":"",' +
    '    "is_last":""' +
    '}');

let webSocket = new WebSocket('ws://185.77.205.82:8080/messages-socket/{'+window.token+'}');
let message = document.getElementById("message");

webSocket.onopen = function(message){

    json_message.outcoming_token = window.token;
    json_message.message = 'SUCCESS';
    console.log('json_message.outcoming_token : ',json_message.outcoming_token);
    // webSocket.send(JSON.stringify(json_message));
};

webSocket.onmessage = function(message){
    console.log('message.data: ', message);
    let answer = JSON.parse(message.data);
    $('#messages-block').append(' <div class="ui minimal comments">\n' +
        '                    <div class="comment">\n' +
        '                        <a class="avatar">\n' +
        '                            <img src="semantic/dist/images/adam.png">\n' +
        '                        </a>\n' +
        '                        <div class="content">\n' +
        '                            <a class="author">SERVER</a>\n' +
        '                            <div class="metadata">\n' +
        '                                <span class="date">Yesterday at 12:30AM</span>\n' +
        '                            </div>\n' +
        '                            <div class="text">\n' +
        '                                <p>'+answer.message+'</p>\n' +
        '                            </div>\n' +
        '                            <div class="actions">\n' +
        '                                <a class="delete">Delete</a>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>');
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
    json_message.id_dialog = id_dialog;
    json_message.message = message.value;
    json_message.is_last = 1;

    webSocket.send(JSON.stringify(json_message));
    show_message(json_message);
    message.value = "";

}
function wsCloseConnection(){
    webSocket.close();
}
function show_message(json_message) {
    $('#messages-block').append(' <div class="ui minimal comments" style="margin-top: 5px; ">\n' +
        '                    <div class="comment">\n' +
        '                        <a class="avatar">\n' +
        '                            <img src="'+$('#'+id_dialog).find("img").attr("src")+'">\n' +
        '                        </a>\n' +
        '                        <div class="content">\n' +
        '                            <a class="author">Elliot Fu</a>\n' +
        '                            <div class="metadata">\n' +
        '                                <span class="date">Yesterday at 12:30AM</span>\n' +
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