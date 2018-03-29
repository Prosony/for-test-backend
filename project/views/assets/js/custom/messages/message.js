export default {
    async getUnread (token) {
        return await $.post({
            charset: 'UTF-8',
            ContentType: 'application/json',
            url: 'http://185.77.204.249:8080/unread-messages',
            data: JSON.stringify({ token: token})
        })
    },
    changeState (state) {
        if (state) {
            $('.another').css('background-color', '');
        } else {
            $('.me').css('background-color', '');
        }
    },
    show (message, is_me) {
        if (id_dialog === message.data.id_dialog) {
            let target, blabla;

            if (is_me) {
                blabla = "me";
                target = j_array_data_my
            } else {
                blabla = "another";
                target = j_array_data_incoming
            }
            $('#messages-block').append(
                `<div class="comment ${blabla}" id="${message.data.id_message}" style="background-color:rgba(113,111,122,0.11)">
                    <a class="avatar">
                        <img src="${target.img}">
                    </a>
                    <div class="content">
                        <a class="author" href="/profile/${target.id_account}">${target.full_name}</a>
                        <div class="metadata">
                            <span class="date">${get_date_time(new Date(message.data.date_time))}</span>
                        </div>
                        <div class="text">
                            <p>${message.data.message}</p>
                        </div>
                        <div class="actions">
                            <a class="delete">Delete</a>
                        </div>
                    </div>
                </div>
            `)
            $('#message-scroll-block').scrollTop()
        }
    }
}