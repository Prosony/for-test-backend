import ImageModule      from '/assets/js/custom/image/image.ajax.js'
import ProfileModule    from '/assets/js/custom/profile/profile.ajax.js'
import PostModule       from '/assets/js/custom/post/post.module.js'

$(() => { //document.ready типа того
    const id    = window.localStorage.getItem('id_account')
    const token = window.localStorage.getItem('token')
    const me = window.localStorage.getItem('id_me')

    ProfileModule.update(id, token).then(profile => {
            ImageModule(JSON.stringify({ path: [profile.path_avatar]})).then(images => {
                console.log('воркает')
                    $('#right_column').load('/columns/profile/right.ejs', () => {
                        $('#left_column').load('/columns/profile/left.ejs', () => {
                            $('#avatar').attr('src', images)
                            $('#name-user').append(`${profile.name} ${profile.surname}`)
                            $('#data-phone').append(profile.phone)
                            $('#data-about').append(profile.about)
                            $('#data-birthday').append(profile.birthday)
                            PostModule.get_posts(id, token).then(post_ad => {
                                PostModule.setPost(post_ad);
                            })
                        })
                    })
                }).catch(error => {
                    console.error(`#ERROR : ${error.message}`)
                })
        }).catch(error => {
            console.error(`#ERROR : ${error.message}`)
        })

    const left_column = $('#left_column')
    if (me) {
        left_column.append(`
            <a class="ui fluid button" href="/add-advertisement">
                <i class="add icon"></i>Add Advertisement
            </a>`)
    } else {
        left_column.append(`
            <a class="ui fluid button" href="/add-advertisement" >
                <i class="mail icon"></i>Send message\n
            </a>`)
    }
})