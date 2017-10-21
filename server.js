var express = require('express');
var http = require('http');
var path = require('path');

var app = express();
var port = 3000;

var id_account;
var token;
app.use(express.static(path.join(__dirname, 'view')));

app.get('/', function(request, responce){
    console.log('#INFO address: %s',request.url);
    
    if(id_account !=undefined && token !=undefined ){
        console.log('token and id not empty');
        responce.cookie('cookie','this is cookie',{
            httpOnly: true,
            maxAge: 2000
        });
        responce.cookie('anotherCookie','this is another cookie!');
        responce.clearCookie('anotherCookie');
        responce.sendFile(path.join(__dirname,'/view/profile.html'));    
    }else{
        responce.sendFile(path.join(__dirname,'/view/sign-in.html'));
    }
});

app.get('/sign-in',function(request, responce){
    responce.sendFile(path.join(__dirname,'/view/sign-in.html'));
});

app.post('/check', function(request, responce){
    // console.log('request',request);
    request.on('data', function (data) {
        var answer = JSON.parse(data);
        id_account = answer.id;
        token = answer.token;
        
        console.log('#INFO address: %s',request.url);
        console.log('id_account %s, token: %s',id_account,token);

        if(id_account.trim() && token.trim()){
            console.log('token and id not empty');
        }

    });
});

app.listen(port, function(){
    console.log('server start on port 3000');
});
