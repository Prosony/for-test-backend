function check_account(email, password){
    return $.ajax({
                url: 'http://185.77.204.249:3000/check', // url where to submit the request
                headers: {
                    'Content-Type': 'application/json'
                },
                type : "POST", // type of action POST || GET

                data : JSON.stringify({ 'email':email, 'password':password}),
                success: function (data) {
                    console.log('data',data);
                    return data;
                },
                error: function(xhr, status, error) {
                    console.log('error');
                    console.log(xhr.responseText + '|\n' + status + '|\n' +error);
                }
            });
}