import ImageAjax            from    '/assets/js/custom/image/image.ajax.js'
import ProfileModule        from    '/assets/js/custom/profile/profile.module.js'
import SocketModule         from    '/assets/js/custom/messages/socket.module.js'
import DateModule           from    '/assets/js/custom/date/date.module.js'
import MessagesAjax         from    '/assets/js/custom/messages/messages.ajax.js'

const token = window.localStorage.getItem('token');
const id_account = window.localStorage.getItem('id_account');

let id_dialog;
// let id_interlocutor;   // or let id_interlocutor = document.getElementById(id_dialog).getElementsByTagName('h4')[0].id; //get id interlocutor
let j_array_data_my = JSON.parse('{' +
    '    "full_name":"",' +
    '    "img":"",' +
    '    "id_account":""' +
    '}');
let j_array_data_interlocutor = JSON.parse('{' +
    '    "full_name" : "",' +
    '    "img":"",' +
    '    "id_account":""' +
    '}');

function set_dialog(){
    MessagesAjax.get_all_dialogs(token).then(function (json_dialogs) {
        console.log('#INFO [set_dialog_block] json_dialogs: ',json_dialogs);

        let length = json_dialogs.length;
        for (let index = 0; index < length; index ++){
            if(json_dialogs[index].idOutcomingAccount === id_account){
                show_dialog(json_dialogs[index].idIncomingAccount, json_dialogs[index]);
            }else{
                show_dialog(json_dialogs[index].idOutcomingAccount, json_dialogs[index]);
            }

        }
    });
}
function set_last_message(id_dialog,message){
    $('#' + id_dialog).find('#last-message-block').text(message.substring(0, 36));
}
function show_dialog(id, dialog){
    // console.log(dialog)
    // console.log(`idOutcomingAccount: `, dialog.idOutcomingAccount )
    // dialog.idOutcomingAccount === id_account ? id_interlocutor = dialog.idAccountIncoming : id_interlocutor = dialog.idOutcomingAccount;
    // console.log(`#INFO [messages.module.js][show_dialog] id_interlocutor: `,id_interlocutor);


    ProfileModule.get_profile(id, token).then(function (profile) {//TODO rewrite to get all profile.
        console.log('Profile: ',profile);
        // id_interlocutor = id;
        j_array_data_interlocutor.id_account = id;
        ImageAjax(JSON.stringify({'path': [profile.path_avatar]})).then(function (base64image) {
            console.log(dialog)
            MessagesAjax.get_last_message_by_id_dialog(token, dialog.idDialog).then( function (last_message) {
                $('#dialog-block').append(
                  '<div class="item dialog" id="' + dialog.idDialog + '">\n' +
                  '  <div class="ui mini image">\n' +
                  '    <img src="' + base64image + '">\n' +
                  '  </div>\n' +
                  '  <div class="content">\n' +
                  '    <h4 class="ui header" id="' + id + '">' + profile.name + ' ' + profile.surname + '</h4>\n' +
                  '    <div class="description" id="last-message-block">\n' +
                  '      <p>' + id + '</p>\n' +
                  '    </div>\n' +
                  '  </div>\n' +
                  '</div>\n');
                console.log(`last message: `,last_message);
                set_last_message(dialog.idDialog, last_message.message.substring(0, 36));
            });
        });
    });
}
function open_dialog(element, id_dialog_block) {
    $('#messages-block').empty();
    $('#input-message').removeClass('disabled');
    $('.input').removeClass('disabled');
    $('.button').removeClass('disabled');

    id_dialog = id_dialog_block;
    j_array_data_interlocutor.full_name = $('#'+id_dialog_block).find('.ui.header')[0].innerHTML;
    j_array_data_interlocutor.img = element.find('img').attr("src");
    j_array_data_interlocutor.id_account = element.find('.ui.header').attr("id");

    $('#name').html(j_array_data_interlocutor.full_name);
    $('#messages-block').find('.ui.minimal.comments').remove();

    MessagesAjax.get_messages_by_id_dialog(token, id_dialog).then( function (j_array_messages) {

        if (typeof j_array_messages !== 'undefined'){

            for (let index = 0; index < j_array_messages.length; index++){
                if(j_array_messages[index].idOutcomingAccount === id_account){ //is my MessageModule or not
                    $('#messages-block').append(
                        '                    <div class="comment me" id="'+j_array_messages[index].idMessage+'" >\n' +
                        '                        <a class="avatar">\n' +
                        '                            <img src="'+j_array_data_my.img+'">\n' +
                        '                        </a>\n' +
                        '                        <div class="content">\n' +
                        '                            <a class="author" href="/profile/'+id_account+'">'+j_array_data_my.full_name+'</a>\n' +
                        '                            <div class="metadata">\n' +
                        '                                <span class="date">'+DateModule.translate_timestamp(new Date(j_array_messages[index].date))+'</span>\n' +
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
                        '                            <img src="'+j_array_data_interlocutor.img+'">\n' +
                        '                        </a>\n' +
                        '                        <div class="content">\n' +
                        '                            <a class="author" href="/profile/'+j_array_data_interlocutor.id_account+'">'+j_array_data_interlocutor.full_name+'</a>\n' +
                        '                            <div class="metadata">\n' +
                        '                                <span class="date">'+DateModule.translate_timestamp(new Date(j_array_messages[index].date))+'</span>\n' +
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

                if (!j_array_messages[index].isRead){   //setPost color by isRead in msg
                    $('#'+j_array_messages[index].idMessage).css({'background-color':'rgba(113,111,122,0.11)'});
                }
            }
            SocketModule.ws_message_has_read(id_dialog); // send by socket that MessageModule is read
        }else{
            console.log('#INFO [messages.module.js][open_dialog] MessageModule not found!');
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
            target = j_array_data_interlocutor;
        }
        console.log(`message.data.date: `,message.data.date);
        $('#messages-block').append(
            '                    <div class="comment '+blabla+'" id="'+message.data.id_message+'" style="background-color:rgba(113,111,122,0.11);">\n' +
            '                        <a class="avatar">\n' +
            '                            <img src="'+target.img+'">\n' +
            '                        </a>\n' +
            '                        <div class="content">\n' +
            '                            <a class="author" href="/profile/'+target.id_account+'">'+target.full_name+'</a>\n' +
            '                            <div class="metadata">\n' +
            '                                <span class="date">'+DateModule.translate_timestamp(new Date(message.data.date))+'</span>\n' +
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
     ProfileModule.get_profile(id_account, token).then(function (profile) {
         j_array_data_my.full_name = profile.name +' '+profile.surname;
         j_array_data_my.id_account = id_account;
         ImageAjax(JSON.stringify({'path': [profile.path_avatar]})).then(function (base64image) {
             j_array_data_my.img = base64image;
             console.log('#INFO [messages.module.js] [get_my_data] j_array_data_my.full_name: '+j_array_data_my.full_name);
         });
     });
 }
 function get_id_dialog(){
    return id_dialog;
 }
export default {

    get_uuid: MessagesAjax.get_uuid,
    get_unread: MessagesAjax.get_unread,
    get_all_dialogs: MessagesAjax.get_all_dialogs,
    create_dialog: MessagesAjax.create_dialog,
    get_dialog: MessagesAjax.get_dialog,
    get_messages_by_id_dialog: MessagesAjax.get_messages_by_id_dialog,
    get_last_message_by_id_dialog: MessagesAjax.get_last_message_by_id_dialog,
    get_last_some_messages: MessagesAjax.get_last_some_messages,

    open_dialog: open_dialog,
    set_last_message: set_last_message,
    show_message: show_message,
    get_my_data: get_my_data,
    set_dialog: set_dialog,
    get_id_dialog: get_id_dialog
}


