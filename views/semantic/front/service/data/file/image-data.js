function getImage(json_path) {
    console.log('#INFO [getImage] json_path', json_path);
    return $.ajax({
        url: 'http://185.77.204.249:8080/files',
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