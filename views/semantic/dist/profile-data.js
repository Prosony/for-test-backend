let path_bookmarks = '../parts/profile-parts/center/bookmarks/bookmarks.ejs';
let path_left = '../parts/profile-parts/left/left-column.ejs';
let path_post = '../parts/profile-parts/center/main/post-content.ejs';
function show_home(token, id){
    $('#content-profile').load(path_post);
    data_update_profile(token,id);
}
function show_bookmarks(){
    $('#content-profile').load(path_bookmarks);
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
            },
            error: function(xhr, status, error) {
                console.log(xhr.responseText + '|\n' + status + '|\n' +error);
            }
    });
}

function set_data_left(profile) {
    console.log('set_data_left',profile);
    $('#name-user').html(profile.name +' '+ profile.surname);
    $('#data-birthday').html(profile.birthday);
    $('#data-phone').html(profile.phone);
    $('#data-about').html(profile.about);

}