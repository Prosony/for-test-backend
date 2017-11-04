function show_post_ad(token){
    data_update_find_pet(token).then(function (post_ad) {
        update_favorites_post_ad(token).then(function (favorites_post_ad) {
            if (typeof post_ad !== 'undefined'){
                for (let index = 0; index < post_ad.length; index++){
                    let json_image = JSON.stringify({'path':[post_ad[index].pathToImageFirst, post_ad[index].pathToImageSecond]});
                    getImage(json_image).then(function (base64string) {
                        let base_array = JSON.parse(JSON.stringify(base64string));
                        $.get('../parts/profile-parts/center/main/post-ad-noactive.ejs', function(data){
                            let textWall = post_ad[index].wallText.substring(0,200);
                            $('#ad-post-content').prepend(data);
                            $('#first-image').attr("src", "data:image/png;base64,"+base_array[0]);
                            $('#second-image').attr("src", "data:image/png;base64,"+base_array[1]);
                            $('#header-post-ad').html(post_ad[index].header);
                            $('#meta-data-postad').html(post_ad[index].date.day+'.'+post_ad[index].date.month+'.'+post_ad[index].date.year);
                            $('#text-wall').html(textWall);
                            $('#id').attr("id",post_ad[index].id);

                            if (typeof favorites_post_ad !== 'undefined'){
                                for(let index_fav = 0; index_fav < favorites_post_ad.length; index_fav++){
                                    console.log('index_fav: ',favorites_post_ad[index_fav].id );
                                    console.log('index: ',post_ad[index].id);
                                    if(favorites_post_ad[index_fav].id === post_ad[index].id){
                                        console.log('your favorites');

                                        $('#'+favorites_post_ad[index_fav].id).find('.favorite.icon').addClass('active');
                                        $('#'+favorites_post_ad[index_fav].id).find('#data-tooltip-win').attr('data-tooltip', 'Delete from Bookmarks?');
                                    }
                                }
                            }
                        });
                    });
                }
            }
        });
    });
}
