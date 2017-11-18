window.onload = function() {
    menu_sticky();
    $(document).on('mouseenter', '.blurring.dimmable.image' ,function(){
        $(this).dimmer('show');
    }).on('mouseleave', '.blurring.dimmable.image' ,function(){
        $(this).dimmer('hide');
    });
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
                header: { identifier  : 'header',  rules: [{type   : 'empty', prompt : 'Who search new home?'}, {type   : 'maxLength[30]', prompt : 'So mach symbols, maximum 35!'}],
                },
                wallTextArea: { identifier  : 'wallTextArea',  rules: [{type   : 'empty', prompt : 'Write something about pet!'}, {type   : 'maxLength[250]', prompt : 'So mach symbols, maximum 250!'}],
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
                if (array_image.length < 2){
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



                    array_tags.animals = fields.animalsInput;
                    array_tags.group = fields.groupInput;
                    array_tags.breeds = fields.breedsInput;
                    array_tags.age = fields.ageInput;


                    console.log('array_text: ',array_text);
                    console.log('array_tags: ',array_tags);
                    console.log('array_image.length: ',array_image.length);
                    send_post_ad(window.token, array_text, array_image, array_tags);
                }




                //                    for(let index = 0; index < array.length; index++){
//                        $('#segmentimage').append('<img src="'+array[index]+'">');
////                        console.log('array['+index+']: ',array[index].toString().substring(200,250));
//                    }

                return false;
            }

        },
    );
};