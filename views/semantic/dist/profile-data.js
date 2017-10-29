let path_bookmarks = '../parts/profile-parts/center/bookmarks/bookmarks.ejs';
let path_left = '../parts/profile-parts/left/left-column.ejs';
let path_post = '../parts/profile-parts/center/main/post-content.ejs';

function show_home(token, id){
    $('#content-column-block').load(path_post, function () {
        data_update_profile(token,id);
        update_data_post_ad(token,id)
    });

}
function show_bookmarks(){
    $('#content-column-block').load(path_bookmarks);
}
function show_find_pet() {
    $('#content-column-block').load(path_bookmarks);
}
function data_update_profile(token,id){
    $.ajax({
            url:'http://185.77.205.82:8080/profile',
            method: 'POST',
            data: JSON.stringify({ 'token':token, 'id':id}),
            ContentType: 'application/json',
            charset:'UTF-8',
            success: function(profile) {
                set_data_left(profile);
                getImage(profile.path_avatar,'avatar');
            },
            error: function(xhr, status, error) {
                console.log(xhr.responseText + '|\n' + status + '|\n' +error);
            }
    });
}
function update_data_post_ad(token,id){
    $.ajax({
        url:'http://185.77.205.82:8080/post-ad',
        method: 'POST',
        data: JSON.stringify({ 'token':token, 'id':id}),
        ContentType: 'application/json',
        charset:'UTF-8',
        success: function(post_ad) {
            console.log('post_ad: ',post_ad);
            set_data_post_ad(post_ad);
        },
        error: function(xhr, status, error) {
            console.log(xhr.responseText + '|\n' + status + '|\n' +error);
        }
    });
}
function getImage(path,element){
    $.ajax({
        url: 'http://185.77.205.82:8080/files',
        method: 'POST',
        data: JSON.stringify({ 'path': path}),
        ContentType: 'application/json',
        charset:'UTF-8',
        success: function(base64string) {
        set_image(element,base64string);
        },
        error: function(xhr, status, error) {
            console.log(xhr.responseText + '|\n' + status + '|\n' +error);
        }
    });
}
function getImageOnPage(path){
   return $.ajax({
            url: 'http://185.77.205.82:8080/files',
            method: 'POST',
            data: JSON.stringify({ 'path': path}),
            ContentType: 'application/json',
            charset:'UTF-8',
            success: function(base64string) {
                // set_image(element,base64string);
                // console.log('getImageOnPage: ',base64string);
                return base64string;
            },
            error: function(xhr, status, error) {
                console.log(xhr.responseText + '|\n' + status + '|\n' +error);
            }
        });
}

function set_image(element, base64string){
    document.getElementById(element).src = `data:image/png;base64,${base64string}`;
}
function set_data_left(profile) {
    console.log('set_data_left',profile);
    $('#name-user').html(profile.name +' '+ profile.surname);
    $('#data-birthday').html(profile.birthday);
    $('#data-phone').html(profile.phone);
    $('#data-about').html(profile.about);

}
function set_data_post_ad(post_ad){
    console.log('set_data_post_ad', post_ad[0].id);
    for (let index = 0; index < post_ad.length; index++){
        getImageOnPage(post_ad[index].pathToImageFirst).then(function (base64string_first) {
            getImageOnPage(post_ad[index].pathToImageSecond).then(function (base64string_second) {
                $('#ad-post-content').append('<div class="ui items">\n' +
                    '            <div class="item" id="'+post_ad[index].id+'">\n' +
                    '                <div class="ui small circular rotate left reveal image" style="border-radius: 5px; height: 200px">\n' +
                    '                    <img id="first-image" src="data:image/png;base64,'+base64string_first+'" class="visible content">\n' +
                    '                    <img id="second-image" src="data:image/png;base64,'+base64string_second+'" class="hidden content">\n' +
                    '                </div>\n' +
                    '                <div class="content">\n' +
                    '                    <a class="header">'+post_ad[index].header+'</a>\n' +
                    '                    <div class="right floated star">\n' +
                    '                        <i class="favorite icon"></i>Favorite\n' +
                    '                    </div>\n' +
                    '                    <div class="meta">\n' +
                    '                        <span>'+post_ad[index].date.day+'.'+post_ad[index].date.month+'.'+post_ad[index].date.year+'</span>\n' +
                    '                    </div>\n' +
                    '                    <div class="description">\n' +
                    '                        <p>'+post_ad[index].wallText+'</p>\n' +
                    '                    </div>\n' +
                    '                    <div class="extra content">\n' +
                    '                        <div class="ui label">Limited</div>\n' +
                    '                        <div class="ui right floated button">Watch\n' +
                    '                            <i class="right chevron icon"></i>\n' +
                    '                        </div>\n' +
                    '                    </div>\n' +
                    '                </div>\n' +
                    '            </div>\n' +
                    '        </div>');
            });
        });
    }
}