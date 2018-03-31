import ImageAjax      from '/assets/js/custom/image/image.ajax.js'
import ProfileAjax    from '/assets/js/custom/profile/profile.ajax.js'
import PostModule       from '/assets/js/custom/post/post.module.js'

const id    = window.localStorage.getItem('id_account');
const token = window.localStorage.getItem('token');
const me = window.localStorage.getItem('is_me');

function set_main() {
    ProfileAjax.get_profile(id, token).then(profile => {
        ImageAjax(JSON.stringify({ path: [profile.path_avatar]})).then(images => {
            console.log('воркает');
            set_card(profile);
            set_left_column(profile, images);
            PostModule.get_posts(id, token).then(post_ad => {
                PostModule.set_posts(post_ad);
            })
        }).catch(error => {
            console.error(`#ERROR : ${error.message}`)
        })
    }).catch(error => {
        console.error(`#ERROR : ${error.message}`)
    });
}
function set_card(profile){
    $('#right_column').load('/columns/profile/right.ejs', () => {
        $('#data-phone').append(profile.phone)
        $('#data-about').append(profile.about)
        $('#data-birthday').append(profile.birthday)

    })
}
function set_left_column(profile,images) {
    $('#left_column').load('/columns/profile/left.ejs', () => {
        $('#avatar').attr('src', images)
        $('#name-user').append(`${profile.name} ${profile.surname}`)
        const left_column = $('#left_column');
        if (me) {
            left_column.append('' +
                '<a class="ui fluid button" onClick="window.location.href = \'/advertisement/add\'">' +
                '   <i class="add icon"></i>Add Advertisement\n            </a>'
            );
        } else {
            left_column.append('' +
                '<a class="ui fluid button" href="/add-advertisement" >' +
                '   <i class="mail icon"></i>Send message' +
                '</a>')
        }
    })
}
export default {
    set_main: set_main,
    set_card: set_card,
    set_left_column: set_left_column,

    async get_profile(id, token){
        return await ProfileAjax.get_profile(id,token);
    }
}