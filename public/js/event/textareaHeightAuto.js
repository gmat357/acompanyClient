$(function(){

    $(window).load(function(){
        var text = $('#text');
        var scrollTop = text.prop('scrollHeight');
        text.css("height",scrollTop);
        

        var commentText = $(".comment_text");
        
        commentText.each(function(index){
            var scrollTop = commentText.eq(index).prop('scrollHeight');
            commentText.eq(index).css("height",scrollTop);
        });
    });

});