

function clear_pos_ad(){
    $('#ad-post-content').find('.ui.items').remove();
}
function delete_post_ad(id_post_ad){
    delete_post_ad_server(window.token, id_post_ad);
    $(`#${id_post_ad}`).remove();
}

