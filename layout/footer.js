exports.footer = (rows)=>{
    var naver = "";
    var kakao = "";

    for(var i = 0; i < rows.length; i++){
        if(rows[i].name == "naver"){
            naver = rows[i].url;
        }
        if(rows[i].name == "kakao"){
            kakao = rows[i].url;
        }
    }
    var template = `
    <footer class="footer_container">
        <div class="footer_box">
            <ul>
                <li>
                    <h3>고객센터</h3>
                    <h2><b>1833-2947</b>(전국)</h2>
                    <h6>이메일 : a-company01@daum.net</h6>
                    <h5>전화상담 운영시간</h5>
                    <p>09:00 ~ 24:00 (평일,주말)</p>
                </li>
                <li>
                    <img src="../public/img/footer/logo.png" alt="로고">
                    <p>
                        어컴퍼니 대표 : 김민흠 사업자등록번호 : 621-8701-637<br>
                        주소 : 부산광역시 기장군 정관읍 정관로 578, 105호<br>
                        고객센터 : 1833-2947 통신판매등록번호 : 제 2020-부산기장-0575호<br>
                        이메일 : a-company01@daum.net 개인정보관리책임자 : 김민흠
                    </p>
                </li>
            </ul>
        </div>
        <div class="copyright_box">
            <p>Copyright © 2021 어컴퍼니. All Rights Reserved.</p>
        </div>
        <div class="remote_box">
            <img src="../public/img/footer/remote_top.png" alt="리모컨상단"/>
            <form action="/remote_consulting" method="post">
                <div class="form_box">
                <select name="category">
                    <option value="SK">SK</option>
                    <option value="KT">KT</option>
                    <option value="LG">LG</option>
                </select>
                <input type="text" name="name" placeholder="성함" required/>
                <input type="text" name="phone" placeholder="연락처" required/>
                <input type="checkbox" name="privacy" value="개인정보 동의함"/> <b>개인정보 활용 동의<a href="/privacy" target="blank" class="privacy_btn">[보기]</a></b>
                </div>
                <div class="submit_box">
                <input type="submit" value="상담신청하기"/>
                <em>!</em>
                </div>
            </form>
            <a href="${kakao}" target="blank"><img src="../public/img/footer/kakao.png" alt="카카오톡상담"/></a>
            <a href="${naver}" target="blank"><img src="../public/img/footer/naver.png" alt="네이버톡톡상담"/></a>
            <div class="top_btn">TOP</div>
            <script src="../public/js/footer/index.js"></script>
        </div>
    </footer>
    `

    return template;
}