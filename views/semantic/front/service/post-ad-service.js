function set_post_ad(post_ad){
    update_favorites_post_ad(window.token).then(function (favorites_post_ad) {
        if (typeof post_ad !== 'undefined') {
            let path;
            console.log('is_me its',window.is_me);
            if (window.is_me ==='true'){
                path ='../parts/profile-parts/center/main/post-ad-me.ejs'
            }else{
                path = '../parts/profile-parts/center/main/post-ad-noactive.ejs'
            }
            for (let index = 0; index < post_ad.length; index++) {
                let json_image = JSON.stringify({'path': [post_ad[index].jsonPathAvatar[0], post_ad[index].jsonPathAvatar[1]]});
                $.get(path, function(data){
                    console.log('post_ad[index]: ',post_ad[index]);
                    $('#ad-post-content').append(data);
                    $('#id').attr("id", post_ad[index].id);
                    $('#'+post_ad[index].id).find('#header-post-ad').html(post_ad[index].jsonText.header);
                    $('#'+post_ad[index].id).find('#meta-data-postad').html(post_ad[index].jsonText.date);
                    $('#'+post_ad[index].id).find('#text-wall').html(post_ad[index].jsonText.wallTextArea.substring(0, 162) +'...');
                    getImage(json_image).then(function (base64string) {
                        let base_array = JSON.parse(JSON.stringify(base64string));
                        // $('#'+post_ad[index].id).append('<img src="'+base_array[0]+'">')
                        $('#'+post_ad[index].id).find('#first-image').attr("src", base_array[0]); //
                        $('#'+post_ad[index].id).find('#second-image').attr("src", base_array[1]);
                    });
                    for (let i = 0; i < post_ad[index].jsonTags.own_tags.length; i++){
                        $('#'+post_ad[index].id).find('#tag-column-post-ad').prepend('<div class="ui label" id="tag-pet" style="margin-top: 5px">'+post_ad[index].jsonTags.own_tags[i]+'</div>');
                    }
                    $('#'+post_ad[index].id).find('#tag-column-post-ad').prepend('<div class="ui teal label" id="tag-pet" style="margin-top: 5px">'+post_ad[index].jsonTags.gender+'</div>');
                    $('#'+post_ad[index].id).find('#tag-column-post-ad').prepend('<div class="ui teal label" id="tag-pet" style="margin-top: 5px">'+post_ad[index].jsonTags.age+'</div>');
                    $('#'+post_ad[index].id).find('#tag-column-post-ad').prepend('<div class="ui teal label" id="tag-pet" style="margin-top: 5px">'+post_ad[index].jsonTags.breeds+'</div>');
                    $('#'+post_ad[index].id).find('#tag-column-post-ad').prepend('<div class="ui teal label" id="tag-pet" style="margin-top: 5px">'+post_ad[index].jsonTags.group+'</div>');
                    $('#'+post_ad[index].id).find('#tag-column-post-ad').prepend('<div class="ui teal label" id="tag-pet" style="margin-top: 5px">'+post_ad[index].jsonTags.animals+'</div>');

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

function clear_pos_ad(){
    $('#ad-post-content').find('.ui.items').remove();
}
function delete_post_ad(id_post_ad){
    delete_post_ad_server(window.token, id_post_ad);
    $(`#${id_post_ad}`).remove();
}

