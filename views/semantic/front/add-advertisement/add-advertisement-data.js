function get_json_tag(token,title){
    return $.ajax({
        url:'http://185.77.205.82:8080/tags',
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

function send_post_ad(token,array_text,array_image,array_tags){
    console.log(JSON.stringify({ 'token':token, 'array_text':array_text, 'array_image':'you know', 'array_tags':array_tags}));
    $.ajax({
        url:'http://185.77.205.82:8080/post-content/add',
        method: 'POST',
        data: JSON.stringify({ 'token':token, 'array_text':array_text, 'array_image':array_image, 'array_tags':array_tags}),
        ContentType: 'application/json',
        charset:'UTF-8',
        success: function(json_tag) {
            // return json_tag;
        },
        error: function(xhr, status, error) {
            console.log(xhr.responseText + '|\n' + status + '|\n' +error);
        }
    });
}