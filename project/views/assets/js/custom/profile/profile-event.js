/**HOME-PROFILE*/
function render_button() {
    if (window.localStorage.getItem('is_me')) {
        $('#left_column').append(
            '<a class="ui fluid button" href="/add-advertisement">\n' +
            '    <i class="add icon"></i>Add Advertisement\n' +
            '</a>');
    }else{
        $('#left_column').append(
            '    <a class="ui fluid button" href="/add-advertisement" >\n' +
            '        <i class="mail icon"></i>Send message\n' +
            '    </a>');
    }
}
function load_home(token, id) {
    update_data_profile(token,id).then(function (profile) {
        console.log("#INFO [load_page] profile: ",profile);
        getImage(JSON.stringify({'path': [profile.path_avatar]})).then(function (base64string) {
            $('#right_column').load('/columns/profile/right.ejs', function () {
                $('#left_column').load('/columns/profile/left.ejs', function () {

                    $('#avatar').attr("src", base64string);
                    let dateString = get_date(profile.dateCreateAccount);
                    console.log("profile.birthday: "+profile.birthday);
                    $('#name-user').append(profile.name +' '+ profile.surname);
                    $('#data-birthday').append(profile.birthday);
                    $('#data-phone').append(profile.phone);
                    $('#data-about').append(profile.about);
                    update_data_post_ad(window.localStorage.getItem('token'), window.localStorage.getItem('id_account')).then(function (post_ad) {
                        console.log('post_ad',post_ad);
                        set_post_ad(post_ad);
                    });
                });
            });
        });
    });
}
function show_home(token, id){
    update_data_profile(token, id).then(function (profile) {
        $('#left_column').load('../parts/profile-parts/center/main/post-content.ejs', function () {
            $('#name-user').html(profile.name +' '+ profile.surname);
            $('#data-birthday').html(profile.birthday);
            $('#data-phone').html(profile.phone);
            $('#data-about').html(profile.about);
            update_data_post_ad(token,id).then(function (post_ad) {
                set_post_ad(post_ad);
            });
        });
    });
}
/**BOOKMARKS*/
