let array_tags = JSON.parse(
    '{' +
    '"animals":"null",' +
    '"group":"null",' +
    '"breeds":"null",' +
    '"age":"null",' +
    '"own_tags":[]' +
    '}');
$('#animals-tag').dropdown({
    transition: 'drop',
    onChange: function(value, text, $selectedItem) {
        console.log('change to text: ', text);
        $('#group-tag').removeClass('disabled').find('.scrolling.menu').empty();
        update_tags_dropdown('#group-tag',text);
        array_tags.animals =text;
        console.log('array_tags: ',array_tags);
    }
});
$('#group-tag').dropdown({
    transition: 'drop',
    onChange: function(value, text, $selectedItem) {
        console.log('change to: ', text);
        array_tags.group = text;
        $('#breeds-tag').removeClass('disabled').find('.scrolling.menu').empty();
        $('#breeds-tag').children('span').html('Breeds');
        update_tags_dropdown('#breeds-tag',text);
    }
});
$('#breeds-tag').dropdown({
    transition: 'drop',
    onChange: function(value, text, $selectedItem) {
        console.log('change to: ', text);
        array_tags.breeds = text;
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
        console.log('change to: ', text);
        array_tags.age = text;
        $('#gender-tag').removeClass('disabled').find('.scrolling.menu').empty();
        update_tags_dropdown('#gender-tag','gender');
    }
});
$('#gender-tag').dropdown({
    transition: 'drop',
    onChange: function(value, text, $selectedItem) {
        console.log('change to: ', text);
        array_tags.gender = text;
    }
});
let count_click = 0;
//    let tags_array = [];
$(document).on('click', '.ui.tag.label' ,function(){
    console.log('click tags');
    array_tags.own_tags.splice(count_click, 0, $(this).closest('.ui.right.labeled.left.icon.input').find('#input-own-tags')[0].value);
    console.log('array_tags.own_tags: ', array_tags.own_tags);
    $('#block-own-tags').append('' +
        '<a class="ui label transition visible" id="'+count_click+'" style="display: inline-block !important; margin-top: 5px">' +
        $(this).closest('.ui.right.labeled.left.icon.input').find('#input-own-tags')[0].value +
        '<i class="delete icon"></i>'+
        '</a>');
    $('#own-tags-input').attr('value',count_click);
    count_click++;
});

$(document).on('click', '.delete.icon' ,function(){
    let index = $(this).closest('.ui.label.transition.visible').attr('id');
//        tags_array.splice(index, 1);
    delete array_tags.own_tags[index];
//        array_tags.own_tags.splice(index, 1);
    $(this).closest('.ui.label.transition.visible').remove();
    console.log('tags_array: ',array_tags.own_tags);
});

$(document).ready(function() {
    update_tags_dropdown('#animals-tag','header')
});
function update_tags_dropdown(element, title){
    get_json_tag(window.token, title).then(function (tags) {
        let json_tags = JSON.parse(tags);
        console.log('answer db: ',json_tags);
        let menu = $(element).find('.scrolling.menu');
        for (let index = 0; index < json_tags.length; index++){
            menu.append('<div class="item">'+json_tags[index]+'</div>');
        }});
}