var options = {
    hostname: 'localhost',
    port: 8080,
    path: '/authentication/sign-in',
    method: 'POST',
    headers : {
        'Content-Type' : 'application/json'
    },
};
module.exports.options = options;