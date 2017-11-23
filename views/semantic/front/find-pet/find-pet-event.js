function show_post_ad(token){
    data_update_find_pet(token).then(function (post_ad) {
        set_post_ad(post_ad);
    });
}
