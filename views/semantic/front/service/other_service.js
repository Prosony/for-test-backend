function star_favorites_switch(){
    $('.right.floated.star').unbind("click").click(function() {
        let id_post_ad = $(this).closest('.ui.items').attr('id');
        let class_name = $(this).find('.favorite.icon').attr('class');
        console.log(id_post_ad);
    //            console.log('$(this).attr(class): ',$(this).attr(''))
        if (class_name !== 'favorite icon active' && class_name !== 'favorite active icon'){

            add_bookmark(window.token, id_post_ad);
            $(this).find('.favorite.icon').addClass('active');

        }else{
            delete_bookmark(window.token, id_post_ad)
            $(this).find('.favorite.icon.active').removeClass('active');
        }
    });
}
function show_post_ad(post_ad){
    update_favorites_post_ad(window.token).then(function (favorites_post_ad) {
        for (let index = 0; index < post_ad.length; index++){
            let json_image = JSON.stringify({'path':[post_ad[index].pathToImageFirst, post_ad[index].pathToImageSecond]});
            getImage(json_image).then(function (base64string) {
                let base_array = JSON.parse(JSON.stringify(base64string));
                $.get('../parts/profile-parts/center/main/post-ad-noactive.ejs', function(data){

                    $('#ad-post-content').prepend(data);
                    $('#first-image').attr("src", "data:image/png;base64,"+base_array[0]);
                    $('#second-image').attr("src", "data:image/png;base64,"+base_array[1]);
                    $('#header-post-ad').html(post_ad[index].header);
                    $('#meta-data-postad').html(post_ad[index].date.day+'.'+post_ad[index].date.month+'.'+post_ad[index].date.year);
                    $('#text-wall').html(post_ad[index].wallText);
                    $('#id').attr("id",post_ad[index].id);

                    if (typeof favorites_post_ad !== 'undefined'){
                        for(let index_fav = 0; index_fav < favorites_post_ad.length; index_fav++){
                            console.log('index_fav: ',favorites_post_ad[index_fav].id );
                            console.log('index: ',post_ad[index].id);
                            if(favorites_post_ad[index_fav].id === post_ad[index].id){
                                console.log('your favorites');
                                $('#'+favorites_post_ad[index_fav].id).find('.favorite.icon').addClass('active');
                            }
                        }
                    }
                });
            });
        }
    });
}
function show_bookmarks(){
    $('#content-column-block').load('../parts/profile-parts/center/bookmarks/bookmarks.ejs', function () {
        update_favorites_post_ad(window.token).then(function (favorites_post_ad) {
            for(let index = 0; index < favorites_post_ad.length; index++){
                let json_image = JSON.stringify({'path':[favorites_post_ad[index].pathToImageFirst, favorites_post_ad[index].pathToImageSecond]});
                getImage(json_image).then(function (base64string) {
                    let base_array = JSON.parse(JSON.stringify(base64string));
                    $.get('../parts/profile-parts/center/main/post-ad-active.ejs', function(data){

                        $('#ad-post-content').prepend(data);
                        $('#first-image').attr("src", "data:image/png;base64,"+base_array[0]);
                        $('#second-image').attr("src", "data:image/png;base64,"+base_array[1]);
                        $('#header-post-ad').html(favorites_post_ad[index].header);
                        $('#meta-data-postad').html(favorites_post_ad[index].date.day+'.'+favorites_post_ad[index].date.month+'.'+favorites_post_ad[index].date.year);
                        $('#text-wall').html(favorites_post_ad[index].wallText);
                        $('#id').attr("id",favorites_post_ad[index].id);
                        // console.log('#INFO [show_bookmarks] favorites_post_ad: ',favorites_post_ad)
                    });
                });
            }
        });
    });
}
