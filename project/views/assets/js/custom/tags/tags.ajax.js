export default {
    async get_json_tag(token, title) {
        return await $.post({
            charset: 'UTF-8',
            ContentType: 'application/json',
            url: 'http://185.77.204.249:8080/tags/category',
            data: JSON.stringify({'token': token, 'title': title})
        }).catch(error => {
            console.log(`#ERROR [tags.ajax.js][get_json_tag] error: `,error);
        });
    },
    async get_own_tag(token, title) {
        return await $.post({
            charset: 'UTF-8',
            ContentType: 'application/json',
            url: 'http://185.77.204.249:8080/tags/own',
            data: JSON.stringify({'token': token, 'title': title})
        }).catch(error => {
            console.log(`#ERROR [tags.ajax.js][get_own_tag] error: `,error);
        });
    },
    async get_advertisement_by_tags(token, tags) {
        return await $.post({
            charset: 'UTF-8',
            ContentType: 'application/json',
            url: 'http://185.77.204.249:8080/search',
            data: JSON.stringify({'token': token, 'json_tags': tags})
        }).catch(error => {
            console.log(`#ERROR [tags.ajax.js][get_advertisement_by_tags] error: `,error);
        });
    }
}
