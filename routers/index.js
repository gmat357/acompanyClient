var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var db = require('../lib/mysql').db();


var layout = require('../lib/layout').layout();

router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());

router.get('/',(req,res)=>{
    db.query('select * from link',(err,rows)=>{
        db.query('select * from slide',(err2, rows2)=>{

            if(err) throw err;
            var render = {
                header:layout.header.header(),
                nav:layout.nav.nav(),
                slide1:rows2[0].url,
                slide2:rows2[1].url,
                slide3:rows2[2].url,
                footer:layout.footer.footer(rows)
            }
            res.render('index',render);
        })
    });
});

router.get('/privacy',(req,res)=>{
    res.sendFile(path.join(__dirname,"../popup/privacy.html")); 
});

router.post('/remote_consulting',(req,res)=>{
    var body = req.body;
    var name = body.name;
    var phone = body.phone;
    var text = body.text;
    var privacy = body.privacy;
    var category = body.category;
    var date = require('../lib/date').date();
    sql = {
        name:name,
        phone:phone,
        title:"빠른 상담 요청!! (REMOTE)",
        text:"빠른 상담 부탁드립니다.",
        privacy:privacy,
        category:category,
        insert_date:date,
        use:"미완료"
    }
    if(privacy == undefined){
        res.send(`
            <script>
                alert("개인정보 활용 동의를 해주세요.");
                history.back();
            </script>
        `);
    }else{
        db.query(`alter table consulting  auto_increment = 1`);
        db.query('insert into consulting set ?',sql,(err,rows)=>{
            if(err) throw err;
            res.send(`
                <script>
                    alert("상담 접수 완료되었습니다.");
                    location.href="/";
                </script>
            `)
        });
    }
});

router.post('/main_consulting',(req,res)=>{
    var body = req.body;
    var name = body.name;
    var phone = body.phone;
    var text = body.text;
    var privacy = body.privacy;
    var category = "빠른상담";
    var date = require('../lib/date').date();
    sql = {
        name:name,
        phone:phone,
        title:"빠른 상담 요청드립니다!! (MAIN)",
        text:text,
        privacy:privacy,
        category:category,
        insert_date:date,
        use:"미완료"
    }
    if(privacy == undefined){
        res.send(`
            <script>
                alert("개인정보 활용 동의를 해주세요.");
                history.back();
            </script>
        `);
    }else{
        db.query(`alter table consulting  auto_increment = 1`);
        db.query('insert into consulting set ?',sql,(err,rows)=>{
            if(err) throw err;
            res.send(`
                <script>
                    alert("상담 접수 완료되었습니다.");
                    location.href="/";
                </script>
            `)
        });
    }
});

module.exports = router;