import DateModule   from '/assets/js/custom/date/date.module.js'
import ImageModule  from '/assets/js/custom/image/image.ajax.js'
import PostAjax     from  '/assets/js/custom/post/post.ajax.js'

const me = window.localStorage.getItem('is_me');
let tags_cache = [];

function set_posts (post){
    PostAjax.get_bookmarks(window.localStorage.getItem('token')).then(bookmarksPosts => {
        if (post) {
            let path;
            console.log('is_me: ',me);
            if (me === 'true') {
                console.log('true');
                path = '/posts/post-ad-me.ejs'
            } else {
                console.log('false');
                path = '/posts/post-ad-noactive.ejs'
            }
            for (let index = 0; index < post.length; index++) {
                let json_image = JSON.stringify({ path: [post[index].jsonPathAvatar[0], post[index].jsonPathAvatar[1]]})

                $.get(path, function(data) {
                    $('#ad-post-content').append(data);
                    $('#id').attr("id", post[index].id);

                    const parent = $('#'+post[index].id);

                    parent.find('#header-post-ad').html(post[index].jsonText.header)
                    parent.find('#meta-data-postad').html(DateModule.translate_timestamp(new Date(post[index].timestamp)))
                    parent.find('#text-wall').html(post[index].jsonText.wallTextArea.substring(0, 162) + '...')

                    ImageModule(json_image).then(images => {
                        images = JSON.parse(JSON.stringify(images));
                        // $('#'+post_ad[index].id).append('<img src="'+base_array[0]+'">')
                        parent.find('#first-image').attr("src", images[0])
                        parent.find('#second-image').attr("src", images[1])
                    });
                    console.log('DERMOOO')
                    for (let i = 0; i < post[index].jsonTags.own_tags.length; i++) {

                        // if (tags_cache.length > 0){
                        //     for (let index_cahce = 0; index_cahce < tags_cache.length; index_cahce++){
                        //         if (post[index].jsonTags.own_tags[i] !== tags_cache[index_cahce]){
                        //             tags_cache.push(post[index].jsonTags.own_tags[i]);
                        //             break;
                        //         }
                        //     }
                        // } else {
                        //     console.log('tags_cache: ',tags_cache)
                        //     tags_cache.push(post[index].jsonTags.own_tags[i]);
                        // }

                        console.log(post[index].jsonTags.own_tags[i]);
                        parent.find('#tag-column-post-ad').prepend('<div class="ui label" id="tag-pet" style="margin-top: 5px">' + post[index].jsonTags.own_tags[i] + '</div>')
                    }
                    const element = parent.find('#tag-column-post-ad');
                    element.prepend('<div class="ui teal label" id="tag-pet" style="margin-top: 5px">' + post[index].jsonTags.gender + '</div>')
                    element.prepend('<div class="ui teal label" id="tag-pet" style="margin-top: 5px">' + post[index].jsonTags.age + '</div>')
                    element.prepend('<div class="ui teal label" id="tag-pet" style="margin-top: 5px">' + post[index].jsonTags.breeds + '</div>')
                    element.prepend('<div class="ui teal label" id="tag-pet" style="margin-top: 5px">' + post[index].jsonTags.group + '</div>')
                    element.prepend('<div class="ui teal label" id="tag-pet" style="margin-top: 5px">' + post[index].jsonTags.animals + '</div>')
                    if (me === 'false'){
                        if (typeof bookmarksPosts !== 'undefined') {
                            for (let index_fav = 0; index_fav < bookmarksPosts.length; index_fav++) {
                                if (bookmarksPosts[index_fav].id === post[index].id) {
                                    const favorite = $('#' + bookmarksPosts[index_fav].id);
                                    favorite.find('.favorite.icon').addClass('active');
                                    favorite.find('#data-tooltip-win').attr('data-tooltip', 'Delete from Bookmarks?')
                                }
                            }
                        }
                    }
                });
            }
        } else {
            $('#ad-post-content').append('<div>List is empty</div>')//TODO something else
        }
    }).catch(error => {
        console.error(`#ERROR : ${error.message}`)
    })
}

function delete_post(id_post_ad){
    PostAjax.delete_post(window.localStorage.getItem('token'), id_post_ad);
    $(`#${id_post_ad}`).remove();
}
$(() => {
    $(document).on('click', '.right.floated.icon-remove' ,  function(){
        console.log(`#INFO [post.module.js] [CLICK] delete post!`);
        delete_post($(this).closest('.ui.items').attr('id'))
    });
});
export default {
    set_posts: set_posts,

    async get_bookmarks(token){
        return await PostAjax.get_bookmarks(token);
    },
    async get_posts(id, token){
        return await PostAjax.get_posts(id, token);
    },
    async get_one_post(id, token){
        return await PostAjax.get_one_post(id, token)
    },
    delete_post_be (id_post){
        PostAjax.delete_post(id_post, window.localStorage.getItem('id_account'))
        $(`#${id_post}`).remove();
    }
}