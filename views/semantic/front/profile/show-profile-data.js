// let path_bookmarks = '../parts/profile-parts/center/bookmarks/bookmarks.ejs';
let path_left = '../parts/profile-parts/left/left-column.ejs';
let path_post = '../parts/profile-parts/center/main/post-content.ejs';

function show_home(token, id){
    $('#content-column-block').load(path_post, function () {
        update_data_profile(token,id);
        update_data_post_ad(token,id)
    });
}

function set_data_left(profile) {

    getImage(JSON.stringify({'path': [profile.path_avatar]})).then(function (result) {
        $('#name-user').html(profile.name +' '+ profile.surname);
        $('#data-birthday').html(profile.birthday);
        $('#data-phone').html(profile.phone);
        $('#data-about').html(profile.about);
        set_image('avatar',result)
    });


}
function set_image(element, base64string){
    document.getElementById(element).src = `data:image/png;base64,${base64string}`;
}

function set_data_post_ad(post_ad){

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


//get id post-ad by click element
// $('.ui.items').click(function() {
//     console.log($(this).attr('id'));
// });