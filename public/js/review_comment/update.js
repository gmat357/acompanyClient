$(function(){
    var urlName = "/review";
    $(window).load(function(){
        function formBlock(){
            var update_form = $(".comment_update_form");
            var insert_form = $(".comment_form_container");

            insert_form.eq(0).css("display","none");
            update_form.css("display","block");

        }

        function cancelClick(){
            var update_form = $(".comment_update_form");
            var insert_form = $(".comment_form_container");
            alert("취소되었습니다.");
            update_form.css("display","none");
            insert_form.eq(0).css("display","block");
        }


        function getData(value, IsPt){
            var data = $.ajax({
                url:urlName+"/commentGetData/"+value,
                type:"post",
                dataType:"json",
                success:function(data){
                    if(IsPt == data[0].psw || IsPt == "eotjdzjavjsl"){
                        var commentValue = $(".comment_container").attr("value");
                        location.href=urlName+"/"+commentValue+"#comment_update"
                        var nameInput = $(".name_input");
                        var pswInput = $(".psw_input");
                        var textInput = $(".text_input");
                        var update_form = $(".comment_update_form > form");
                        nameInput.attr("value",data[0].name);
                        pswInput.attr("value",data[0].psw);
                        textInput.val(data[0].text);
                        update_form.attr("action",urlName+"/commentUpdateAction/"+data[0].No);

                        formBlock();

                    }else{
                        alert("비밀번호가 틀렸습니다.");
                        return;
                    }
                }
            });
            return data;
        }

        
    var update_form = $(".comment_update_form");
    var update_btn = $(".comment_update_btn");
    update_form.css("display","none");

    update_btn.each(function(){
        $(this).on("click", function(){

            var IsCf = confirm("수정하시겠습니까?");
            if(IsCf){
                var IsPt = prompt("비밀번호를 입력해주세요.", "");
                    if(IsPt != null){
                        var value = $(this).attr("value");
                        getData(value, IsPt);
                    }else{
                        return;
                    }
            }else{
                return;
            }
        });
    });

    var cancelBtn = $(".comment_cancel_btn");
                
    cancelBtn.on("click",function(){
        cancelClick();
    });
    
});
});
