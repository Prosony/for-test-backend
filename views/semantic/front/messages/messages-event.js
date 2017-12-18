
var id_dialog;

var j_array_data_my = JSON.parse('{' +
    '    "full_name":"",' +
    '    "img":""' +
    '}');
var j_array_data_incoming = JSON.parse('{' +
    '    "full_name" : "",' +
    '    "img":""' +
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

    // let id_incoming_account = $('#'+id_dialog_block).find('.ui.header').attr('id');
    // console.log('click id_dialog_block: ',id_dialog_block);
    // console.log('account imcoming id: ',id_incoming_account);
    // console.log('header ', $('#'+id_dialog_block).find('.ui.header')[0].innerHTML);

    $('#message-scroll-block').removeClass('disabled');
    $('#input-message').removeClass('disabled');
    $('#send-msg-btn').removeClass('disabled');

    id_dialog = id_dialog_block;
    j_array_data_incoming.full_name = $('#'+id_dialog_block).find('.ui.header')[0].innerHTML;
    j_array_data_incoming.img = $('#'+id_dialog_block).find('img').attr("src");
    $('#messages-block').find('.ui.minimal.comments').remove();
    get_messages_by_id_dialog(window.token, id_dialog_block).then( function (j_array_messages) {

        console.log('messages: ',j_array_messages);
        if (typeof j_array_messages !== 'undefined'){
            for (let index = 0; index < j_array_messages.length; index++){
                if(j_array_messages[index].idOutcomingAccount === window.id_account){
                    $('#messages-block').append(' <div class="ui minimal comments" id="'+j_array_messages[index].idMessage+'">\n' +
                        '                    <div class="comment">\n' +
                        '                        <a class="avatar">\n' +
                        '                            <img src="'+j_array_data_my.img+'">\n' +
                        '                        </a>\n' +
                        '                        <div class="content">\n' +
                        '                            <a class="author">'+j_array_data_my.full_name+'</a>\n' +
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
                        '                    </div>\n' +
                        '                </div>');
                    $('#message-scroll-block').scrollTop($('#message-scroll-block')[0].scrollHeight);
                }else{
                    $('#messages-block').append(' <div class="ui minimal comments" id="'+j_array_messages[index].idMessage+'">\n' +
                        '                    <div class="comment">\n' +
                        '                        <a class="avatar">\n' +
                        '                            <img src="'+j_array_data_incoming.img+'">\n' +
                        '                        </a>\n' +
                        '                        <div class="content">\n' +
                        '                            <a class="author">'+j_array_data_incoming.full_name+'</a>\n' +
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
                        '                    </div>\n' +
                        '                </div>');
                    $('#message-scroll-block').scrollTop($('#message-scroll-block')[0].scrollHeight);
                }
            }
        }else{
            console.log('#INFO [message-event] [open_dialog] message not found!');
        }

    });
}
function show_message(message, is_me) {
    if (id_dialog === message.id_dialog){
        let target;
        if(is_me){
            target = j_array_data_my;
        }else{
            target = j_array_data_incoming;
        }
        $('#messages-block').append(' <div class="ui minimal comments" id="'+message.id_message+'" style="margin-top: 5px;">\n' +
            '                    <div class="comment">\n' +
            '                        <a class="avatar">\n' +
            '                            <img src="'+target.img+'">\n' +
            '                        </a>\n' +
            '                        <div class="content">\n' +
            '                            <a class="author">'+target.full_name+'</a>\n' +
            '                            <div class="metadata">\n' +
            '                                <span class="date">'+get_date_time(new Date(message.date_time))+'</span>\n' +
            '                            </div>\n' +
            '                            <div class="text">\n' +
            '                                <p>'+message.message+'</p>\n' +
            '                            </div>\n' +
            '                            <div class="actions">\n' +
            '                                <a class="delete">Delete</a>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '                </div>');
        $('#message-scroll-block').scrollTop($('#message-scroll-block')[0].scrollHeight);
        // console.log('#last-message-block ', $('#'+json_message.id_dialog).find('#last-message-block'));

    }
}
 function get_my_data() {
     update_data_profile(window.token, window.id_account).then(function (profile) {
         j_array_data_my.full_name = profile.name +' '+profile.surname;
         getImage(JSON.stringify({'path': [profile.path_avatar]})).then(function (base64image) {
             j_array_data_my.img = base64image;
             console.log('#INFO [messages-event.js] [get_my_data] j_array_data_my.full_name: '+j_array_data_my.full_name);
         });
     });
 }

 // function
