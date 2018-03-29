export  default {
    async add_bookmark(token, id){
        return await  $.post({
            charset:'UTF-8',
            ContentType: 'application/json',
            data: JSON.stringify({ 'token':token, 'id':id}),
            url:'http://185.77.204.249:8080/favorites/add',
        });
    },
    async delete_bookmark(token, id){
        return await $.post({
            charset:'UTF-8',
            ContentType: 'application/json',
            data: JSON.stringify({ 'token':token, 'id':id}),
            url:'http://185.77.204.249:8080/favorites/delete',
        });
    }
}

