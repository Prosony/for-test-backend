window.onload = function() {
    $('.ui.form').form(
        {
            inline : true,
            on     : 'blur',
            fields: {
                email: {
                    identifier  : 'email', rules: [{type   : 'empty', prompt : 'field email is empty'}, {type   : 'email', prompt : 'email error'}],
                },
                password: {
                    identifier  : 'password', rules: [{type   : 'empty', prompt : 'field password is empty'}, {type   : 'maxLength[35]', prompt : 'Max 35 symbols'}],
                }
            },
            onFailure: function()
            {
                console.log('failed');
                return false;
            },
            onSuccess: function(event, fields)
            {
                console.log(event);
                console.log(fields);
                check_account(fields.email, fields.password).then(function (data) {
                    if(data.err === 204){
                        console.log('account not found')
                        $("#form-main").find('.ui.error.message.transition.hidden').removeClass('transition').removeClass('hidden');
                    }else{
                        window.location = data.redirectUrl;
                    }
                });

                return false;
            }
        },
    );
    $(".close.icon").on('click',function(){
        $("#form-main").find('.ui.error.message').addClass('transition').addClass('hidden');
    });
};