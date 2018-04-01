export default async path => {
    return await $.post({
        charset: 'UTF-8',
        ContentType: 'application/json',
        url: 'http://185.77.204.249:8080/files',
        data: path,
    }).catch(error => {
        console.log(`#ERROR [image.ajax.js][path] error: `,error);
    });
}