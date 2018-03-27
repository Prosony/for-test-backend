function get_all_dialogs(token){
    return $.ajax({
        url: 'http://185.77.204.249:8080/dialogs',
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
        url: 'http://185.77.204.249:8080/messages',
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


function get_last_message_by_id_dialog(token, id_dialog){
    return $.ajax({
        url: 'http://185.77.204.249:8080///message-last',
        method: 'POST',
        data: JSON.stringify({'token': token, 'id_dialog' : id_dialog}),
        ContentType: 'application/json',
        charset: 'UTF-8',
        success: function (message) {
            return message;
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText + '|\n' + status + '|\n' + error);
        }
    });
}

/**
 *
 * @param token
 * @param id_dialog
 * @returns count unread message
 */
function get_unread_messages(token){
    return $.ajax({
        url: 'http://185.77.204.249:8080//unread-messages',
        method: 'POST',
        data: JSON.stringify({'token': token}),
        ContentType: 'application/json',
        charset: 'UTF-8',
        success: function (count) {
            return count;
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText + '|\n' + status + '|\n' + error);
        }
    });
}

function get_uuid(table){
    return $.ajax({
        url: 'http://185.77.204.249:8080/generate-uuid',
        method: 'POST',
        data: JSON.stringify({'table': table}),
        ContentType: 'application/json',
        charset: 'UTF-8',
        success: function (json_uuid) {
            return json_uuid;
        },
        error: function (xhr, status, error) {
            console.log(xhr.responseText + '|\n' + status + '|\n' + error);
        }
    });
}
