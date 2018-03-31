import PostModule from "/assets/js/custom/post/post.module.js";
// import ProfileAjax from "/assets/js/custom/profile.ajax.js";
import ProfileModule from "/assets/js/custom/profile/profile.module.js"

const token = window.localStorage.getItem('token');
const id_account = window.localStorage.getItem('id_account');
const me = window.localStorage.getItem('is_me');

$(() => {
    ProfileModule.set_main();

    $('#post_show').on('click', event => {
        $('#right_column').empty();
        ProfileModule.get_profile(id_account, token).then(profile => {
            ProfileModule.set_card(profile)
        });
        PostModule.get_posts(id_account, token).then(post_ad => {
            PostModule.set_posts(post_ad);
        });
    });

});