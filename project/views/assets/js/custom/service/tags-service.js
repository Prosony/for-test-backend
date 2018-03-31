let array_tags = JSON.parse(
    '{' +
    '"animals":"null",' +
    '"group":"null",' +
    '"breeds":"null",' +
    '"age":"null",' +
    '"gender":"null",' +
    '"own_tags":[]' +
    '}');
/**********************************************************
 *                      Category                          *
 * *******************************************************/

$(document).ready(function() {
    update_tags_dropdown('#animals-tag','header');
});

$('#animals-tag').dropdown({
    transition: 'drop',
    onChange: function(value, text, $selectedItem) {
        console.log('change to text: ', text);
        $('#group-tag').removeClass('disabled').find('.scrolling.menu').empty();
        update_tags_dropdown('#group-tag',text);
    }
});
$('#group-tag').dropdown({
    transition: 'drop',
    onChange: function(value, text, $selectedItem) {
        $('#breeds-tag').removeClass('disabled').find('.scrolling.menu').empty();
        $('#breeds-tag').children('span').html('Breeds');
        update_tags_dropdown('#breeds-tag',text);
    }
});
$('#breeds-tag').dropdown({
    transition: 'drop',
    onChange: function(value, text, $selectedItem) {
        $('#age-tag').removeClass('disabled').find('.scrolling.menu').empty();
        let menu = $('#age-tag').find('.scrolling.menu');
        for (let index = 1; index <= 25; index++){
            if (index === 1){
                menu.append('<div class="item">less than 1 year old</div>');
            }
            if (index === 25){
                menu.append('<div class="item">for more than 25 years</div>');
            }else{
                menu.append('<div class="item">'+index+' years old</div>');
            }
        }
    }
});
$('#age-tag').dropdown({
    transition: 'drop',
    onChange: function(value, text, $selectedItem) {
        $('#gender-tag').removeClass('disabled').find('.scrolling.menu').empty();
        update_tags_dropdown('#gender-tag','gender');
    }
});
$('#gender-tag').dropdown({
    transition: 'drop',
    onChange: function(value, text, $selectedItem) {
    }
});

function update_tags_dropdown(element, title){
    get_json_tag(window.token, title).then(function (tags) {
        let json_tags = JSON.parse(tags);
        console.log('#INFO [update_tags_dropdown] json_tags: ',json_tags);
        let menu = $(element).find('.scrolling.menu');
        for (let index = 0; index < json_tags.length; index++){
            menu.append('<div class="item">'+json_tags[index]+'</div>');
        }});
}
/**********************************************************
 *                      OWN TAGS                          *
 * *******************************************************/
// let count_click = 0;
// $(document).on('click', '#btn-own-tag' ,function(){
//     console.log('click tags');
//     array_tags.own_tags.splice(count_click, 0, $(this).closest('.ui.right.labeled.left.icon.input').find('#input-own-tags')[0].value);
//     console.log('array_tags.own_tags: ', array_tags.own_tags);
//     preview_own_tags();
//     count_click++;
// });

let count_click = 0;
$(document).on('click', '#btn-own-tag' ,function(){
    console.log('click tags');
    console.log('input value: ',$(this).closest('#searching-tags-db').find('#input-own-tags')[0].value);
    array_tags.own_tags.splice(count_click, 0, $(this).closest('#searching-tags-db').find('#input-own-tags')[0].value);
    console.log('array_tags.own_tags: ', array_tags.own_tags);
    preview_own_tags();
    count_click++;
});

$(document).on('click', '.delete.icon' ,function(){
    let index = $(this).closest('.ui.label.transition.visible').attr('id');
    array_tags.own_tags.splice(index, 1);
    preview_own_tags();
    console.log('tags_array: ',array_tags.own_tags);
});

function preview_own_tags() {
    $('#block-own-tags').find('.ui.label.transition.visible').remove();
    for (let index = 0; index < array_tags.own_tags.length; index++){
        $('#block-own-tags').append('' +
            '<a class="ui label transition visible" id="'+index+'" style="display: inline-block !important; margin-top: 5px">'
            + array_tags.own_tags[index] +
            '<i class="delete icon"></i>'+
            '</a>');
    }
}

let content = [];
function update_tags_preview(){
    get_json_own_tag(window.token, 'own').then(function (json_tags) {
        console.log('preview tags: ', json_tags);
        for (let index = 0; index < json_tags.length; index++){
            content.push({'title':json_tags[index]});
        }
        console.log('# INFO [update_tags_preview] content: ',content);
        $('#searching-tags-db').search({
            source: content,
            minCharacters: 0
        });

    });
}


// -------------Think about it----------------
// let array_preview_tags_by_input;
// $(document).on('keyup', '#input-own-tags' , function () {
//     console.log('change: ', $(this)[0].value);
//     array_preview_tags_by_input = [];
//     array_preview_tags_by_input.splice(count_click, 0, $(this).closest('#searching-tags-db').find('#input-own-tags')[0].value);
//     if ($(this)[0].value.length < 3){
//         console.log('< 3');
//     }else{
//         get_json_tag_for_search(window.token, array_preview_tags_by_input);
//         console.log('> 3');
//     }
// });