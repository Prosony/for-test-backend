function star_favorites_switch(){
    $('.right.floated.star').unbind("click").click(function() {
        let id_post_ad = $(this).closest('.ui.items').attr('id');
        let class_name = $(this).find('.favorite.icon').attr('class');
        console.log(id_post_ad);
    //            console.log('$(this).attr(class): ',$(this).attr(''))
        if (class_name !== 'favorite icon active' && class_name !== 'favorite active icon'){

            add_bookmark(window.token, id_post_ad);
            $(this).find('.favorite.icon').addClass('active');
            $(this).find('#data-tooltip-win').attr('data-tooltip', 'Delete from Bookmarks?');
        }else{
            delete_bookmark(window.token, id_post_ad);
            $(this).find('.favorite.icon.active').removeClass('active');
            $(this).find('#data-tooltip-win').attr('data-tooltip', 'Add to Bookmarks?');
        }
    });
}

