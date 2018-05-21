import AdvertisementAjax    from '/assets/js/custom/advertisement/advertisement.ajax.js'
import PostModule           from '/assets/js/custom/post/post.module.js'
import DateModule           from '/assets/js/custom/date/date.module.js'
import ImageAjax            from '/assets/js/custom/image/image.ajax.js'
import TagsModule           from '/assets/js/custom/tags/tags.module.js'

const id_account = window.localStorage.getItem('id_account');
const token = window.localStorage.getItem('token');
const me = window.localStorage.getItem('is_me');
let tags_cache = [];
function advertisement_show(token){
    AdvertisementAjax.get_all_advertisement(token).then(function (advertisement) {
        set_advertisement(advertisement);
        // tags_sticky();
    });
}

$(() => {
    advertisement_show(token);
});

function set_advertisement(advertisement){
    PostModule.get_bookmarks(window.localStorage.getItem('token'), window.localStorage.getItem('id_account')).then(function (bookmarks) {
        if (advertisement !== null && advertisement !== undefined && advertisement !== 'undefined' ) {
            $("#right_column").find('#error_list_search').remove();
            let path;

            if (typeof me === true){
                path ='/posts/post-ad-me.ejs'
            }else{
                path = '/posts/post-ad-noactive.ejs'
            }
            for (let index = 0; index < advertisement.length; index++) {
                let json_image = JSON.stringify({'path': [advertisement[index].jsonPathAvatar[0], advertisement[index].jsonPathAvatar[1]]});
                $.get(path, function(data){
                    $('#ad-post-content').append(data);
                    $('#id').attr("id", advertisement[index].id);
                    $(`#${advertisement[index].id}`).find('#header-post-ad').html(advertisement[index].jsonText.header);
                    $(`#${advertisement[index].id}`).find('#meta-data-postad').html(DateModule.translate_timestamp(new Date(advertisement[index].timestamp))); //get_date_time(new Date(j_array_messages[index].date))
                    $(`#${advertisement[index].id}`).find('#text-wall').html(advertisement[index].jsonText.wallTextArea.substring(0, 162) +'...');
                    ImageAjax(json_image).then(function (base64string) {
                        let base_array = JSON.parse(JSON.stringify(base64string));
                        $(`#${advertisement[index].id}`).find('#first-image').attr("src", base_array[0]); //
                        $(`#${advertisement[index].id}`).find('#second-image').attr("src", base_array[1]);
                    });

                    for (let i = 0; i < advertisement[index].jsonTags.own_tags.length; i++){

                        if (tags_cache.length > 0){
                            for (let index_cahce = 0; index_cahce < tags_cache.length; index_cahce++){
                                if (advertisement[index].jsonTags.own_tags[i] !== tags_cache[index_cahce]){
                                    tags_cache.push(advertisement[index].jsonTags.own_tags[i]);
                                    TagsModule.update_tags_preview(tags_cache);
                                    break;
                                }
                            }
                        } else {
                            console.log('tags_cache: ',tags_cache)
                            tags_cache.push(advertisement[index].jsonTags.own_tags[i]);
                        }

                        $(`#${advertisement[index].id}`).find('#tag-column-post-ad').prepend('<div class="ui label" id="tag-pet" style="margin-top: 5px">'+advertisement[index].jsonTags.own_tags[i]+'</div>');
                    }
                    $(`#${advertisement[index].id}`).find('#tag-column-post-ad').prepend('<div class="ui teal label" id="tag-pet" style="margin-top: 5px">'+advertisement[index].jsonTags.gender+'</div>');
                    $(`#${advertisement[index].id}`).find('#tag-column-post-ad').prepend('<div class="ui teal label" id="tag-pet" style="margin-top: 5px">'+advertisement[index].jsonTags.age+'</div>');
                    $(`#${advertisement[index].id}`).find('#tag-column-post-ad').prepend('<div class="ui teal label" id="tag-pet" style="margin-top: 5px">'+advertisement[index].jsonTags.breeds+'</div>');
                    $(`#${advertisement[index].id}`).find('#tag-column-post-ad').prepend('<div class="ui teal label" id="tag-pet" style="margin-top: 5px">'+advertisement[index].jsonTags.group+'</div>');
                    $(`#${advertisement[index].id}`).find('#tag-column-post-ad').prepend('<div class="ui teal label" id="tag-pet" style="margin-top: 5px">'+advertisement[index].jsonTags.animals+'</div>');

                    if (typeof bookmarks !== 'undefined') {
                        for (let index_fav = 0; index_fav < bookmarks.length; index_fav++) {
                            if (bookmarks[index_fav].id === advertisement[index].id) {
                                const bookmark_element = $('#' + bookmarks[index_fav].id);
                                bookmark_element.find('.favorite.icon').addClass('active');
                                bookmark_element.find('#data-tooltip-win').attr('data-tooltip', 'Delete from Bookmarks?');
                            }
                        }
                    }
                });
            }
        }else{
            $('#ad-post-content').append('' +
                '<div id="error_list_search">' +
                '<h2 class="ui header">\n' +
                '  <img class="ui image" src="/assets/img/logo/img_logo.png">\n' +
                '  <div class="content">\n' +
                '    Объявления не найдены\n' +
                '<div class="sub header">Попробуйте выбрать другие теги</div>' +
                '  </div>\n' +
                '</h2>' +
                '</div>');
        }
    });
}
function clear_advertisement(){
    $('#ad-post-content').find('.item').remove();
}
export default {
    tags_cache: tags_cache,
    set_advertisement: set_advertisement,
    clear_advertisement: clear_advertisement
}