$(function(){
    var joinContent = $(".join_content > img");
    var width = $(window).width();
    if(width <= 766){
        joinContent.attr("src","../public/img/main/join_step_m.png");
    }else{
        joinContent.attr("src","../public/img/main/join_step.png");
    }

    $(window).resize(function(){
        var joinContent = $(".join_content > img");
        var width = $(window).width();
        if(width <= 766){
            joinContent.attr("src","../public/img/main/join_step_m.png");
        }else{
            joinContent.attr("src","../public/img/main/join_step.png");
        }
    })
});