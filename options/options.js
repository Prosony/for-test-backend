let options_sign_in = {
    hostname: 'localhost',
    port: 8080,
    path: '/authentication/sign-in',
    method: 'POST',
    headers : {
        'Content-Type' : 'application/json'
    }
};
let options_profile = {
    hostname: 'localhost',
    port: 8080,
    path: '/profile',
    method: 'POST',
    headers : {
        'Content-Type' : 'application/json'
    }
};

let options_file = {
    hostname: 'localhost',
    port: 8080,
    path: '/files',
    method: 'POST',
    headers : {
        'Content-Type' : 'application/json'
    }
};

let options_sign_out = {
    hostname: 'localhost',
    port: 8080,
    path: '/authentication/sign-out',
    method: 'POST',
    headers : {
        'Content-Type' : 'application/json'
    }
};
module.exports.options_file = options_file;
module.exports.options_profile = options_profile;

module.exports.options_sign_in = options_sign_in;
module.exports.options_sign_out = options_sign_out;
