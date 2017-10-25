var options_sing_in = {
    hostname: 'localhost',
    port: 8080,
    path: '/authentication/sign-in',
    method: 'POST',
    headers : {
        'Content-Type' : 'application/json'
    },
};
var options_profile = {
    hostname: 'localhost',
    port: 8080,
    path: '/profile',
    method: 'POST',
    headers : {
        'Content-Type' : 'application/json'
    },
};

module.exports.options_sing_in = options_sing_in;
module.exports.options_profile = options_profile;