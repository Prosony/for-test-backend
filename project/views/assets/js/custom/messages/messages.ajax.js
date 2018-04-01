export default {
    async get_unread (token) {
        return await $.post({
            charset: 'UTF-8',
            ContentType: 'application/json',
            url: 'http://185.77.204.249:8080/unread-messages',
            data: JSON.stringify({ token: token})
        })
    },
    async get_all_dialogs(token){
        return await $.post({
            charset: 'UTF-8',
            ContentType: 'application/json',
            url: 'http://185.77.204.249:8080/dialogs',
            data: JSON.stringify({'token': token}),
        }).catch(error =>{
            console.log(`#ERROR [messages.socket.js] [get_all_dialogs] error: `,error);
        })
    },
    async get_messages_by_id_dialog(token, id_dialog){
        return await $.post({
            charset: 'UTF-8',
            ContentType: 'application/json',
            url: 'http://185.77.204.249:8080/messages',
            data: JSON.stringify({'token': token, 'id_dialog' : id_dialog}),
        }).catch(error =>{
            console.log(`#ERROR [messages.socket.js] [get_messages_by_id_dialog] error: `,error);
        })
    },
    async get_last_message_by_id_dialog(token, id_dialog){
        return await $.post({
            charset: 'UTF-8',
            ContentType: 'application/json',
            url: 'http://185.77.204.249:8080/message-last',
            data: JSON.stringify({'token': token, 'id_dialog' : id_dialog}),
        }).catch(error =>{
            console.log(`#ERROR [messages.socket.js] [get_last_message_by_id_dialog] error: `,error);
        })
    },
    async get_uuid(table){
        return await $.post({
            charset: 'UTF-8',
            ContentType: 'application/json',
            data: JSON.stringify({'table': table}),
            url: 'http://185.77.204.249:8080/generate-uuid',
        }).catch(error =>{
            console.log(`#ERROR [messages.socket.js] [get_uuid] error: `,error);
        })
    }
}