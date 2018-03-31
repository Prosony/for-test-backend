import PostModule from '/assets/js/custom/post/post.module.js'
import ImageAjax from '/assets/js/custom/image/image.ajax.js'
import BookmarksAjax    from '/assets/js/custom/bookmarks/bookmarks.ajax.js'
import ProfileModule from '/assets/js/custom/profile/profile.module.js'

const id_account = window.localStorage.getItem('id_account');
const token = window.localStorage.getItem('token');

function bookmarks_show(){
    PostModule.get_bookmarks(token).then(bookmarks => {
        $.get('/bookmarks/bookmarks.ejs', template => {
            $('#right_column').empty().append(template);
            if(typeof bookmarks !== 'undefined') {
                for (let index = 0; index < bookmarks.length; index++) {
                    const image = JSON.stringify({path: [bookmarks[index].jsonPathAvatar[0], bookmarks[index].jsonPathAvatar[1]]})

                    $.get('/posts/post-ad-active.ejs', template => {
                        $('#ad-post-content').prepend(template);

                        const textWall = bookmarks[index].jsonText.wallTextArea.substring(0, 162) + '...';

                        $('#id').attr("id", bookmarks[index].id);

                        const parent = $(`#${bookmarks[index].id}`);
                        parent.find('#text-wall').html(textWall);
                        parent.find('#header-post-ad').html(bookmarks[index].jsonText.header);
                        parent.find('#meta-data-postad').html(bookmarks[index].jsonText.date);
                        ImageAjax(image).then(images => {
                            images = JSON.parse(JSON.stringify(images));
                            parent.find('#first-image').attr("src", images[0]);
                            parent.find('#second-image').attr("src", images[1])
                        });
                        const child = parent.find('#tag-column-post-ad');
                        child.append('<div class="ui teal label" id="tag-pet" style="margin-top: 5px">' + bookmarks[index].jsonTags.animals + '</div>');
                        child.append('<div class="ui teal label" id="tag-pet" style="margin-top: 5px">' + bookmarks[index].jsonTags.group + '</div>');
                        child.append('<div class="ui teal label" id="tag-pet" style="margin-top: 5px">' + bookmarks[index].jsonTags.breeds + '</div>');
                        child.append('<div class="ui teal label" id="tag-pet" style="margin-top: 5px">' + bookmarks[index].jsonTags.age + '</div>');

                        for (let i = 0; i < bookmarks[index].jsonTags.own_tags.length; i++) {
                            child.append('<div class="ui label" id="tag-pet" style="margin-top: 5px">' + bookmarks[index].jsonTags.own_tags[i] + '</div>')
                        }
                    });
                }
            }
        })
    })
}
$(() => {
    $('#bookmarks_show').on('click', () => {
        bookmarks_show();
    });
    $('#bookmarks_load').on('click', event => {
        console.log('click');
        $('#left_column').empty();
        $('#right_column').empty();
        ProfileModule.get_profile(id_account, token).then(profile => {
            ImageAjax(JSON.stringify({ path: [profile.path_avatar]})).then(images => {
                ProfileModule.set_left_column(profile,images);
            })
        });
        bookmarks_show();
    });
    $(document).on('click', '.right.floated.star' ,function(event){
        const id_post = $(this).closest('.ui.items').attr('id');
        const class_name = $(this).find('.favorite.icon').attr('class');
        if (class_name !== 'favorite icon active' && class_name !== 'favorite active icon'){
            const element = $(`#${id_post}`);
            BookmarksAjax.add_bookmark(token, id_post);
            element.find('.favorite.icon').addClass('active');
            element.find('#data-tooltip-win').attr('data-tooltip', 'Delete from Bookmarks?');
        }else{
            $(this).find('.favorite.icon.active').removeClass('active');
            $(this).find('#data-tooltip-win').attr('data-tooltip', 'Add to Bookmarks?');
            BookmarksAjax.delete_bookmark(token, id_post);
        }
    });
});