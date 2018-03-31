export default {
    async send_post_ad(token,array_text,array_image,array_tags) {
        return await $.post({
            charset: 'UTF-8',
            ContentType: 'application/json',
            url: 'http://185.77.204.249:8080/post-content/add',
            data: JSON.stringify({
                'token': window.token,
                'array_text': array_text,
                'array_image': array_image,
                'array_tags': array_tags,
                'timestamp': Date.now().toString()
            }),
        })
    },
    async get_all_advertisement(token){
        return await $.post({
            charset: 'UTF-8',
            ContentType: 'application/json',
            url: 'http://185.77.204.249:8080/all-post-ad',
            data: JSON.stringify({'token': token}),
        })
    }
}