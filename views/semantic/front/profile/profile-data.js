function update_data_profile(token,id){
   return $.ajax({
            url:'http://185.77.205.82:8080/profile',
            method: 'POST',
            data: JSON.stringify({ 'token':token, 'id':id}),
            ContentType: 'application/json',
            charset:'UTF-8',
            success: function(profile) {
                return profile;
            },
            error: function(xhr, status, error) {
                console.log(xhr.responseText + '|\n' + status + '|\n' +error);
            }
    });
}
function update_data_post_ad(token,id){
    return $.ajax({
            url:'http://185.77.205.82:8080/post-ad',
            method: 'POST',
            data: JSON.stringify({ 'token':token, 'id':id}),
            ContentType: 'application/json',
            charset:'UTF-8',
            success: function(post_ad) {
                return post_ad;
            },
            error: function(xhr, status, error) {
                console.log(xhr.responseText + '|\n' + status + '|\n' +error);
            }
        });
}
function get_post_ad_by_id_post(token,id){
    return $.ajax({
        url:'http://185.77.205.82:8080/post-ad-one',
        method: 'POST',
        data: JSON.stringify({ 'token':token, 'id':id}),
        ContentType: 'application/json',
        charset:'UTF-8',
        success: function(post_ad) {
            return post_ad;
        },
        error: function(xhr, status, error) {
            console.log(xhr.responseText + '|\n' + status + '|\n' +error);
        }
    });
}
function update_favorites_post_ad(token){
    return $.ajax({
            url:'http://185.77.205.82:8080/favorites',
            method: 'POST',
            data: JSON.stringify({ 'token':token}),
            ContentType: 'application/json',
            charset:'UTF-8',
            success: function(favorites_post_ad) {
                console.log('#INFO [update_favorites_post_ad] [SUCCESS] favorites_post_ad: ',favorites_post_ad);
                return favorites_post_ad;
            },
            error: function(xhr, status, error) {
                console.log(xhr.responseText + '|\n' + status + '|\n' +error);
        }
    });
}
function getImage(json_path) {
    console.log('#INFO [getImage] json_path', json_path);
    return $.ajax({
            url: 'http://185.77.205.82:8080/files',
            method: 'POST',
            data: json_path,
            ContentType: 'application/json',
            charset: 'UTF-8',
            success: function(base64string) {
                return base64string;
            },
            error: function (xhr, status, error) {
                console.log(xhr.responseText + '|\n' + status + '|\n' + error);
            }
        });
}