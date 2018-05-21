import ImageAjax            from    '/assets/js/custom/image/image.ajax.js'
import ProfileAjax          from    '/assets/js/custom/profile/profile.ajax.js'
import PostModule           from    '/assets/js/custom/post/post.module.js'
import ModalQuickMessage    from    '/assets/js/custom/messages/quick/quick.messages.module.js'

const id_redirect    = window.localStorage.getItem('id_redirect');
const id_account    = window.localStorage.getItem('id_account');
const token = window.localStorage.getItem('token');
const me = window.localStorage.getItem('is_me');

function set_main(profile_json) {

    if (profile_json !== undefined){
        console.log('воркает');
        console.log('profile_json ',profile_json);
        set_card(profile_json);
        set_left_column(profile_json);
        PostModule.get_posts(id_redirect, token).then(post_ad => {
            PostModule.set_posts(post_ad);
        })
    }else{
        console.log('#INFO[profile.module.js][set_main] profile undefined!');
    }
}
function set_card(profile_json){
    $('#right_column').load('/columns/profile/right.ejs', () => {
        $('#data-phone').append(profile_json.phone);
        $('#data-about').append(profile_json.about);
        $('#data-birthday').append(profile_json.birthday);

    })
}
function set_left_column_bookmarks(profile) {
    $('#left_column').load('/columns/profile/left.ejs', () => {
        $('#avatar').attr('src', profile.base64avatar);
        $('#name-user').append(`${profile.name} ${profile.surname}`);

    });
}
function set_left_column(profile_json) {
    $('#left_column').load('/columns/profile/left.ejs', () => {
        $('#avatar').attr('src', profile_json.base64avatar);
        $('#name-user').append(`${profile_json.name} ${profile_json.surname}`);
        const left_column = $('#left_column');
        if (me === 'true') {
            left_column.append('' +
                '<a class="ui fluid button" onClick="window.location.href = \'/advertisement/add\'">' +
                '   <i class="add icon"></i>Добавить объявление\n            </a>'
            );
        } else {
            left_column.append('' +
                '<a class="ui fluid button" id="quick-message-button" >' +
                '   <i class="mail icon"></i>Отправить сообщение' +
                '</a>')
        }
    })
}
function save_local_storage(){
    let profile = window.localStorage.getItem(id_redirect);
    if (profile === null){
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
        ProfileAjax.get_profile(id_redirect, token).then(profile => {
            ImageAjax(JSON.stringify({ path: [profile.path_avatar]})).then( images => {
                profile_json.id = profile.id;
                profile_json.name = profile.name;
                profile_json.surname = profile.surname;
                profile_json.email = profile.email;
                profile_json.phone = profile.phone;
                profile_json.birthday = profile.birthday;
                profile_json.about = profile.about;
                profile_json.base64avatar = images;
                profile_json.dateCreateAccount = profile.dateCreateAccount;
                window.localStorage.setItem(profile_json.id, JSON.stringify(profile_json));
                set_main(JSON.parse(window.localStorage.getItem(id_redirect)));
            })
        })
    }else{
        set_main(JSON.parse(profile));
        console.log('#INFO[profile.module.js][save_local_storage] already have in storage!');
    }
}

$(() => {
    if (window.location.pathname.substring(0,9) === '/profile/'){
       save_local_storage();

        $('#post_show').on('click', event => {
            $('#right_column').empty();
            ProfileAjax.get_profile(id_redirect, token).then(profile => {
                set_card(profile)
            });
            PostModule.get_posts(id_redirect, token).then(post_ad => {
                PostModule.set_posts(post_ad);
            });
        });

        $(document).on('click', '#quick-message-button' ,function(event){
            ModalQuickMessage.modal_show();
            ModalQuickMessage.load_messages();

        })

    }


});
export default {
    set_left_column: set_left_column,
    set_left_column_bookmarks: set_left_column_bookmarks,

    async get_profile(id, token){
        return await ProfileAjax.get_profile(id,token);
    }
}