import MessagesModule   from    '/assets/js/custom/messages/messages.module.js';
import ProfileModule    from    '/assets/js/custom/profile/profile.module.js'
import ImageAjax        from    '/assets/js/custom/image/image.ajax.js'
import Socket           from    '/assets/js/custom/messages/socket.js';

const   id_redirect = window.localStorage.getItem('id_redirect');
const   id_account  = window.localStorage.getItem('id_account');
const   token       = window.localStorage.getItem('token');
let     path        = window.location.pathname;
let     dialog;

function modal_show(){
    $.get('/layout/modal/modal.message.ejs', function(modal){
        let redirect = JSON.parse(window.localStorage.getItem(id_redirect));
        $('#modal').append(modal);
        $('#modal').find('#name-head').append(redirect.name +' '+redirect.surname).find('#head-avatar').attr('src',redirect.base64avatar[0]);
        $('#modal-quick-message').modal({
            onHidden: function(){
                $('#modal').empty();
                $('.modals').remove();
                window.localStorage.setItem("quick_message",false);
            },
            onShow: function(){
                console.log('shown');
                window.localStorage.setItem("quick_message",true);
            },
            blurring: true
        }).modal('show');

    })
}
function load_messages(){ // TODO add image if message is empty or dialog not created

    MessagesModule.get_dialog(token, id_redirect).then(dialog_local =>{
        dialog = dialog_local;
        console.log(`DIALOG: `,dialog);
        MessagesModule.get_last_some_messages(token, dialog_local.idDialog, 10).then(messages =>{
            console.log(messages);
            let me = JSON.parse(window.localStorage.getItem(id_account));
            let redirect = JSON.parse(window.localStorage.getItem(id_redirect));
            if (messages !== undefined){
                for (let index = messages.length-1; index > -1; index--) {
                    if (messages[index].idOutcomingAccount === id_account){
                        print_messages(messages[index], me);
                    }else{
                        print_messages(messages[index], redirect);
                    }
                }
            }
        });
    })
}
function set_message(message) {
    let profile_json = {
        id:"",
        name:"",
        surname:"",
        email:"",
        phone:"",
        birthday: "",
        about: "",
        base64avatar:"",
        dateCreateAccount:""
    };
    console.log(message);
    ProfileModule.get_profile(message.id_outcoming_account, token).then(profile =>{
        ImageAjax(JSON.stringify({ path: [profile.path_avatar]})).then(base64avatar =>{
            profile_json.id = profile.id;
            profile_json.name = profile.name;
            profile_json.surname = profile.surname;
            profile_json.email = profile.email;
            profile_json.phone = profile.phone;
            profile_json.birthday = profile.birthday;
            profile_json.about = profile.about;
            profile_json.base64avatar = base64avatar;
            profile_json.dateCreateAccount = profile.dateCreateAccount;
            print_messages(message, profile_json);
        })
    })
}
function print_messages(message, profile){
    console.log(message);
        $('#preview-messages').append('' +
            '<div class="comment" style="height: 50px">\n' +
'                        <a class="avatar">\n' +
'                            <img src="'+profile.base64avatar[0]+'">\n' +
'                        </a>\n' +
'                        <div class="content">\n' +
'                            <a class="author" >'+profile.name+' '+profile.surname+'</a>\n' +
'                            <div class="metadata">\n' +
'                                <span class="date">'+DateModule.translate_timestamp(new Date(message.date))+'</span>\n' +
'                            </div>\n' +
'                            <div class="text">\n' +
'                                <p>'+message.message+'</p>\n' +
'                            </div>\n' +
'                        </div>\n' +
'                    </div>');
    $('#preview-messages').scrollTop($('#preview-messages')[0].scrollHeight);
}
function ws_send_quick_message(dialog, token, id_account_outcoming, id_account_incoming){
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
    console.log(`value: `,value);
    if(typeof value !== 'undefined' || value !== "") {
        if (typeof dialog === 'undefined') {
            console.log('CREATE DIALOG');
            MessagesModule.set_dialog(token, id_account_outcoming, id_account_incoming).then(dialog => {
                console.log('MessagesModule.dialog: ', dialog);
                MessagesModule.get_uuid('messages').then(function (uuid) {
                    message_pack.type = "message";
                    message_pack.data.id_message = uuid;
                    message_pack.data.id_dialog = dialog.idDialog;
                    message_pack.data.id_outcoming_account = id_account;
                    message_pack.data.date = Date.now();
                    message_pack.data.message = value;
                    message_pack.data.is_read = false;
                    console.log('#INFO [SOCKET] [socket.module.js] [ws_send_message] message: ', message_pack);
                    Socket.socket.send(JSON.stringify(message_pack));
                });
            })
        } else {
            console.log('USE AVAILABLE DIALOG');
            console.log('MessagesModule.dialog: ', dialog);
            MessagesModule.get_uuid('messages').then(function (uuid) {
                message_pack.type = "message";
                message_pack.data.id_message = uuid;
                message_pack.data.id_dialog = dialog.idDialog;
                message_pack.data.id_outcoming_account = id_account;
                message_pack.data.date = Date.now();
                message_pack.data.message = value;
                message_pack.data.is_read = false;
                console.log('#INFO [SOCKET] [socket.module.js] [ws_send_message] message: ', message_pack);
                Socket.socket.send(JSON.stringify(message_pack));
                let profile = JSON.parse(window.localStorage.getItem(id_account));

                print_messages( message_pack.data, profile);
            });
        }
    }
}
$(() => {
    if (path.substring(0,9) === '/profile/') {
        $(document).on('click', '#ws_quick_send_button' ,function(event){
        // $('#ws_quick_send_button').unbind("click").click(function() {
            console.log("SEEEND");
            ws_send_quick_message(dialog, token, id_account, id_redirect);
            // $('#modal-quick-message').modal('hide')
        })
    }
});
export default {
    modal_show: modal_show,
    load_messages: load_messages,
    print_messages: print_messages,
    set_message: set_message
}