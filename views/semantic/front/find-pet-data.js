function data_update_find_pet(token){
    $.ajax({
        url:'http://185.77.205.82:8080/all-post-ad',
        method: 'POST',
        data: JSON.stringify({ 'token':token}),
        ContentType: 'application/json',
        charset:'UTF-8',
        success: function(ad_data) {
            console.log(ad_data);
            // set_data_left(profile);
            // getImage(profile.path_avatar,'avatar');
        },
        error: function(xhr, status, error) {
            console.log(xhr.responseText + '|\n' + status + '|\n' +error);
        }
    });
}