function translate_timestamp(date){
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
function get_month(month){

        if(month.toLowerCase() === "январь" || month.toLowerCase() === "january") {
            return "01";
        }
        if (month.toLowerCase() === "Февраль" || month.toLowerCase() === "February") {
            return "02";
        }
        if (month.toLowerCase() === "март" || month.toLowerCase() === "march") {

            return "03";
        }
        if (month.toLowerCase() === "апрель" || month.toLowerCase() === "april") {
            return "04";
        }
        if(month.toLowerCase() === "май"  || month.toLowerCase() === "may") {
            return "05";
        }
        if(month.toLowerCase() === "июнь" || month.toLowerCase() === "june") {
            return "06";
        }
        if(month.toLowerCase() === "июль" || month.toLowerCase() === "jule"){
            return "07";
        }

        if(month.toLowerCase() === "август" || month.toLowerCase() === "august"){
            return "08";
        }
        if(month.toLowerCase() === "сентябрь" || month.toLowerCase() === "september"){
            return "09";
        }
        if(month.toLowerCase() === "октябрь" || month.toLowerCase() === "october"){
            return "10";
        }
        if(month.toLowerCase()=== "ноябрь" || month.toLowerCase() === "november"){
            return "11";
        }
        if( month.toLowerCase() === "декабрь" || month.toLowerCase() === "december"){
            return "12";
        }


}
export default {
    translate_timestamp: translate_timestamp,
    get_month: get_month
}