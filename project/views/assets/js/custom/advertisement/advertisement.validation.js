import  TagsModule              from '/assets/js/custom/tags/tags.module.js'
import  AdvertisementModule     from '/assets/js/custom/advertisement/advertisement.module.js'

const token = window.localStorage.getItem(`token`);

window.onload = function() {
    $('.ui.form').form(
        {
            inline: true,
            fields: {
                animalsInput: {identifier: 'animalsInput'},
                groupInput: {identifier: 'groupInput'},
                breedsInput: {identifier: 'breedsInput'},
                ageInput: {identifier: 'ageInput'},
                genderInput: {identifier: 'genderInput'}

            },
            onFailure: function () {
                console.log('failed');
                return false;
            },
            onSuccess: function (event, fields) {

                TagsModule.array_tags.animals = fields.animalsInput;
                TagsModule.array_tags.group = fields.groupInput;
                TagsModule.array_tags.breeds = fields.breedsInput;
                TagsModule.array_tags.age = fields.ageInput;

                console.log('#INFO [advertisement-validation] array_tags: ', TagsModule.array_tags);
                TagsModule.get_advertisement_by_tags(token, TagsModule.array_tags).then(function (post_ad) {
                    console.log('#INFO [get_advertisement_by_tags].[THEN] post_ad: \n', post_ad, "\n");
                    AdvertisementModule.clear_advertisement();
                    AdvertisementModule.set_advertisement(post_ad);
                });
                return false;
            }
        },
    );
}