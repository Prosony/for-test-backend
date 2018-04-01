export default {
    async get_all_advertisement(token){
        return await $.post({
            charset: 'UTF-8',
            ContentType: 'application/json',
            url: 'http://185.77.204.249:8080/all-post-ad',
            data: JSON.stringify({'token': token}),
        }).catch(error => {
            console.log(`#ERROR [advertisement.ajax.js][get_all_advertisement] error: `,error);
        });
    }
}