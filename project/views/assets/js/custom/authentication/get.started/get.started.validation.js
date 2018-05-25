import GetStartedModule            from '/assets/js/custom/authentication/get.started/get.started.module.js'
import GetStartedAjax       from    '/assets/js/custom/authentication/get.started/get.started.ajax.js'
import DateModule           from    '/assets/js/custom/date/date.module.js'
window.onload = function() {

    $('.ui.form').form(
        {
            inline : true,
            fields: {
                email: {
                    identifier  : 'email', rules: [{type   : 'empty', prompt : 'Введите почту'}, {type   : 'email', prompt : 'email error'}],
                },
                phone: {
                    identifier  : 'phone', rules: [{type   : 'empty', prompt : 'field phone is empty'}, {type   : 'maxLength[25]', prompt : 'Max 25 symbols'},
                        {type : 'regExp', value : '/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\\s\\./0-9]*$/g', prompt : 'not a phone'}],
                },
                firstname: { identifier  : 'firstname',  rules: [{type   : 'empty', prompt : 'Введите имя'}, {type   : 'maxLength[25]', prompt : 'So mach symbols, maximum 25!'}],
                },
                lastname: { identifier  : 'lastname',  rules: [{type   : 'empty', prompt : 'Введите фамилию!'}, {type   : 'maxLength[25]', prompt : 'So mach symbols, maximum 25!'}],
                },
                password:  {identifier  : 'password', rules: [{type   : 'empty', prompt : 'Придумайте пароль'}, {type   : 'maxLength[35]', prompt : 'Max 35 symbols'}],
                },
                about: { identifier  : 'about',  rules: [{type   : 'empty', prompt : 'Расскажите о себе'}, {type   : 'maxLength[1000]', prompt : 'Max 1000 symbols'}],
                },
                inputFile: { identifier  : 'inputFile',  rules: [{type   : 'empty', prompt : 'Ни одной фотографии?'}],
                },
                dayInput: { identifier  : 'dayInput',  rules: [{type   : 'empty', prompt : 'Укажите день'}],
                },
                monthInput: { identifier  : 'monthInput',  rules: [{type   : 'empty', prompt : 'Укажите месяц'}],
                },
                yearsInput: { identifier  : 'yearsInput',  rules: [{type   : 'empty', prompt : 'Укажите год'}],
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
                        let account = JSON.parse('{' +
                            '  "email": "",' +
                            '  "password": "",' +
                            '  "phone": "",' +
                            '  "firstname": "",' +
                            '  "lastname": "",' +
                            '  "base64avatar": "",' +
                            '  "birthday": "",' +
                            '  "about": "",' +
                            '  "date_create_account": ""' +
                            '}');
                        account.email = fields.email;
                        account.password = fields.password;
                        account.phone = fields.phone;
                        account.firstname = fields.firstname;
                        account.lastname = fields.lastname;
                        account.base64avatar = GetStartedModule.get_avatar();
                        let month = DateModule.get_month(fields.monthInput.toString());
                        console.log(`month: `, month, `fields.monthInput.toString(): `,fields.monthInput.toString());
                        account.birthday = fields.dayInput +'.'+ month +'.'+ fields.yearsInput;
                        account.about = fields.about;
                        account.date_create_account = Date.now();
                        console.log(`#INFO [get.started.validation.js][onSuccess] account: `,account);

                        GetStartedAjax.save_account(account).then(is_save =>{
                            console.log(`#SUCCESS [get.started.validation.js][onSuccess] account was save!`);
                            console.log(is_save);
                            window.location.href = '/authentication/sign-in'
                        });

                    }
                });
                return false;
            }

        },
    );
};