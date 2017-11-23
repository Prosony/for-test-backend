function data_update_find_pet(token){
    return $.ajax({
            url:'http://185.77.205.82:8080/all-post-ad',
            method: 'POST',
            data: JSON.stringify({ 'token':token}),
            ContentType: 'application/json',
            charset:'UTF-8',
            success: function(ad_data) {
                // console.log(ad_data);
               return ad_data
            },
            error: function(xhr, status, error) {
                console.log(xhr.responseText + '|\n' + status + '|\n' +error);
            }
        });
}
