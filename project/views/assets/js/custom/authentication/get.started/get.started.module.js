let avatar;
function get_avatar(){
    return avatar;
}
function preview_image(image){
    // $('#upload-preview-avatar').find('.card').remove();
        $('#upload-preview-avatar').append(
            ' <div class="card" style="height: 250px; width: auto">\n' +
            '        <div class="blurring dimmable image" style="height: 250px; width: auto">\n' +
            '            <div class="ui dimmer" >\n' +
            '                <div class="content">\n' +
            '                    <div class="center">\n' +
            '                        <a id="btn-delete-img" class="ui item">\n' +
            '                            <i class="remove icon"></i>\n' +
            '                        </a>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '                <img src="'+image+'" style="height: 250px; width: auto">\n' +
            '            </div>\n' +
            '        </div>');
    // '<img src="'+image+'" style="height: 250px; width: auto">');
}

function blob_to_base64(file) {
    let reader = new FileReader();
    reader.onload = function(buffer) {
        avatar = buffer.target.result;
        preview_image(avatar);
    };
    reader.readAsDataURL(file);
}

$('#input-file').change(function (e) { //TODO something
    let file = e.target.files;
    $('#upload-preview-avatar').show();
    // console.log('#INFO [get.started.module.js] file.length: ',file.length);
    // console.log(file);
    blob_to_base64(file[0]);

});

$(() => {
    // console.log(`start plz`);
    set_years_button();
    set_month_button();
    set_day_button();
    $(document).on('mouseenter', '.card' ,function(){
        console.log('mouse');
        $(this).find('.blurring.dimmable.image').addClass('drimmed');
        $(this).find('.ui.dimmer').addClass('visible active');
        // $(this).dimmer('show');
    }).on('mouseleave', '.card' ,function(){
        console.log('un_mouse');
        $(this).find('.blurring.dimmable.image').removeClass('drimmed');
        $(this).find('.ui.dimmer').removeClass('visible active');
        // $(this).dimmer('hide');
    });
    $(document.body).on('click', '#btn-delete-img' ,function(e){
        $(this).closest('.card').remove();
        avatar = "";
        // console.log(`before: `,$('#input-file').value);
        document.getElementById("input-file").value = null;
        // $('#input-file').reset;
        // console.log(`after: `,$('#input-file').value);
        $('#upload-preview-avatar').hide();
    });

    $('#years-button').dropdown({
            transition: 'drop',
            onChange: function(value, text, $selectedItem) {
                // $(`#gender-tag`).removeClass('disabled').find(`.scrolling.menu`).empty();
                // update_tags_dropdown('#gender-tag','gender');
            }
        });
    $('#month-button').dropdown({
        transition: 'drop',
        onChange: function(value, text, $selectedItem) {
            // $(`#gender-tag`).removeClass('disabled').find(`.scrolling.menu`).empty();
            // update_tags_dropdown('#gender-tag','gender');
        }
    });
    $('#day-button').dropdown({
        transition: 'drop',
        onChange: function(value, text, $selectedItem) {
            // $(`#gender-tag`).removeClass('disabled').find(`.scrolling.menu`).empty();
            // update_tags_dropdown('#gender-tag','gender');
        }
    });
});
function set_years_button(){
    for(let index = 1960; index < 2018; index++){
        $('#years-button').find('.menu').prepend('                                    <div class="item">'+index+'</div>\n');
    }
}
function set_month_button(){
        $('#month-button').find('.menu').prepend('                                    <div class="item">Январь</div>\n');
        $('#month-button').find('.menu').prepend('                                    <div class="item">Февраль</div>\n');
        $('#month-button').find('.menu').prepend('                                    <div class="item">Март</div>\n');
        $('#month-button').find('.menu').prepend('                                    <div class="item">Апрель</div>\n');
        $('#month-button').find('.menu').prepend('                                    <div class="item">Май</div>\n');
        $('#month-button').find('.menu').prepend('                                    <div class="item">Июнь</div>\n');
        $('#month-button').find('.menu').prepend('                                    <div class="item">Июль</div>\n');
        $('#month-button').find('.menu').prepend('                                    <div class="item">Август</div>\n');
        $('#month-button').find('.menu').prepend('                                    <div class="item">Сентябрь</div>\n');
        $('#month-button').find('.menu').prepend('                                    <div class="item">Октябрь</div>\n');
        $('#month-button').find('.menu').prepend('                                    <div class="item">Ноябрь</div>\n');
        $('#month-button').find('.menu').prepend('                                    <div class="item">Декабрь</div>\n');
}
function set_day_button(){
    for(let index = 1; index < 32; index++){
        $('#day-button').find('.menu').prepend('                                    <div class="item">'+index+'</div>\n');
    }
}
export default {
    get_avatar: get_avatar
}