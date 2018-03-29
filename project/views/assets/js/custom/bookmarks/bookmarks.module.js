import PostModule from '/assets/js/custom/post/post.module.js'
import ImageModule from '/assets/js/custom/image/image.ajax.js'
import BookMarks    from '/assets/js/custom/bookmarks/bookmarks.ajax'

$(() => {
    $('#bookmarks_link').on('click', () => {
        const token = window.localStorage.getItem('token');
        PostModule.update_favorite(token).then(favoritePost => {

                    $.get('/bookmarks/bookmarks.ejs', template => {
                        $('#right_column').empty().append(template);
                        if(typeof favoritePost !== 'undefined') {
                            for (let index = 0; index < favoritePost.length; index++) {
                                const image = JSON.stringify({path: [favoritePost[index].jsonPathAvatar[0], favoritePost[index].jsonPathAvatar[1]]})

                                $.get('/posts/post-ad-active.ejs', template => {
                                    $('#ad-post-content').prepend(template);

                                    const textWall = favoritePost[index].jsonText.wallTextArea.substring(0, 162) + '...';

                                    $('#id').attr("id", favoritePost[index].id);

                                    const parent = $(`#${favoritePost[index].id}`);
                                    parent.find('#text-wall').html(textWall);
                                    parent.find('#header-post-ad').html(favoritePost[index].jsonText.header);
                                    parent.find('#meta-data-postad').html(favoritePost[index].jsonText.date);

                                    ImageModule(image)
                                        .then(images => {
                                            images = JSON.parse(JSON.stringify(images));
                                            parent.find('#first-image').attr("src", images[0]);
                                            parent.find('#second-image').attr("src", images[1])
                                        });

                                    const child = parent.find('#tag-column-post-ad')
                                    child.prepend('<div class="ui label" id="tag-pet" style="margin-top: 5px">' + favoritePost[index].jsonTags.animals + '</div>');
                                    child.prepend('<div class="ui label" id="tag-pet" style="margin-top: 5px">' + favoritePost[index].jsonTags.group + '</div>');
                                    child.prepend('<div class="ui label" id="tag-pet" style="margin-top: 5px">' + favoritePost[index].jsonTags.breeds + '</div>');
                                    child.prepend('<div class="ui label" id="tag-pet" style="margin-top: 5px">' + favoritePost[index].jsonTags.age + '</div>');

                                    for (let i = 0; i < favoritePost[index].jsonTags.own_tags.length; i++) {
                                        child.prepend('<div class="ui label" id="tag-pet" style="margin-top: 5px">' + favoritePost[index].jsonTags.own_tags[i] + '</div>')
                                    }
                                });
                            }
                        }
                    })


            })
    });
    $('.right.floated.star').on('click', event => {
        event.closest('.ui.items').attr('id');
        event.find('.favorite.icon').attr('class');
        if (class_name !== 'favorite icon active' && class_name !== 'favorite active icon'){
            const element = $(`#${id_post_ad}`);
            BookMarks.add_bookmark(window.token, id_post_ad);
            element.find('.favorite.icon').addClass('active');
            element.find('#data-tooltip-win').attr('data-tooltip', 'Delete from Bookmarks?');
        }
    })
});