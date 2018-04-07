export default {
    async check_email(email){
        return await $.post({
            charset: 'UTF-8',
            ContentType: 'application/json',
            url: 'http://185.77.204.249:8080/check/email',
            data: JSON.stringify({ email: email})
        }).catch(error => {
            console.log(`#ERROR [get.started.ajax.js][check_email] error: `,error);
        });
    },
    async save_account(account){
        return await $.post({
            charset: 'UTF-8',
            ContentType: 'application/json',
            url: 'http://185.77.204.249:8080/authentication/account/add',
            data: JSON.stringify(account)
        }).catch(error => {
            console.log(`#ERROR [get.started.ajax.js][check_email] error: `,error);
        });
    }
}