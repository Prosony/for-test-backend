export  default {
    async add_bookmark(token, id){
        return await  $.post({
            charset:'UTF-8',
            ContentType: 'application/json',
            data: JSON.stringify({ 'token':token, 'id':id}),
            url:'http://185.77.204.249:8080/favorites/add',
        }).catch(error => {
            console.log(`#ERROR [bookmarks.ajax.js][add_bookmark] error: `,error);
        });
    },
    async delete_bookmark(token, id){
        return await $.post({
            charset:'UTF-8',
            ContentType: 'application/json',
            data: JSON.stringify({ 'token':token, 'id':id}),
            url:'http://185.77.204.249:8080/favorites/delete',
        }).catch(error => {
            console.log(`#ERROR [bookmarks.ajax.js][delete_bookmark] error: `,error);
        });
    }
}

