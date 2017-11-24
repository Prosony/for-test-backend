$('.ui.form').form(
    {
        inline : true,
        fields: {
            animalsInput: { identifier  : 'animalsInput'},
            groupInput: { identifier  : 'groupInput'},
            breedsInput: { identifier  : 'breedsInput'},
            ageInput: { identifier  : 'ageInput'},
            genderInput: { identifier  : 'genderInput'}

        },
        onFailure: function() {
            console.log('failed');
            return false;
        },
        onSuccess: function(event, fields) {
            // $(this).form('add prompt', 'inputFile', 'You must upload at least two pictures!');
            let array_text = JSON.parse('{' +
                '  "header":"",' +
                '  "email": "",' +
                '  "phone": "",' +
                '  "wall_text": ""' +
                '}');
            console.log(`fields: `,fields);

            array_tags.animals = fields.animalsInput;
            array_tags.group = fields.groupInput;
            array_tags.breeds = fields.breedsInput;
            array_tags.age = fields.ageInput;

            console.log('array_text: ',array_text);
            console.log('array_tags: ',array_tags);

            return false;
        }

    },
);