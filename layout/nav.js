exports.nav = ()=>{
    var template = `
    <nav class="nav_container">

        <div class="nav_box">
            <div class="logo_box">
                <a href="/"><img src="../public/img/nav/logo.png" alt="로고"></a>
            </div>
           <ul class="menu_box">
            <li><a href="/sk">SK인터넷</a></li>
            <li><a href="/lg">LG인터넷</a></li>
            <li><a href="/kt">KT인터넷</a></li>
            <li><a href="/inquiry">고객문의</a></li>
            <li><a href="/review">고객후기</a></li>
            <li><a href="/event">정보소식</a></li>
            </ul>

    </nav>
    `

    return template;
}