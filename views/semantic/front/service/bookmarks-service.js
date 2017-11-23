function load_bookmarks(token,id){
    update_data_profile(token, id).then(function (profile) {
        getImage(JSON.stringify({'path': [profile.path_avatar]})).then(function (base64string) {
            $('#left-column-block').load('../parts/profile-parts/left/left-column.ejs', function () {
                $('#avatar').attr("src", base64string);
                $('#name-user').html(profile.name + ' ' + profile.surname);
                let dateString = get_date(profile.dateCreateAccount);
                $('#date-create-account').html(dateString);

            });
            show_bookmarks();
        });
    });
}
function show_bookmarks(){
    update_favorites_post_ad(window.token).then(function (favorites_post_ad) {
        $.get('../parts/profile-parts/center/bookmarks/bookmarks.ejs', function(data){
            $('#content-column-block').empty().append(data);

            if (typeof favorites_post_ad !== 'undefined') {

                for (let index = 0; index < favorites_post_ad.length; index++) {
                    let json_image = JSON.stringify({'path': [favorites_post_ad[index].jsonPathAvatar[0], favorites_post_ad[index].jsonPathAvatar[1]]});

                    $.get('../parts/profile-parts/center/main/post-ad-active.ejs', function (data) {
                        let textWall = favorites_post_ad[index].jsonText.wallTextArea.substring(0, 162) +'...';
                        $('#ad-post-content').prepend(data);
                        $('#id').attr("id", favorites_post_ad[index].id);
                        $(`#${favorites_post_ad[index].id}`).find('#header-post-ad').html(favorites_post_ad[index].jsonText.header);
                        $(`#${favorites_post_ad[index].id}`).find('#meta-data-postad').html(favorites_post_ad[index].jsonText.date);
                        $(`#${favorites_post_ad[index].id}`).find('#text-wall').html(textWall);
                        getImage(json_image).then(function (base64string) {
                            let base_array = JSON.parse(JSON.stringify(base64string));
                            $(`#${favorites_post_ad[index].id}`).find('#first-image').attr("src", base_array[0]);
                            $(`#${favorites_post_ad[index].id}`).find('#second-image').attr("src", base_array[1]);

                        });
                        $('#'+favorites_post_ad[index].id).find('#tag-column-post-ad').prepend('<div class="ui label" id="tag-pet" style="margin-top: 5px">'+favorites_post_ad[index].jsonTags.animals+'</div>');
                        $('#'+favorites_post_ad[index].id).find('#tag-column-post-ad').prepend('<div class="ui label" id="tag-pet" style="margin-top: 5px">'+favorites_post_ad[index].jsonTags.group+'</div>');
                        $('#'+favorites_post_ad[index].id).find('#tag-column-post-ad').prepend('<div class="ui label" id="tag-pet" style="margin-top: 5px">'+favorites_post_ad[index].jsonTags.breeds+'</div>');
                        $('#'+favorites_post_ad[index].id).find('#tag-column-post-ad').prepend('<div class="ui label" id="tag-pet" style="margin-top: 5px">'+favorites_post_ad[index].jsonTags.age+'</div>');

                        for (let i = 0; i < favorites_post_ad[index].jsonTags.own_tags.length; i++){
                            $('#'+favorites_post_ad[index].id).find('#tag-column-post-ad').prepend('<div class="ui label" id="tag-pet" style="margin-top: 5px">'+favorites_post_ad[index].jsonTags.own_tags[i]+'</div>');
                        }
                    });
                }
            }
        });
    });
}