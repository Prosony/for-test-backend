import PostModule       from    '/assets/js/custom/post/post.module.js';
import ProfileModule    from    '/assets/js/custom/profile/profile.module.js';
import ImageAjax      from    '/assets/js/custom/image/image.ajax.js'

const token = window.localStorage.getItem(`token`);

function modal_show(id_post){
    console.log(`#INFO [modal.module.js][modal_show] id_post: `,id_post);
    $.get('/layout/modal/modal.ejs', function(modal){

        $('#modal').append(modal);

        PostModule.get_one_post(id_post, token).then(function (post_ad) {
            console.log(`#INFO [modal.module.js][modal_show] post_ad: `,post_ad);
            ProfileModule.get_profile(post_ad.idAccount, token).then(function (profile) {

                $('#id-account').attr('id',profile.id);
                $('#head-name-user').html(profile.name +' '+ profile.surname);
                $('#head-name-user').attr("href","/profile/"+profile.id);
                $('#phone-account').html(post_ad.jsonText.phone);

                ImageAjax(JSON.stringify({'path': [profile.path_avatar]})).then(function (base64) {
                    $('#avatar-mini').attr("src", base64);

                });
            });
            console.log(post_ad.jsonPathImage);
            ImageAjax(JSON.stringify({'path': post_ad.jsonPathImage})).then(function (base64) {
                for (let index = 0; index < base64.length; index++ ){
                    if (index === 0){
                        $('#modal-post-ad').find('#first-image-modal').attr("src", base64[index]);
                    }else{
                        $.get('/layout/modal/img.ejs', function(template){
                            $('#modal-post-ad').find('#slide-image-div').prepend(template);
                            $('#modal-post-ad').find('#slide-image-modal').attr("src", base64[index]);
                        });
                    }
                }
            });
            $('#modal-post-ad').find('#text-wall').html(post_ad.jsonText.wallTextArea);
            $('#modal-post-ad').find('#header-post-ad-modal').html(post_ad.header);

            for (let i = 0; i < post_ad.jsonTags.own_tags.length; i++){
                $('#tag-column').prepend('<div class="ui label" id="tag-pet" style="margin-top: 5px">'+post_ad.jsonTags.own_tags[i]+'</div>');
            }

            $('#tag-column').prepend('<div class="ui teal label" id="tag-pet" style="margin-top: 5px">'+post_ad.jsonTags.gender+'</div>');
            $('#tag-column').prepend('<div class="ui teal label" id="tag-pet" style="margin-top: 5px">'+post_ad.jsonTags.age+'</div>');
            $('#tag-column').prepend('<div class="ui teal label" id="tag-pet" style="margin-top: 5px">'+post_ad.jsonTags.breeds+'</div>');
            $('#tag-column').prepend('<div class="ui teal label" id="tag-pet" style="margin-top: 5px">'+post_ad.jsonTags.group+'</div>');
            $('#tag-column').prepend('<div class="ui teal label" id="tag-pet" style="margin-top: 5px">'+post_ad.jsonTags.animals+'</div>');

            $('#modal-post-ad').modal({
                onHidden: function(){
                    $('#modal').empty();
                    $('.modals').remove()
                },
                onShow: function(){
                    console.log('shown');
                },
                blurring: true
            }).modal('show');

        });
    });
}
$(() => {
    $(document.body).on('click','#previews-button',function () {
        console.log(`click modal`);
        modal_show($(this).closest('.item').attr('id'));
    })

});