exports.date = ()=>{
    let nowDate = new Date();
    let year = nowDate.getFullYear() + "-";
    let month = (nowDate.getMonth()+1) + "-";
    if(String(month).length == 2){
        month = "0" + month;
    }
    let date = nowDate.getDate();
    if(String(date).length == 1){
        date = "0" + date;
    }
    let hour = " " + nowDate.getHours() + ":";
    let min = nowDate.getMinutes() + ":";
    if(String(min).length == 2){
        min = "0" + min;
    }
    let sec = nowDate.getSeconds();
    if(String(sec).length == 1){
        sec = "0" + sec;
    }
    let day = year + month + date + hour + min + sec;
    return day;
}