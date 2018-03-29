function show_post_ad(token){
    data_update_find_pet(token).then(function (post_ad) {
        set_post_ad(post_ad);
        tags_sticky();
    });
}
function tags_sticky() {
    $('#search-tags-block').sticky({
        observeChanges: true,
        context: '#ad-post-content',
        offset: 56
    }).sticky('refresh');
}
$('#clear-tags').on('click', function() {
        $('.ui.floating.labeled.icon.dropdown.button').dropdown('clear');

        $('#animals-tag').children('span').html('Animals');

        $('#group-tag').children('span').html('Group');
        $('#group-tag').addClass('disabled');

        $('#breeds-tag').children('span').html('Breeds');
        $('#breeds-tag').addClass('disabled');

        $('#age-tag').children('span').html('Age').addClass('disabled');
        $('#age-tag').addClass('disabled');

        $('#gender-tag').children('span').html('Gender').addClass('disabled');
        $('#gender-tag').addClass('disabled');
})
;