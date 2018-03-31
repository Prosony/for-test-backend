/******************************************************************
 *                              image                             *
 *****************************************************************/
let array_image = [];

$(document.body).on('click', '#btn-delete-img' ,function(e){

    let index = $(this).closest('.card').attr('id');
    console.log('click e.target: ',e.target,' id: ',index);
    console.log('before delete array: ',array_image);
    array_image.splice(index, 1);
    console.log('after delete array: ',array_image);
    if (array_image.length == 0) {
      $('#upload-preview-image').hide()
    }
    preview_image();

});

$('#input-file').change(function (e) { //TODO something
    let files = e.target.files;
    $('#upload-preview-image').show();
    console.log('#INFO [add.advertisement.image.module.js] files.length: ',files.length);
    for(let inx = 0; inx < files.length; inx++){
        blob_to_base64(files[inx]);
    }
});

function blob_to_base64(file) {
    let reader = new FileReader();
    reader.onload = function(buffer) {
        array_image.push(buffer.target.result);
        preview_image();
    };
    reader.readAsDataURL(file);
}
function preview_image(){
    $('#upload-preview-image').find('.card').remove();
    for (let index = 0; index < array_image.length; index++){
        $('#upload-preview-image').append(
            ' <div class="card" id="'+index+'" style="height: 100px; width: auto">\n' +
            '        <div class="blurring dimmable image" style="height: 100px; width: auto">\n' +
            '            <div class="ui dimmer transition" >\n' +
            '                <div class="content">\n' +
            '                    <div class="center">\n' +
            '                        <a id="btn-delete-img" class="ui item">\n' +
            '                            <i class="remove icon"></i>\n' +
            '                        </a>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '                <img src="'+array_image[index]+'" style="height: 100px; width: auto">\n' +
            '            </div>\n' +
            '        </div>');
    }
}

$(() => {
    console.log(`start plz`);

    $(document).on('mouseenter', '.card' ,function(){
       console.log('mouse');
        $(this).find('.blurring.dimmable.image').addClass('drimmed');
        $(this).find('.ui.dimmer.transition').addClass('visible active');
        // $(this).dimmer('show');
    }).on('mouseleave', '.card' ,function(){
        console.log('un_mouse');
        $(this).find('.blurring.dimmable.image').removeClass('drimmed');
        $(this).find('.ui.dimmer.transition').removeClass('visible active');
        // $(this).dimmer('hide');
    });
});

export default {
    array_image: array_image
}
/******************************************************************
 *                              for test                          *
 *****************************************************************/
$(document.body).on('click','#printimg',function () {
    console.log('clock print');
    for (let index = 0; index < array_image.length; index++){
        $('#segmentimage').append('<img src="'+array_image[index]+'" style="height: 100px; width: auto">');
    }
});
$(document.body).on('click','#clearprintimg',function () {
    console.log('clock clear');
    $('#segmentimage').find('img').remove();
});
