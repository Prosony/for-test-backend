function get_json_tag(token,title){
    return $.ajax({
        url:'http://185.77.205.82:8080/tags/category',
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
function get_json_tag_for_search(token, tags){
    return $.ajax({
        url:'http://185.77.205.82:8080/tags/own',
        method: 'POST',
        data: JSON.stringify({ 'token':token, 'tags':tags}),
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