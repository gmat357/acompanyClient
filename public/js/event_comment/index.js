var dataGetUrl = "/event/commentGetList"; // 데이터를 가져올 링크
var urlType = "post"; // 데이터 방식 GET/POST
var dataType = "json"; // 데이터 형식
var maxTableColspan = 4; // 테이블 열의 갯수
var maxListLength = 15; // 보여주는 리스트 갯수
var pagingBtnLength = 5; // 페이징 버튼 갯수
var btnClickColor = "#666666"; // 페이징 버튼 클릭시 색상
var btnColor = "white";
var pagingBox = $(".paging_box"); // 페이징 박스 엘리먼트
var prev = $(".prev"); // 이전 버튼 엘리먼트
var next = $(".next"); // 다음 버튼 엘리먼트
var listContainer = $(".comment_list_container"); // 데이터를 넣을 컨테이너 엘리먼트

listContainer.children("tbody").addClass("comment_list_space");

function failedGetData(){
    return "<tr style='height:50px;'><td colspan="+maxTableColspan+">댓글 없음</td></tr>";
}

function successGetData(data){
    var dataList = "";
    for(var i = 0; i < maxListLength && i < data.length; i++){
        dataList += `
        <tr>
            <td><img src="../public/img/inquiry/user_blue.png" alt="사용자아이콘"></td>
            <td>
                <h6>${data[i].name}</h6>
                <p>${data[i].insert_date}</p>
            </td>
            <td>
                <textarea class="comment_text" id="" readonly>${data[i].text}</textarea>
                
            </td>
            <td>
                <span value="${data[i].No}" class="comment_update_btn"><img src="../public/img/inquiry/comment_update.png" alt="댓글 수정"></span>
                <a href="/event/commentDelete/${data[i].No}" class="comment_delete_btn"><img src="../public/img/inquiry/comment_delete.png" alt="댓글 삭제"></a>
            </td>
        </tr>
        `
    }
    return dataList;
}

function pagingCreate(data,page){
    var pagingList = "";
    var maxList = 0;
    var paging_box = $(".paging_box");
    if(data <= 0){
        paging_box.css("display","none");
    }else{
        paging_box.css("display","block");
    }
    if(page <= 1)
        page = 0;
    for(var i = page; i < (data.length / maxListLength); i++){
        maxList++;
        if(maxList <= pagingBtnLength){
            pagingList += `<span class="paging_btn" value="${i+1}">${i+1}</span>`
        }
    }
    prev.after(pagingList);
}

function resetData(data,page){
    var listSpace = $(".comment_list_space");
    listSpace.empty();
    var dataList = "";
    for(var i = (page - 1) * maxListLength; i < maxListLength * page; i++){
        if(data[i] == undefined){
            continue;
        }else{
            dataList += `
            <tr>
                <td><img src="../public/img/inquiry/user_blue.png" alt="사용자아이콘"></td>
                <td>
                    <h6>${data[i].name}</h6>
                    <p>${data[i].insert_date}</p>
                </td>
                <td>
                    <textarea class="comment_text" id="" readonly>${data[i].text}</textarea>
                    
                </td>
                <td>
                    <span value="${data[i].No}" class="comment_update_btn"><img src="../public/img/inquiry/comment_update.png" alt="댓글 수정"></span>
                    <a href="/event/commentDelete/${data[i].No}" class="comment_delete_btn"><img src="../public/img/inquiry/comment_delete.png" alt="댓글 삭제"></a>
                </td>
            </tr>
            `
        }
    }
    listSpace.append(dataList);
}

function prevClick(data){
    var pagingBtn = $(".paging_btn");
    var pagingBtnValue = Number(pagingBtn.first().attr('value'));
    var pagingCreatePageResult = ((pagingBtnValue - pagingBtnLength) - 1);
    var resetDataPageResult = (pagingBtnValue - pagingBtnLength);
    if(pagingBtnValue <= 1 || pagingBtnValue - pagingBtnLength < 1){
        return;
    }else{
        pagingBtn.remove();
        pagingCreate(data, pagingCreatePageResult);
        resetData(data, resetDataPageResult);
        $(`.paging_btn[value=${resetDataPageResult}]`).css("backgroundColor",btnClickColor).css("color",btnColor);
    }
}

function nextClick(data){
    var pagingBtn = $(".paging_btn");
    var pagingBtnValue = Number(pagingBtn.last().attr('value'));

    if(pagingBtnValue >= data.length / maxListLength){
        return;
    }else{
        pagingBtn.remove();
        pagingCreate(data, pagingBtnValue);
        resetData(data, pagingBtnValue + 1);
        $(`.paging_btn[value=${pagingBtnValue+1}]`).css("backgroundColor",btnClickColor).css("color",btnColor);
    }
}

function pagingClick(data){
    var pagingBtn = $(".paging_btn");
    pagingBtn.each(function(){
        $(this).on("click",function(){
            pagingBtn.removeAttr("style");
            var page = $(this).attr("value");
            $(this).css({"backgroundColor":btnClickColor,"color":btnColor,"transitionDuration":"0.3s"});
            resetData(data,page);
        });
    });
}


$(function(){
    var list_space = $(".comment_list_space");
    var getPage = $(".comment_container").attr("value");
    $.ajax({
        url:dataGetUrl+`/${getPage}`,
        type:urlType,
        dataType:dataType,
        success:function(data){
            var list_clone = "";
            if(data.length <= 0)
            list_clone = failedGetData();
            else
            list_clone = successGetData(data);
            
            list_space.append(list_clone);
            pagingCreate(data,0);
            $(".paging_btn").eq(0).css("background-color",btnClickColor).css("color",btnColor);
            prev.on("click",function(){
                prevClick(data)
            });
            next.on("click",function(){
                nextClick(data)
            });
            pagingBox.on("mouseover", function(){
                pagingClick(data);
            });
        },error:function(){
            console.log("Failed to fetch Data");
        }
    });
});

