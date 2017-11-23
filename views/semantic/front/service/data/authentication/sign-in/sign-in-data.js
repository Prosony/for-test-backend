function check_account(email, password){
    return $.ajax({
                url: 'http://185.77.205.82:3000/check', // url where to submit the request
                type : "POST", // type of action POST || GET
                contentType: 'application/json',
                data : JSON.stringify({ 'email':email, 'password':password}),
                success: function (data) {
                    console.log('data',data);
                    return data;
                },
                error: function(xhr, status, error) {
                    console.log('error')
                    console.log(xhr.responseText + '|\n' + status + '|\n' +error);
                }
            });
}