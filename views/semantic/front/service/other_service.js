function delete_post_ad(id_post_ad){
    delete_post_ad_server(window.token, id_post_ad);
    $(`#${id_post_ad}`).remove();
}

function star_favorites_switch(id_post_ad, class_name){
        if (class_name !== 'favorite icon active' && class_name !== 'favorite active icon'){
            add_bookmark(window.token, id_post_ad);
            $(`#${id_post_ad}`).find('.favorite.icon').addClass('active');
            $(`#${id_post_ad}`).find('#data-tooltip-win').attr('data-tooltip', 'Delete from Bookmarks?');
        }else{
            delete_bookmark(window.token, id_post_ad);
            $(`#${id_post_ad}`).find('.favorite.icon.active').removeClass('active');
            $(`#${id_post_ad}`).find('#data-tooltip-win').attr('data-tooltip', 'Add to Bookmarks?');
        }
    // });
}
function modal_event_switch(id_post){
    console.log(id_post);
    $.get('../parts/opt/modal/modal-find-pet.ejs', function(modal){
        $('.ui.dimmer.modals.page.transition.hidden').append(modal);

        get_post_ad_by_id_post(window.token, id_post).then(function (post_ad) {
            console.log('post_ad: ',post_ad);
            update_data_profile(window.token, post_ad.idAccount).then(function (profile_man) {
                $('#id-account').attr('id',profile_man.id);
                $('#head-name-user').html(profile_man.name +' '+ profile_man.surname);
                $('#head-name-user').attr("href","/profile/:"+profile_man.id);
                $('#phone-account').html(post_ad.jsonText.phone);
                getImage(JSON.stringify({'path': [profile_man.path_avatar]})).then(function (base64string) {
                    $('#avatar-mini').attr("src", base64string);

                });
            });
            getImage(JSON.stringify({'path': post_ad.jsonPathImage})).then(function (base64image) {
                for (let index = 0; index < base64image.length; index++ ){
                    if (index === 0){
                        $('#modal-post-ad').find('#first-image-modal').attr("src", base64image[0]);
                    }else{
                        $.get('../parts/opt/modal/img-post.ejs', function(data){
                            $('#modal-post-ad').find('#slide-image-div').prepend(data);
                            $('#modal-post-ad').find('#slide-image-modal').attr("src", base64image[index]);
                        });
                    }
                }
            });
            $('#modal-post-ad').find('#text-wall').html(post_ad.jsonText.wallTextArea);
            $('#modal-post-ad').find('#header-post-ad-modal').html(post_ad.header);

            $('#tag-column').prepend('<div class="ui label" id="tag-pet" style="margin-top: 5px">'+post_ad.jsonTags.animals+'</div>');
            $('#tag-column').prepend('<div class="ui label" id="tag-pet" style="margin-top: 5px">'+post_ad.jsonTags.group+'</div>');
            $('#tag-column').prepend('<div class="ui label" id="tag-pet" style="margin-top: 5px">'+post_ad.jsonTags.breeds+'</div>');
            $('#tag-column').prepend('<div class="ui label" id="tag-pet" style="margin-top: 5px">'+post_ad.jsonTags.age+'</div>');

            for (let i = 0; i < post_ad.jsonTags.own_tags.length; i++){
                $('#tag-column').prepend('<div class="ui label" id="tag-pet" style="margin-top: 5px">'+post_ad.jsonTags.own_tags[i]+'</div>');
            }

            $('#modal-post-ad').modal({
                onHidden: function(){
                    $('.ui.dimmer.modals.page.transition.hidden').empty();
                    console.log('hidden');
                },
                onShow: function(){
                    console.log('shown');
                },
                blurring: true
            }).modal('show');
        });
    });
}
function get_date(date){

    let result;
    switch (date.month){
        case 1: result = date.day +' January ' +date.year; break;
        case 2: result = date.day +' February ' +date.year; break;
        case 3: result = date.day +' March ' +date.year; break;
        case 4: result = date.day +' April ' +date.year; break;
        case 5: result = date.day +' May ' +date.year; break;
        case 6: result = date.day +' June ' +date.year; break;
        case 7: result = date.day +' Jule ' +date.year; break;
        case 8: result = date.day +' August ' +date.year; break;
        case 9: result = date.day +' September ' +date.year; break;
        case 10: result = date.day +' October ' +date.year; break;
        case 11: result = date.day +' November ' +date.year; break;
        case 12: result = date.day +' December ' +date.year; break;
    }
    return result;
}
function menu_sticky() {
    $('#main-menu-mpm').sticky({
        context:'#main',
        onStick: function() {
            $(this).css({'margin-left':'45px', 'margin-right':'45px','left':'0'});
//                console.log('slide!');
        },
        onUnstick: function() {
            $(this).css({'margin-left':'45px', 'margin-right':'45px','left':'0', 'top':'0'});
//                console.log('UNslide!');
        }
    });
}

// $(window).scroll(function(e){
//     var $el = $('.ui.pointing.menu');
//     var isPositionFixed = ($el.css('position') == 'fixed');
//     if ($(this).scrollTop() > 1 && !isPositionFixed){
//         $('.ui.pointing.menu').css({'position': 'fixed', 'top': '0px', 'left':'0','right':'0'});
//     }
//     if ($(this).scrollTop() < 1 && isPositionFixed)
//     {
//         $('.ui.pointing.menu').css({'position': 'static', 'top': '0px', 'left':'0','right':'0'});
//     }
// });