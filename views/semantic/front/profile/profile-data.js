function update_data_profile(token,id){
   return $.ajax({
            url:'http://185.77.204.249:8080/profile',
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
function checkAccount(id){
    console.log('#INFO [checkAccount] id_account', id);
    return $.ajax({
        url: 'http://185.77.204.249:8080/check-account',
        method: 'POST',
        data: JSON.stringify({'id':id}),
        ContentType: 'application/json',
        charset: 'UTF-8',
        success: function(answer) {
            return answer;
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText + '|\n' + status + '|\n' + error);
        }
    });
}
