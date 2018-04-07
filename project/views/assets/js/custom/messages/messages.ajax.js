export default {
    async get_unread (token) {
        return await $.post({
            charset: 'UTF-8',
            ContentType: 'application/json',
            url: 'http://185.77.204.249:8080/unread-messages',
            data: JSON.stringify({ token: token})
        }).catch(error =>{
            console.log(`#ERROR [messages.socket.js] [get_unread] error: `,error);
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
    async create_dialog(token, id_account_outcoming, id_account_incoming){
        return await $.post({
            charset: 'UTF-8',
            ContentType: 'application/json',
            url: 'http://185.77.204.249:8080/dialogs/add',
            data: JSON.stringify({'token': token, 'id_account_outcoming':id_account_outcoming, 'id_account_incoming':id_account_incoming}),
        }).catch(error =>{
            console.log(`#ERROR [messages.socket.js] [get_all_dialogs] error: `,error);
        })
    },
    async get_dialog(token, id_interlocutor){
        return await $.post({
            charset: 'UTF-8',
            ContentType: 'application/json',
            url: 'http://185.77.204.249:8080/dialogs',
            data: JSON.stringify({'token': token, 'id_interlocutor': id_interlocutor}),
        }).catch(error =>{
            console.log(`#ERROR [messages.socket.js] [get_all_dialogs] error: `,error);
        })
    },
    async get_messages_by_id_dialog(token, id_dialog){
        return await $.post({
            charset: 'UTF-8',
            ContentType: 'application/json',
            url: 'http://185.77.204.249:8080/messages',
            data: JSON.stringify({'token': token, 'id_dialog': id_dialog}),
        }).catch(error =>{
            console.log(`#ERROR [messages.socket.js] [get_messages_by_id_dialog] error: `,error);
        })
    },
    async get_last_some_messages(token, id_dialog, count){
        return await $.post({
            charset: 'UTF-8',
            ContentType: 'application/json',
            data: JSON.stringify({'token': token, 'id_dialog': id_dialog, 'count': count}),
            url: 'http://185.77.204.249:8080/messages',
        }).catch(error =>{
            console.log(`#ERROR [messages.socket.js] [get_uuid] error: `,error);
        })
    },
    async get_last_message_by_id_dialog(token, id_dialog){ // TODO rewrite this shit plz
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