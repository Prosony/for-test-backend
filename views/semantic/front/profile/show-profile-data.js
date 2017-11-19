/**
 * load data
 * */
function load_home(token, id) {
    update_data_profile(token,id).then(function (profile) {

        getImage(JSON.stringify({'path': [profile.path_avatar]})).then(function (base64string) {
            $('#content-column-block').load('../parts/profile-parts/center/main/post-content.ejs', function () {
                $('#left-column-block').load('../parts/profile-parts/left/left-column.ejs', function () {

                    $('#avatar').attr("src", "data:image/png;base64,"+base64string);
                    let dateString = get_date(profile.dateCreateAccount);
                    console.log("dateString ",dateString);
                    $('#date-create-account').html(dateString);
                    $('#name-user').html(profile.name +' '+ profile.surname);
                    $('#data-birthday').html(profile.birthday);
                    $('#data-phone').html(profile.phone);
                    $('#data-about').html(profile.about);
                    update_data_post_ad(token,id).then(function (post_ad) {

                       // console.log('post_ad: ',JSON.parse(JSON.stringify(post_ad)));
                       console.log('post_ad',post_ad);
                       // console.log('post_ad.id: ',post_ad[0].jsonTags.age);
                        set_post_ad(post_ad);
                    });
                });
            });
        });
    });
}
function set_post_ad(post_ad){
    update_favorites_post_ad(window.token).then(function (favorites_post_ad) {
        if (typeof post_ad !== 'undefined') {

            for (let index = 0; index < post_ad.length; index++) {
                // console.log('post_ad[index].pathToImageFirst: ', post_ad[index].pathToImageFirst);
                // console.log('post_ad[index].pathToImageSecond: ', post_ad[index].pathToImageSecond);
                let json_image = JSON.stringify({'path': [post_ad[index].jsonPathAvatar[0], post_ad[index].jsonPathAvatar[0]]});
                $.get('../parts/profile-parts/center/main/post-ad-noactive.ejs', function(data){
                    $('#ad-post-content').append(data);
                    $('#id').attr("id", post_ad[index].id);
                    $('#'+post_ad[index].id).find('#header-post-ad').html(post_ad[index].header);
                    $('#'+post_ad[index].id).find('#meta-data-postad').html(post_ad[index].date.day + '.' + post_ad[index].date.month + '.' + post_ad[index].date.year);
                    $('#'+post_ad[index].id).find('#text-wall').html(post_ad[index].wallText.substring(0, 162) +'...');
                    getImage(json_image).then(function (base64string) {
                        let base_array = JSON.parse(JSON.stringify(base64string));
                        $('#'+post_ad[index].id).find('#first-image').attr("src", "data:image/png;base64," + base_array[0]);
                        $('#'+post_ad[index].id).find('#second-image').attr("src", "data:image/png;base64," + base_array[1]);
                    });
                    for (let i = 0; i < post_ad[index].listTag.length; i++){
                            $('#'+post_ad[index].id).find('#tag-column-post-ad').prepend('<div class="ui label" id="tag-pet" style="margin-top: 5px">'+post_ad[index].listTag[i]+'</div>');
                    }
                    if (typeof favorites_post_ad !== 'undefined') {
                        for (let index_fav = 0; index_fav < favorites_post_ad.length; index_fav++) {
                            console.log('index_fav: ', favorites_post_ad[index_fav].id);
                            console.log('index: ', post_ad[index].id);
                            if (favorites_post_ad[index_fav].id === post_ad[index].id) {
                                console.log('your favorites');
                                $('#' + favorites_post_ad[index_fav].id).find('.favorite.icon').addClass('active');
                                $('#' + favorites_post_ad[index_fav].id).find('#data-tooltip-win').attr('data-tooltip', 'Delete from Bookmarks?');
                            }
                        }
                    }
                });
            }
        }
    });
}
function load_bookmarks(token,id){
    update_data_profile(token, id).then(function (profile) {
        getImage(JSON.stringify({'path': [profile.path_avatar]})).then(function (base64string) {
            $('#left-column-block').load('../parts/profile-parts/left/left-column.ejs', function () {
                $('#avatar').attr("src", "data:image/png;base64," + base64string);
                $('#name-user').html(profile.name + ' ' + profile.surname);
                let dateString = get_date(profile.dateCreateAccount);
                $('#date-create-account').html(dateString);

            });
            show_bookmarks();
        });
    });
}
/**
 * show data
 * */
function show_bookmarks(){

        update_favorites_post_ad(window.token).then(function (favorites_post_ad) {
            $.get('../parts/profile-parts/center/bookmarks/bookmarks.ejs', function(data){
                $('#content-column-block').empty().append(data);

                if (typeof favorites_post_ad !== 'undefined') {

                    for (let index = 0; index < favorites_post_ad.length; index++) {
                        let json_image = JSON.stringify({'path': [favorites_post_ad[index].pathToImageFirst, favorites_post_ad[index].pathToImageSecond]});

                        $.get('../parts/profile-parts/center/main/post-ad-active.ejs', function (data) {
                            let textWall = favorites_post_ad[index].wallText.substring(0, 162) +'...';
                            $('#ad-post-content').prepend(data);
                            $('#id').attr("id", favorites_post_ad[index].id);
                            $(`#${favorites_post_ad[index].id}`).find('#header-post-ad').html(favorites_post_ad[index].header);
                            $(`#${favorites_post_ad[index].id}`).find('#meta-data-postad').html(favorites_post_ad[index].date.day + '.' + favorites_post_ad[index].date.month + '.' + favorites_post_ad[index].date.year);
                            $(`#${favorites_post_ad[index].id}`).find('#text-wall').html(textWall);
                            getImage(json_image).then(function (base64string) {
                                let base_array = JSON.parse(JSON.stringify(base64string));
                                $(`#${favorites_post_ad[index].id}`).find('#first-image').attr("src", "data:image/png;base64," + base_array[0]);
                                $(`#${favorites_post_ad[index].id}`).find('#second-image').attr("src", "data:image/png;base64," + base_array[1]);

                            });
                            for (let i = 0; i < favorites_post_ad[index].listTag.length; i++){
                                $(`#${favorites_post_ad[index].id}`).find('#tag-column-post-ad').prepend('<div class="ui label" id="tag-pet" style="margin-top: 5px">'+favorites_post_ad[index].listTag[i]+'</div>');
                            }
                        });
                    }
                }
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