function send_post_ad(token,array_text,array_image,array_tags){
    console.log(JSON.stringify({ 'token':token, 'array_text':array_text, 'array_image':'you know', 'array_tags':array_tags, 'timestamp':Date.now().toString()}));
   return $.ajax({
        url:'http://185.77.204.249:8080/post-content/add',
        method: 'POST',
        data: JSON.stringify({ 'token':window.token, 'array_text':array_text, 'array_image':array_image, 'array_tags':array_tags, 'timestamp':Date.now().toString()}),
        ContentType: 'application/json',
        charset:'UTF-8',
        success: function(json_answer) {
            console.log('Success! post_ad was add: ',json_answer);
            return json_answer;
        },
        error: function(xhr, status, error) {
            return false;
            console.log(xhr.responseText + '|\n' + status + '|\n' +error);
        }
    });
}