export default {
    async get_posts (id, token) {
        return await $.post({
            charset: 'UTF-8',
            ContentType: 'application/json',
            url: 'http://185.77.204.249:8080/post-ad',
            data: JSON.stringify({ id :id, token: token })
        }).catch(error => {
            console.log(`#ERROR [post.ajax.js][get_posts] error: `,error);
        });
    },
    async get_one_post (id, token){
      return await $.post({
          charset:'UTF-8',
          ContentType: 'application/json',
          url:'http://185.77.204.249:8080/post-ad-one',
          data: JSON.stringify({ 'token':token, 'id':id})
      }).catch(error => {
          console.log(`#ERROR [post.ajax.js][get_one_post] error: `,error);
      });
    },
    async get_bookmarks (token) {
        return await $.post({
            charset: 'UTF-8',
            ContentType: 'application/json',
            url: 'http://185.77.204.249:8080/favorites',
            data: JSON.stringify({ token: token })
        }).catch(error => {
            console.log(`#ERROR [post.ajax.js][get_bookmarks] error: `,error);
        });
    },
    async delete_post(token, id){
        return await  $.post({
            charset:'UTF-8',
            ContentType: 'application/json',
            url:'http://185.77.204.249:8080//post-ad/delete',
            data: JSON.stringify({ 'token':token, 'id':id})
        }).catch(error => {
            console.log(`#ERROR [post.ajax.js][delete_post] error: `,error);
        });
    }
}