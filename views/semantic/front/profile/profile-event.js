/**HOME-PROFILE*/
function load_home(token, id) {
    update_data_profile(token,id).then(function (profile) {
        getImage(JSON.stringify({'path': [profile.path_avatar]})).then(function (base64string) {
            $('#content-column-block').load('../parts/profile-parts/center/main/post-content.ejs', function () {
                $('#left-column-block').load('../parts/profile-parts/left/left-column.ejs', function () {

                    $('#avatar').attr("src", base64string);
                    let dateString = get_date(profile.dateCreateAccount);
                    // console.log("dateString ",dateString);
                    $('#date-create-account').html(dateString);
                    $('#name-user').html(profile.name +' '+ profile.surname);
                    $('#data-birthday').html(profile.birthday);
                    $('#data-phone').html(profile.phone);
                    $('#data-about').html(profile.about);
                    update_data_post_ad(token,id).then(function (post_ad) {
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
        $('#content-column-block').load('../parts/profile-parts/center/main/post-content.ejs', function () {
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
