function add_bookmark(token, id){
    // console.log('id post ad:',id);
    $.ajax({
        url:'http://185.77.204.249:8080/favorites/add',
        method: 'POST',
        data: JSON.stringify({ 'token':token, 'id':id}),
        ContentType: 'application/json',
        charset:'UTF-8',
        success: function() {
            console.log('add post ad to favorites!')
        },
        error: function(xhr, status, error) {
            console.log(xhr.responseText + '|\n' + status + '|\n' +error);
        }
    });
}

function delete_bookmark(token, id){
    // console.log('id post ad:',id);
    $.ajax({
        url:'http://185.77.204.249:8080/favorites/delete',
        method: 'POST',
        data: JSON.stringify({ 'token':token, 'id':id}),
        ContentType: 'application/json',
        charset:'UTF-8',
        success: function() {
            console.log('delete post ad from favorites!')
        },
        error: function(xhr, status, error) {
            console.log(xhr.responseText + '|\n' + status + '|\n' +error);
        }
    });
}