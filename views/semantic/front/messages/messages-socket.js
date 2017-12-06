let json_message = JSON.parse('{' +
    '    "outcoming_token" : "",' +
    '    "incoming_token" : "",' +
    '    "date":"",' +
    '    "message":""' +
    '}');

let webSocket = new WebSocket('ws://localhost:8080/messages-socket/{'+window.token+'}');
let echoText = document.getElementById("echoText");
echoText.value = "";
let message = document.getElementById("message");



webSocket.onopen = function(message){
    echoText.value += "Connected ... \n";
    json_message.outcoming_token = window.token;
    json_message.message = 'SUCCESS';
    console.log('json_message.outcoming_token : ',json_message.outcoming_token);
    webSocket.send(JSON.stringify(json_message));
};

webSocket.onmessage = function(message){
    console.log('message.data: ', message);
    let answer = JSON.parse(message.data);
    $('#echoText').append(' <div class="ui minimal comments">\n' +
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

    echoText.value += "Message received from to the server : " + json_message + "\n";

};
webSocket.onclose = function(message){
    echoText.value += "Disconnect ... \n";
};

webSocket.onerror = function(message){
    echoText.value += "Error ... \n";
};

function wsSendMessage(){

    json_message.outcoming_token = window.token;
    json_message.incoming_token = "SERVER";
    json_message.message = message.value;

    webSocket.send(JSON.stringify(json_message));
    $('#echoText').append(' <div class="ui minimal comments" style="margin-top: 5px; ">\n' +
        '                    <div class="comment">\n' +
        '                        <a class="avatar">\n' +
        '                            <img src="semantic/dist/images/adam.png">\n' +
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
    // echoText.value += "Message sended to the server : " + message.value + "\n";
    message.value = "";

}
function wsCloseConnection(){
    webSocket.close();
}
$('.circular.search.link.icon').on('click', function () {

})