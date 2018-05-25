import TagsAjax     from '/assets/js/custom/tags/tags.ajax.js'
// import AdvertisementModule   from '/assets/js/custom/advertisement/advertisement.module.js'

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
function update_tags_preview(tags_cache){
    // let json_tags = tags_cache;
    if (tags_cache !== ''){
        console.log('preview tags: ', tags_cache);
        content = [];
        for (let index = 0; index < tags_cache.length; index++){
            content.push({'title':tags_cache[index]});
            console.log('# INFO [update_tags_preview] content: ',content);
            $(`#searching-tags-db`).search({
                source: content,
                cache: true,
                minCharacters: 0,
                maxResults: 10
            });
        }
    }

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
       let check = array_tags.own_tags[index].toString().substring(0,1);
        if (check === `-`){
            $(`#block-own-tags`).append('' +
                '<a class="ui label red transition visible" id="' + index + '" style="display: inline-block !important; margin-top: 5px">'
                + array_tags.own_tags[index] +
                '<i class="delete icon"></i>' +
                '</a>');
        } else{
            $(`#block-own-tags`).append('' +
                '<a class="ui label transition visible" id="' + index + '" style="display: inline-block !important; margin-top: 5px">'
                + array_tags.own_tags[index] +
                '<i class="delete icon"></i>' +
                '</a>');
        }
    }
}

$(() => {

    update_tags_dropdown('#animals-tag','header');
    let count_click = 0;
    // update_tags_preview();
    $(`#btn-own-tag`).on('click', function () {
        let is_new_tag = true;
        let tag = $(this).closest(`#searching-tags-db`).find(`#input-own-tags`)[0].value;
        $(this).closest(`#searching-tags-db`).find(`#input-own-tags`)[0].value = '';
        console.log('click tags');
        console.log('input value: ', tag);
        for (let index = 0; index < array_tags.own_tags.length; index++){
            let cursor = array_tags.own_tags.toString();
            if (cursor.substring(0,1) === `-`){
                cursor = cursor.substring(1);
            }
            if (tag.substring(0,1) === `-`){
                if (cursor === tag.substring(1)){
                    console.log("duplicated tags with -");
                    is_new_tag = false;
                    break;
                }
            }else {
                if (cursor === tag){
                    console.log("duplicated tags");
                    is_new_tag = false;
                    break;
                }
            }
        }

        if (tag.substring(tag.length-1, tag.length) === ' '){
            console.log('Have space');
            tag = tag.substring(0, tag.length-1);
        }

        if (is_new_tag && tag !== '' && tag.substring(0,1) !== ' '){

            array_tags.own_tags.splice(count_click, 0, tag);
            console.log('array_tags.own_tags: ', array_tags.own_tags);
            preview_own_tags();
            count_click++;
        }
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
        $(`#animals-tag`).children('span').html('Животные');

        let group = $(`#group-tag`);
        group.children('span').html('Группа');
        group.addClass('disabled');

        let breeds = $(`#breeds-tag`);
        breeds.children('span').html('Порода');
        breeds.addClass('disabled');

        let age = $(`#age-tag`);
        age.children('span').html('Возраст');
        age.addClass('disabled');
        

        let gender = $(`#gender-tag`);
        gender.children('span').html('Пол');
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
            $(`#breeds-tag`).children('span').html('Порода');
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
                    menu.append('<div class="item">меньше 1 года</div>');
                }
                if (index === 25){
                    menu.append('<div class="item">старше 25 лет</div>');
                }else{
                	if (index <5) {

                    menu.append('<div class="item">'+index+' года</div>');
                	}else {
                		menu.append('<div class="item">'+index+' лет</div>');
                	}
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

    $(`#searching-tags-db`).dropdown({
        transition: 'drop',
        onChange: function(value, text, $selectedItem) {
        }
    })
});
export default {
    async get_advertisement_by_tags(token, tags){
        return await TagsAjax.get_advertisement_by_tags(token, tags);
    },
    array_tags: array_tags,
    update_tags_preview: update_tags_preview
}