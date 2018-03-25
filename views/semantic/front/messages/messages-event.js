
var id_dialog;
var id_interlocutor;   // or let id_interlocutor = document.getElementById(id_dialog).getElementsByTagName('h4')[0].id; //get id interlocutor
var j_array_data_my = JSON.parse('{' +
    '    "full_name":"",' +
    '    "img":"",' +
    '    "id_account":""' +
    '}');
var j_array_data_incoming = JSON.parse('{' +
    '    "full_name" : "",' +
    '    "img":"",' +
    '    "id_account":""' +
    '}');

function play_sound_notification() {
    audio.play();
}
function set_dialog_block(){
    get_all_dialogs(window.token).then(function (json_dialogs) {
        console.log('#INFO [set_dialog_block] json_dialogs: ',json_dialogs);

        let length = json_dialogs.length;
        for (let index = 0; index < length; index ++){
            if(json_dialogs[index].idOutcomingAccount === window.id_account){
                show_dialog(json_dialogs[index].idIncomingAccount, json_dialogs[index]);
            }else{
                show_dialog(json_dialogs[index].idOutcomingAccount, json_dialogs[index]);
            }

        }
    });
}
function show_dialog(id_account, json_dialog){
    update_data_profile(window.token, id_account).then(function (profile) {//TODO rewrite to get all profile.
        console.log('Profile: ',profile);
        id_interlocutor = id_account;
        j_array_data_incoming.id_account = id_account;
        getImage(JSON.stringify({'path': [profile.path_avatar]})).then(function (base64image) {
            get_last_message_by_id_dialog(window.token, json_dialog.idDialog).then( function (last_message) {
                $('#dialog-block').append('<div class="item" id="'+json_dialog.idDialog+'" style="height: auto;" onclick="open_dialog($(this).attr(\'id\'))">\n' +
                    '                                <div class="ui mini image">\n' +
                    '                                    <img src="'+base64image+'">\n' +
                    '                                </div>\n' +
                    '                                <div class="content">\n' +
                    '                                    <h4 class="ui header" id="'+id_account+'">'+profile.name +' '+ profile.surname+' </h4>\n' +
                    '                                    <div class="description" id="last-message-block">\n' +
                    '                                        <p>'+id_account+'</p>\n' +
                    '                                    </div>\n' +
                    '                                </div>\n' +
                    '                            </div>\n');
                $('#'+json_dialog.idDialog).find('#last-message-block').text(last_message.message.substring(0,36));
            });

        });

    });
}
function open_dialog(id_dialog_block) {
    $('#messages-block').empty();
    $('#message-scroll-block').removeClass('disabled');
    $('#input-message').removeClass('disabled');
    $('#send-msg-btn').removeClass('disabled');

    id_dialog = id_dialog_block;
    j_array_data_incoming.full_name = $('#'+id_dialog_block).find('.ui.header')[0].innerHTML;
    j_array_data_incoming.img = $('#'+id_dialog_block).find('img').attr("src");
    j_array_data_incoming.id_account =
    $('#messages-block').find('.ui.minimal.comments').remove();

    get_messages_by_id_dialog(window.token, id_dialog_block).then( function (j_array_messages) {
        if (typeof j_array_messages !== 'undefined'){
            for (let index = 0; index < j_array_messages.length; index++){
                if(j_array_messages[index].idOutcomingAccount === window.id_account){ //is my message or not
                    $('#messages-block').append(
                        '                    <div class="comment me" id="'+j_array_messages[index].idMessage+'" >\n' +
                        '                        <a class="avatar">\n' +
                        '                            <img src="'+j_array_data_my.img+'">\n' +
                        '                        </a>\n' +
                        '                        <div class="content">\n' +
                        '                            <a class="author" href="/profile/:'+window.id_account+'">'+j_array_data_my.full_name+'</a>\n' +
                        '                            <div class="metadata">\n' +
                        '                                <span class="date">'+get_date_time(new Date(j_array_messages[index].date))+'</span>\n' +
                        '                            </div>\n' +
                        '                            <div class="text">\n' +
                        '                                <p>'+j_array_messages[index].message+'</p>\n' +
                        '                            </div>\n' +
                        '                            <div class="actions">\n' +
                        '                                <a class="delete">Delete</a>\n' +
                        '                            </div>\n' +
                        '                        </div>\n' +
                        '                    </div>\n');
                    $('#message-scroll-block').scrollTop($('#message-scroll-block')[0].scrollHeight);
                }else{
                    $('#messages-block').append(
                        '                    <div class="comment another" id="'+j_array_messages[index].idMessage+'">\n' +
                        '                        <a class="avatar">\n' +
                        '                            <img src="'+j_array_data_incoming.img+'">\n' +
                        '                        </a>\n' +
                        '                        <div class="content">\n' +
                        '                            <a class="author" href="/profile/:'+id_interlocutor+'">'+j_array_data_incoming.full_name+'</a>\n' +
                        '                            <div class="metadata">\n' +
                        '                                <span class="date">'+get_date_time(new Date(j_array_messages[index].date))+'</span>\n' +
                        '                            </div>\n' +
                        '                            <div class="text">\n' +
                        '                                <p>'+j_array_messages[index].message+'</p>\n' +
                        '                            </div>\n' +
                        '                            <div class="actions">\n' +
                        '                                <a class="delete">Delete</a>\n' +
                        '                            </div>\n' +
                        '                        </div>\n' +
                        '                    </div>\n');
                    $('#message-scroll-block').scrollTop($('#message-scroll-block')[0].scrollHeight);
                }

                if (!j_array_messages[index].isRead){   //set color by isRead in msg
                    $('#'+j_array_messages[index].idMessage).css({'background-color':'rgba(113,111,122,0.11)'});
                }
            }
            ws_message_has_read(id_dialog); // send by socket that message is read
        }else{
            console.log('#INFO [message-event] [open_dialog] message not found!');
        }

    });
}

function show_message(message, is_me) {
    if (id_dialog === message.data.id_dialog){
        let target;
        let blabla;
        if(is_me){
            blabla ="me";
            target = j_array_data_my;
        }else{
            blabla ="another";
            target = j_array_data_incoming;
        }
        $('#messages-block').append(
            '                    <div class="comment '+blabla+'" id="'+message.data.id_message+'" style="background-color:rgba(113,111,122,0.11);">\n' +
            '                        <a class="avatar">\n' +
            '                            <img src="'+target.img+'">\n' +
            '                        </a>\n' +
            '                        <div class="content">\n' +
            '                            <a class="author" href="/profile/:'+target.id_account+'">'+target.full_name+'</a>\n' +
            '                            <div class="metadata">\n' +
            '                                <span class="date">'+get_date_time(new Date(message.data.date_time))+'</span>\n' +
            '                            </div>\n' +
            '                            <div class="text">\n' +
            '                                <p>'+message.data.message+'</p>\n' +
            '                            </div>\n' +
            '                            <div class="actions">\n' +
            '                                <a class="delete">Delete</a>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                    </div>\n');
        $('#message-scroll-block').scrollTop($('#message-scroll-block')[0].scrollHeight);
    }
}
 function get_my_data() {
     update_data_profile(window.token, window.id_account).then(function (profile) {
         j_array_data_my.full_name = profile.name +' '+profile.surname;
         j_array_data_my.id_account = window.id_account;
         getImage(JSON.stringify({'path': [profile.path_avatar]})).then(function (base64image) {
             j_array_data_my.img = base64image;
             console.log('#INFO [messages-event.js] [get_my_data] j_array_data_my.full_name: '+j_array_data_my.full_name);
         });
     });
 }

 /***********EVENT HANDLER******/
 $('#message').unbind("click").click(function() {
     message_is_read(true);
     ws_message_has_read(id_dialog);
 });

/**
 * Change color messages on page
 * @param id_reader
 */
function message_is_read(is) {
    if(is){
        $('.another').css('background-color', '');
    }else{
        $('.me').css('background-color', '');
    }
}

