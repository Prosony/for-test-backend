import MessageModule    from    '/assets/js/custom/messages/messages.module.js'
import AudioModule      from    '/assets/js/custom/audio/audio.module.js'

function  set_unread (token) {
    MessageModule.get_unread(token).then(count => {
        $('#unread-message-label').html('');
        $('#unread-message-label').html(count); //TODO rewrite this shit plz
    })
}

function play_sound_notification() {
    AudioModule.play();
}
export default {
    set_unread:                 set_unread,
    play_sound_notification:    play_sound_notification
}