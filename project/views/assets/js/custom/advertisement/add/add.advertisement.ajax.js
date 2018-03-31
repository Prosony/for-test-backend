export default {
    async save_advertisement(token,array_text,array_image,array_tags){
        return await $.post({
            charset:'UTF-8',
            ContentType: 'application/json',
            url:'http://185.77.204.249:8080/post-content/add',
            data: JSON.stringify({ 'token':token, 'array_text':array_text, 'array_image':array_image, 'array_tags':array_tags, 'timestamp':Date.now().toString()})
        });
    }
}