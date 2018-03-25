/**POST-AD*/
function get_post_ad_by_id_post(token,id){
    return $.ajax({
        url:'http://185.77.204.249:8080/post-ad-one',
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
function update_data_post_ad(token,id){
    return $.ajax({
        url:'http://185.77.204.249:8080/post-ad',
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
function delete_post_ad_server(token, id){
    // console.log('id post ad:',id);
    $.ajax({
        url:'http://185.77.204.249:8080//post-ad/delete',
        method: 'POST',
        data: JSON.stringify({ 'token':token, 'id':id}),
        ContentType: 'application/json',
        charset:'UTF-8',
        success: function() {
            console.log('SUCCESS delete post ad')
        },
        error: function(xhr, status, error) {
            console.log(xhr.responseText + '|\n' + status + '|\n' +error);
        }
    });
}
/**BOOKMARKS*/
function update_favorites_post_ad(token){
    return $.ajax({
        url:'http://185.77.204.249:8080/favorites',
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