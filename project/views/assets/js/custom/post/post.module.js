import DateModule   from '/assets/js/custom/date/date.module.js'
import ImageModule  from '/assets/js/custom/image/image.ajax.js'
import PostAjax     from  '/assets/js/custom/post/post.ajax.js'

function set_posts (post){
    PostAjax.get_bookmarks(window.localStorage.getItem('token')).then(favoritePosts => {
        if (post) {
            let path
            if (window.localStorage.getItem('is_me')) {
                path = '/posts/post-ad-me.ejs'
            } else {
                path = '/posts/post-ad-noactive.ejs'
            }
            for (let index = 0; index < post.length; index++) {
                let json_image = JSON.stringify({ path: [post[index].jsonPathAvatar[0], post[index].jsonPathAvatar[1]]})

                $.get(path, function(data) {
                    $('#ad-post-content').append(data);
                    $('#id').attr("id", post[index].id);

                    const parent = $('#'+post[index].id)

                    parent.find('#header-post-ad').html(post[index].jsonText.header)
                    parent.find('#meta-data-postad').html(DateModule(new Date(post[index].timestamp)))
                    parent.find('#text-wall').html(post[index].jsonText.wallTextArea.substring(0, 162) + '...')

                    ImageModule(json_image).then(images => {
                        images = JSON.parse(JSON.stringify(images));
                        // $('#'+post_ad[index].id).append('<img src="'+base_array[0]+'">')
                        parent.find('#first-image').attr("src", images[0])
                        parent.find('#second-image').attr("src", images[1])
                    });

                    for (let i = 0; i < post[index].jsonTags.own_tags.length; i++) {
                        parent.find('#tag-column-post-ad').prepend('<div class="ui label" id="tag-pet" style="margin-top: 5px">' + post[index].jsonTags.own_tags[i] + '</div>')
                    }
                    const element = parent.find('#tag-column-post-ad');
                    element.prepend('<div class="ui teal label" id="tag-pet" style="margin-top: 5px">' + post[index].jsonTags.gender + '</div>')
                    element.prepend('<div class="ui teal label" id="tag-pet" style="margin-top: 5px">' + post[index].jsonTags.age + '</div>')
                    element.prepend('<div class="ui teal label" id="tag-pet" style="margin-top: 5px">' + post[index].jsonTags.breeds + '</div>')
                    element.prepend('<div class="ui teal label" id="tag-pet" style="margin-top: 5px">' + post[index].jsonTags.group + '</div>')
                    element.prepend('<div class="ui teal label" id="tag-pet" style="margin-top: 5px">' + post[index].jsonTags.animals + '</div>')

                    if (typeof favoritePosts !== 'undefined') {
                        for (let index_fav = 0; index_fav < favoritePosts.length; index_fav++) {
                            if (favoritePosts[index_fav].id === post[index].id) {
                                const favorite = $('#' + favoritePosts[index_fav])
                                favorite.find('.favorite.icon').addClass('active')
                                favorite.find('#data-tooltip-win').attr('data-tooltip', 'Delete from Bookmarks?')
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
    PostAjax.delete_post(window.token, id_post_ad);
    $(`#${id_post_ad}`).remove();
}

export default {
    set_posts: set_posts,

    async get_bookmarks(token){
        return await PostAjax.get_bookmarks(token);
    },
    async get_posts(id, token){
        return await PostAjax.get_posts(id, token);
    },
    delete_post_be (id_post){
        PostAjax.delete_post(id_post, window.localStorage.getItem('id_account'))
        $(`#${id_post}`).remove();
    }
}