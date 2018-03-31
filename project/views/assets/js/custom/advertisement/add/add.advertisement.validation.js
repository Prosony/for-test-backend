import AddAdvertisementAjax         from '/assets/js/custom/advertisement/add/add.advertisement.ajax.js'
import AddAdvertisementImageModule  from '/assets/js/custom/advertisement/add/add.advertisement.image.module.js'
import TagsModule                   from '/assets/js/custom/tags/tags.module.js'

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
                header: { identifier  : 'header',  rules: [{type   : 'empty', prompt : 'Who search new home?'}, {type   : 'maxLength[45]', prompt : 'So mach symbols, maximum 45!'}],
                },
                wallTextArea: { identifier  : 'wallTextArea',  rules: [{type   : 'empty', prompt : 'Write something about pet!'}, {type   : 'maxLength[1000]', prompt : 'So mach symbols, maximum 1000!'}],
                },
                inputFile: { identifier  : 'inputFile',  rules: [{type   : 'empty', prompt : 'No one photo?'}],
                },
                animalsInput: { identifier  : 'animalsInput',  rules: [{type   : 'empty', prompt : 'Please select category animals'}],
                },
                groupInput: { identifier  : 'groupInput',  rules: [{type   : 'empty', prompt : 'Please select category group'}],
                },
                breedsInput: { identifier  : 'breedsInput',  rules: [{type   : 'empty', prompt : 'Please select category breeds'}],
                },
                ageInput: { identifier  : 'ageInput',  rules: [{type   : 'empty', prompt : 'Please select category age'}],
                },
                genderInput: { identifier  : 'genderInput',  rules: [{type   : 'empty', prompt : 'Please select category gender'}],
                }

            },
            onFailure: function() {
                console.log('failed');
                return false;
            },
            onSuccess: function(event, fields) {
                if (AddAdvertisementImageModule.array_image.length < 2){
                    $(this).form('add prompt', 'inputFile', 'You must upload at least two pictures!');
                }else{
                    let array_text = JSON.parse('{' +
                        '  "header":"",' +
                        '  "email": "",' +
                        '  "phone": "",' +
                        '  "wall_text": ""' +
                        '}');
                    console.log('event.target[0].files.length: ', event.target[0].files.length);
                    console.log(`fields: `,fields);
                    array_text.header = fields.header;
                    array_text.email = fields.email;
                    array_text.phone = fields.phone;
                    array_text.wallTextArea = fields.wallTextArea;

                    TagsModule.array_tags.animals = fields.animalsInput;
                    TagsModule.array_tags.group = fields.groupInput;
                    TagsModule.array_tags.breeds = fields.breedsInput;
                    TagsModule.array_tags.age = fields.ageInput;
                    TagsModule.array_tags.gender = fields.genderInput;

                    console.log('array_text: ',array_text);
                    console.log('array_tags: ',TagsModule.array_tags);
                    console.log('array_image.length: ',AddAdvertisementImageModule.array_image.length);

                    AddAdvertisementAjax.save_advertisement(window.localStorage.getItem('token'), array_text, AddAdvertisementImageModule.array_image, TagsModule.array_tags).then(function (answer) {
                        console.log('#INFO [add.advertisement.validation.js] from answer backend: ',answer);
                       if (answer){
                           window.location = 'http://185.77.204.249:3000/profile/'+window.localStorage.getItem('id_account');
                       }else{
                        console.log('#ERROR [add.advertisement.validation.js] something wrong, Check logs!');
                       }
                    }).catch(error =>{
                        console.log(`#ERROR [add.advertisement.validation.js] ${error}`);
                    });
                }
                return false;
            }

        },
    );
};