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
            // console.log(`fields: `,fields);

            array_tags.animals = fields.animalsInput;
            array_tags.group = fields.groupInput;
            array_tags.breeds = fields.breedsInput;
            array_tags.age = fields.ageInput;

            console.log('#INFO [find-pet-validation] array_tags: ',array_tags);
            get_post_ad_by_tags(token, array_tags).then(function (answer) {

            });
            return false;
        }

    },
);