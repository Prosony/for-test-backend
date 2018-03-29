export default {
    async get_posts (id, token) {
        return await $.post({
            charset: 'UTF-8',
            ContentType: 'application/json',
            url: 'http://185.77.204.249:8080/profile',
            data: JSON.stringify({ id: id, token: token })
        })
    }
}