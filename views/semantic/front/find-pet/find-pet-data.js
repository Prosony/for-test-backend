function data_update_find_pet(token){
    $.ajax({
        url:'http://185.77.205.82:8080/all-post-ad',
        method: 'POST',
        data: JSON.stringify({ 'token':token}),
        ContentType: 'application/json',
        charset:'UTF-8',
        success: function(ad_data) {
            console.log(ad_data);
            show_post_ad(ad_data)
        },
        error: function(xhr, status, error) {
            console.log(xhr.responseText + '|\n' + status + '|\n' +error);
        }
    });
}

function getImage(json_path) {

    return $.ajax({
        url: 'http://185.77.205.82:8080/files',
        method: 'POST',
        data: json_path,
        ContentType: 'application/json',
        charset: 'UTF-8',
        error: function (xhr, status, error) {
            console.log(xhr.responseText + '|\n' + status + '|\n' + error);
        }
    }).done(function (base64string) {
        // console.log(JSON.stringify({'path': [pathToImageFirst,pathToImageSecond]}));
        return base64string;
    });
}