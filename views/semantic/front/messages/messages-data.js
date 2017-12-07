function get_all_dialogs(token){
    return $.ajax({
        url: 'http://185.77.205.82:8080/dialogs',
        method: 'POST',
        data: JSON.stringify({'token': token}),
        ContentType: 'application/json',
        charset: 'UTF-8',
        success: function (json_dialogs) {
            return json_dialogs;
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText + '|\n' + status + '|\n' + error);
        }
    });
}
function get_messages_by_id_dialog(token, id_dialog){
    return $.ajax({
        url: 'http://185.77.205.82:8080/messages',
        method: 'POST',
        data: JSON.stringify({'token': token, 'id_dialog' : id_dialog}),
        ContentType: 'application/json',
        charset: 'UTF-8',
        success: function (json_dialog) {
            return json_dialog;
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText + '|\n' + status + '|\n' + error);
        }
    });
}



function get_uuid(){
    return $.ajax({
        url: 'http://185.77.205.82:8080/generate-uuid',
        method: 'GET',
        // data: JSON.stringify({'token': token, 'id_dialog' : id_dialog}),
        // ContentType: 'application/json',
        // charset: 'UTF-8',
        success: function (json_uuid) {
            return json_uuid;
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText + '|\n' + status + '|\n' + error);
        }
    });
}
