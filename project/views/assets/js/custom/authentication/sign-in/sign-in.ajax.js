export default {
    async check_account(email, password){
        return await $.post({
            charset: 'UTF-8',
            ContentType: 'application/json',
            url: 'http://185.77.204.249:3000/authentication/sign-in',
            data: { email: email, password: password}
        }).catch(error => {
            console.log(`#ERROR [sign-in.ajax.js][check_account] error: `,error);
        });
    }
}