$(function(){
    $(window).load(function(){

        var comment_update = $(".comment_update_btn");
        var comment_delete = $(".comment_delete_btn");
        
        console.log(comment_delete.length);
        comment_delete.each(function(){
            $(this).on("click", function(){
                var IsCf = confirm("삭제하시겠습니까?");
                var page = $(this).attr("value");
                if(IsCf){
                    var Pt = prompt("비밀번호를 입력하세요.");
                    location.href="/inquiry/commentDelete?psw="+Pt+"&page="+page;
                }
            });
        });
   }); 
});