function get_json_tag(token,title){
    return $.ajax({
        url:'http://185.77.204.249:8080/tags/category',
        method: 'POST',
        data: JSON.stringify({ 'token':token, 'title':title}),
        ContentType: 'application/json',
        charset:'UTF-8',
        success: function(json_tag) {
            return json_tag;
        },
        error: function(xhr, status, error) {
            console.log(xhr.responseText + '|\n' + status + '|\n' +error);
        }
    });
}

function get_json_own_tag(token, title) {
    return $.ajax({
        url: 'http://185.77.204.249:8080/tags/own',
        method: 'POST',
        data: JSON.stringify({'token': token, 'title': title}),
        ContentType: 'application/json',
        charset: 'UTF-8',
        success: function (json_tag) {
            return json_tag;
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText + '|\n' + status + '|\n' + error);
        }
    });
}
function get_post_ad_by_tags(token, tags) {
    return $.ajax({
        url: 'http://185.77.204.249:8080/search',
        method: 'POST',
        data: JSON.stringify({'token': token, 'json_tags': tags}),
        ContentType: 'application/json',
        charset: 'UTF-8',
        success: function (json_post_ad) {
            return json_post_ad;
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText + '|\n' + status + '|\n' + error);
        }
    });
}