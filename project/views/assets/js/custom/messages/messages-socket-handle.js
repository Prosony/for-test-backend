function update_notification(){
    get_unread_messages(window.localStorage.getItem('token')).then(function (count) {
        console.log('count unread message: ',count);
        $('#unread-message-label').html('');
        $('#unread-message-label').html(count);
    });
}