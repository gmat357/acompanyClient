$(function(){
    var topBtn = $('.top_btn');

    topBtn.on("click",function(){
        $("html").animate({scrollTop:0});
    });
});