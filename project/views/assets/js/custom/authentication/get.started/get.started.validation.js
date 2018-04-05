import GetStartedAjax       from '/assets/js/custom/authentication/get.started/get.started.ajax.js'

window.onload = function() {

    $('.ui.form').form(
        {
            inline : true,
            fields: {
                email: {
                    identifier  : 'email', rules: [{type   : 'empty', prompt : 'empty'}, {type   : 'email', prompt : 'email error'}],
                },
                phone: {
                    identifier  : 'phone', rules: [{type   : 'empty', prompt : 'field phone is empty'}, {type   : 'maxLength[25]', prompt : 'Max 25 symbols'},
                        {type : 'regExp', value : '/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\\s\\./0-9]*$/g', prompt : 'not a phone'}],
                },
                firstname: { identifier  : 'firstname',  rules: [{type   : 'empty', prompt : 'empty firstname'}, {type   : 'maxLength[25]', prompt : 'So mach symbols, maximum 25!'}],
                },
                lastname: { identifier  : 'lastname',  rules: [{type   : 'empty', prompt : 'empty lastname!'}, {type   : 'maxLength[25]', prompt : 'So mach symbols, maximum 25!'}],
                },
                password:  {identifier  : 'password', rules: [{type   : 'empty', prompt : 'field password is empty'}, {type   : 'maxLength[35]', prompt : 'Max 35 symbols'}],
                },
                about: { identifier  : 'about',  rules: [{type   : 'empty', prompt : 'Please select category group'}, {type   : 'maxLength[50]', prompt : 'Max 50 symbols'}],
                },
                inputFile: { identifier  : 'inputFile',  rules: [{type   : 'empty', prompt : 'No one photo?'}],
                },
                yearsInput: { identifier  : 'yearsInput',  rules: [{type   : 'empty', prompt : 'years is empty'}],
                },

            },
            onFailure: function() {
                console.log('#INFO [get.started.validation.js][onFailure]');
                return false;
            },
            onSuccess: function(event, fields) {
                GetStartedAjax.check_email(fields.email).then(is_used =>{
                    if (is_used.is_used === true){
                        console.log('asddsaasddsa');
                        $(this).form('add prompt', 'email', 'This email already used!');
                    }else {
                        console.log(`#INFO [get.started.validation.js][onSuccess] fields: `,fields);
                    }
                });
                return false;
            }

        },
    );
};