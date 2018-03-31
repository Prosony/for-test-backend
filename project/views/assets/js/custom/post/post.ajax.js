export default {
    async get_posts (id, token) {
        return await $.post({
            charset: 'UTF-8',
            ContentType: 'application/json',
            url: 'http://185.77.204.249:8080/post-ad',
            data: JSON.stringify({ id :id, token: token })
        })
    },
    async get_one_post (token,id){
      return await $.post({
          charset:'UTF-8',
          ContentType: 'application/json',
          url:'http://185.77.204.249:8080/post-ad-one',
          data: JSON.stringify({ 'token':token, 'id':id})
      })
    },
    async get_bookmarks (token) {
        return await $.post({
            charset: 'UTF-8',
            ContentType: 'application/json',
            url: 'http://185.77.204.249:8080/favorites',
            data: JSON.stringify({ token: token })
        })
    },
    async delete_post(token, id){
        return await  $.post({
            charset:'UTF-8',
            ContentType: 'application/json',
            url:'http://185.77.204.249:8080//post-ad/delete',
            data: JSON.stringify({ 'token':token, 'id':id})
        });
    },

}