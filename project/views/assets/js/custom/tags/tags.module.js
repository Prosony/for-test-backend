import TagsAjax     from '/assets/js/custom/tags/tags.ajax.js'

const token = window.localStorage.getItem(`token`);
const id_account = window.localStorage.getItem(`id_account`);

let array_tags = JSON.parse(
    '{' +
    '"animals":"null",' +
    '"group":"null",' +
    '"breeds":"null",' +
    '"age":"null",' +
    '"gender":"null",' +
    '"own_tags":[]' +
    '}');

let content = [];
function update_tags_preview(){
    TagsAjax.get_own_tag(token, 'own').then(function (json_tags) {
        console.log('preview tags: ', json_tags);
        for (let index = 0; index < json_tags.length; index++){
            content.push({'title':json_tags[index]});
        }
        console.log('# INFO [update_tags_preview] content: ',content);
        $(`#searching-tags-db`).search({
            source: content,
            minCharacters: 0
        });

    });
}

function update_tags_dropdown(element, title){
    if (title){
        console.log(`title: `,title);
        TagsAjax.get_json_tag(token, title).then(function (tags) {
            if (tags !== undefined){
                let json_tags = JSON.parse(tags);
                console.log('#INFO [update_tags_dropdown] json_tags: ',json_tags);
                let menu = $(element).find(`.scrolling.menu`);
                for (let index = 0; index < json_tags.length; index++){
                    menu.append('<div class="item">'+json_tags[index]+'</div>');
                }
            }
        })
    }
}
function preview_own_tags() {
    $(`#block-own-tags`).find(`.ui.label.transition.visible`).remove();
    for (let index = 0; index < array_tags.own_tags.length; index++) {
        $(`#block-own-tags`).append('' +
            '<a class="ui label transition visible" id="' + index + '" style="display: inline-block !important; margin-top: 5px">'
            + array_tags.own_tags[index] +
            '<i class="delete icon"></i>' +
            '</a>');
    }
}

$(() => {

    update_tags_dropdown('#animals-tag','header');
    let count_click = 0;

    $(`#btn-own-tag`).on('click', function () {
        console.log('click tags');
        console.log('input value: ', $(this).closest(`#searching-tags-db`).find(`#input-own-tags`)[0].value);
        array_tags.own_tags.splice(count_click, 0, $(this).closest(`#searching-tags-db`).find(`#input-own-tags`)[0].value);
        console.log('array_tags.own_tags: ', array_tags.own_tags);
        preview_own_tags();
        count_click++;
    });

    $(document).on('click', '.delete.icon' ,function(){
        console.log(`delete icon`);
        const index = $(this).closest('.ui.label.transition.visible').attr('id');
        array_tags.own_tags.splice(index, 1);
        preview_own_tags();
        console.log('tags_array: ', array_tags.own_tags);
    });



    $(`#clear-tags`).on('click', () => {
        $(`.ui.floating.labeled.icon.dropdown.button`).dropdown('clear');
        $(`#animals-tag`).children('span').html('Animals');

        let group = $(`#group-tag`);
        group.children('span').html('Group');
        group.addClass('disabled');

        let breeds = $(`#breeds-tag`);
        breeds.children('span').html('Breeds');
        breeds.addClass('disabled');

        let age = $(`#age-tag`);
        age.children('span').html('Age').addClass('disabled');
        age.addClass('disabled');

        let gender = $(`#gender-tag`);
        gender.children('span').html('Gender').addClass('disabled');
        gender.addClass('disabled');
    });


    $(`#animals-tag`).dropdown({
        transition: 'drop',
        onChange: function(value, text, $selectedItem) {
            console.log('change to text: ', text);
            if (typeof text !== `undefined`){
                $(`#group-tag`).removeClass('disabled').find(`.scrolling.menu`).empty();
                update_tags_dropdown('#group-tag',text);
            }
        }
    });
    $(`#group-tag`).dropdown({
        transition: 'drop',
        onChange: function(value, text, $selectedItem) {
            $(`#breeds-tag`).removeClass('disabled').find(`.scrolling.menu`).empty();
            $(`#breeds-tag`).children('span').html('Breeds');
            update_tags_dropdown('#breeds-tag',text);
        }
    });
    $(`#breeds-tag`).dropdown({
        transition: 'drop',
        onChange: function(value, text, $selectedItem) {
            $(`#age-tag`).removeClass('disabled').find(`.scrolling.menu`).empty();
            let menu = $(`#age-tag`).find(`.scrolling.menu`);
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
    $(`#age-tag`).dropdown({
        transition: 'drop',
        onChange: function(value, text, $selectedItem) {
            $(`#gender-tag`).removeClass('disabled').find(`.scrolling.menu`).empty();
            update_tags_dropdown('#gender-tag','gender');
        }
    });
    $(`#gender-tag`).dropdown({
        transition: 'drop',
        onChange: function(value, text, $selectedItem) {
        }
    });
});
export default {
    async get_advertisement_by_tags(token, tags){
        return await TagsAjax.get_advertisement_by_tags(token, tags);
    },
    array_tags: array_tags
}