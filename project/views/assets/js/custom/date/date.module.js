export default (date) => {
    let years = date.getUTCFullYear();
    let month = date.getUTCMonth();
    let day = date.getUTCDate();

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    let result = years+'-';

    if(month < 10){
        result +='0'+month+'-';
    }else{
        result +=''+month+'-';
    }
    if(day < 10){
        result +='0'+day+' ';
    }else{
        result +=''+day+' ';
    }

    if (hours < 10){
        result += '0'+hours;
    }else{
        result += ''+hours;
    }
    if (minutes < 10){
        result += ':0'+minutes;
    }else{
        result += ':'+minutes;
    }
    if (seconds < 10){
        result += ':0'+seconds;
    }else{
        result += ':'+seconds;
    }
    // result += new Date().getHours()+':'+new Date().getMinutes()+':'+new Date().getSeconds();
    // console.log('#INFO [SOCKET] [get_date_time] result_data: ',result);
    //Dec 8, 2017, 5:20:52 PM from 2017-12-08 17:26:57
    return result;
}