var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var multer = require('multer');
var path = require('path');

var layout = require('../lib/layout').layout();
var db = require('../lib/mysql').db();
var fs = require('fs');

var board_name = "event";
var db_list_name = "event_list";
var db_comment_name = "event_comment"
var master_psw = "somang14881!";

router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());

var storage = multer.diskStorage({
    destination : function(req, file, cb){
        cb(null, path.join(__dirname,'../public/upload/img'));
    },
    filename : function(req, file, cb){
        const ext = path.extname(file.originalname);
        cb(null, path.basename("a-company",ext) + new Date().valueOf() + ext);
    }
});

var upload = multer({storage:storage});

router.get(`/${board_name}`,(req,res)=>{
    db.query('select * from link',(err,rows)=>{
        if(err) throw err;
    var render = {
        header:layout.header.header(),
        nav:layout.nav.nav(),
        footer:layout.footer.footer(rows)
    }
    res.render(`${board_name}`,render);
    });
});


router.post(`/${board_name}/getList`,(req,res)=>{
    db.query(`select * from ${db_list_name} order by no desc`,(err,rows)=>{
        if(err) throw err;
        res.json(rows);
    })
});

router.get(`/${board_name}/write`,(req,res)=>{
    db.query('select * from link',(err,rows)=>{
        if(err) throw err;
        var render = {
            header:layout.header.header(),
            nav:layout.nav.nav(),
            footer:layout.footer.footer(rows)
        }
        res.render(`${board_name}_write`,render);
    });
});

router.post(`/${board_name}/imgUpload`,upload.single('upload'),(req,res)=>{
    var filePath = `/public/upload/img/${req.file.filename}`;
    res.send(`{"filename":"a-company","uploaded" : 1, "url":"${filePath}"}`);
});

router.post(`/${board_name}/writeAction`,(req,res)=>{
    var body = req.body;
    var title = body.title;
    var name = body.name;
    var psw = body.psw;
    var text = body.text;
    var date = require('../lib/date').date();
    var insert_date = date;
    var textArr = text.split(" ");
    var imgSrc = [];
    for(var i = 0; i < textArr.length;i++){
        if(textArr[i].match("src") != null){
            var textResult = textArr[i].split("\"");
            imgSrc.push(textResult[1]);
        }
    }
    var imgSrcResult = JSON.stringify(imgSrc);
    if(psw != master_psw){
        res.send(`
            <script>
                alert("???????????? ?????????????????????.");
                location.href="/";
            </script>
        `);
        return;
    }
    var sql = {
        title:title,
        name:name,
        text:text,
        insert_date:insert_date,
        psw:psw,
        look:0,
        img_link:imgSrcResult,
    }
    db.query(`alter table ${db_list_name} auto_increment = 1`);
    db.query(`insert into ${db_list_name} set ?`,sql,(err, rows)=>{
        if(err) throw err;
        res.redirect(`/${board_name}`);
    });
});

router.get(`/${board_name}/:page`,(req,res)=>{
    var page = req.params.page;
    db.query(`select * from ${db_list_name} where No = ?`,page,(err, rows)=>{
        if(err) throw err;
        db.query('select * from link',(err2,rows2)=>{
            if(err2) throw err2;
            var render = {
                header:layout.header.header(),
                nav:layout.nav.nav(),
                title:rows[0].title,
                name:rows[0].name,
                category:rows[0].category,
                text:rows[0].text,
                page:page,
                footer:layout.footer.footer(rows2)
            }
            db.query(`update ${db_list_name} set ? where No = ?`,[{look:Number(rows[0].look)+1},page]);
            res.render('event_view',render);
        });
    });
});

router.get(`/${board_name}/update/:page`,(req,res)=>{
    var page = req.params.page;
    db.query('select * from link',(err,rows)=>{
        if(err) throw err;
    var render = {
        header:layout.header.header(),
        nav:layout.nav.nav(),
        action:`/${board_name}/update_page/${page}`,
        footer:layout.footer.footer(rows)
    }
    res.render('reviewPassword',render);
    });
});

router.post(`/${board_name}/update_page/:page`,(req,res)=>{
    var page = req.params.page;
    var psw = req.body.psw;
    db.query(`select * from ${db_list_name} where No = ?`,page,(err, rows)=>{
        if(err) throw err;
        if(psw == rows[0].psw || psw == master_psw){
            db.query('select * from link',(err2,rows2)=>{
                if(err2) throw err2;
                var render = {
                    header:layout.header.header(),
                    nav:layout.nav.nav(),
                    title:rows[0].title,
                    name:rows[0].name,
                    text:rows[0].text,
                    psw:rows[0].psw,
                    page:page,
                    footer:layout.footer.footer(rows2)
                }
                res.render('event_update',render);
            });
        }else{
            res.send(`
                <script>
                    alert("??????????????? ????????????.");
                    history.back();
                </script>
            `);
        }
    });
});

router.post(`/${board_name}/updateAction/:page`,(req,res)=>{
    var page = req.params.page;
    var body = req.body;
    var title = body.title;
    var name = body.name;
    var text = body.text;
    var psw = body.psw;
    var textArr = text.split(" ");
    var imgSrc = [];
    for(var i = 0; i < textArr.length;i++){
        if(textArr[i].match("src") != null){
            var textResult = textArr[i].split("\"");
            imgSrc.push(textResult[1]);
        }
    }
    var imgSrcResult = JSON.stringify(imgSrc);
    var sql = {
        title:title,
        name:name,
        text:text,
        psw:psw,
        look:0,
        img_link:imgSrcResult,
    }
    db.query(`update ${db_list_name} set ? where No = ?`,[sql,page],(err, rows)=>{
        if(err) throw err;
        res.send(`
            <script>
                alert("?????????????????????.");
                location.href="/${board_name}/${page}";
            </script>
        `);
        return;
    });
});

router.get(`/${board_name}/delete/:page`,(req,res)=>{
    var page = req.params.page;
    db.query('select * from link',(err,rows)=>{
        if(err) throw err;
    var render = {
        header:layout.header.header(),
        nav:layout.nav.nav(),
        action:`/${board_name}/deleteAction/${page}`,
        footer:layout.footer.footer(rows)
    }
    res.render('reviewPassword',render);
    });
});

router.post(`/${board_name}/deleteAction/:page`,(req,res)=>{
    var page = req.params.page;
    var psw = req.body.psw;
    db.query(`select * from ${db_list_name} where No = ?`,page,(err, rows)=>{
        if(psw == rows[0].psw || psw == master_psw){

            if(err) throw err;
            var imgSrc = JSON.parse(rows[0].img_link);
            for(var i = 0; i < imgSrc.length; i++){
                fs.unlink(path.join(__dirname,`../${imgSrc[i]}`),(err)=>{
                    if(err) console.log(`${rows[0].title} : ????????? ????????? ????????????.`);
                });
            }
            
            db.query(`delete from ${db_list_name} where No = ?`,page,(err2,rows2)=>{
                if(err2) throw err2;
                db.query(`delete from ${db_comment_name} where page = ?`, page);
                res.send(`
                <script>
                alert("?????????????????????.");
                location.href="/${board_name}";
                </script>
                `)
            });
        }else{
            res.send(`
            <script>
                alert("??????????????? ????????????.");
                history.back();
            </script>
        `);
        }
    });
});

router.post(`/${board_name}/commentWriteAction/:page`,(req,res)=>{
    var body = req.body;
    var name = body.name;
    var psw = body.psw;
    var text = body.text;
    var date = require('../lib/date').date();
    var insert_date = date;
    var page = req.params.page;
    var sql = {
        name:name,
        page:page,
        psw:psw,
        text:text,
        insert_date:insert_date,
    }
    db.query(`alter table ${db_comment_name} auto_increment = 1`);
    db.query(`insert into ${db_comment_name} set ?`, sql ,(err, rows)=>{
        if(err) throw err;
        res.redirect(`/${board_name}/${page}#comment_box`);
    });
});

router.post(`/${board_name}/commentGetList/:page`,(req,res)=>{
    var page = req.params.page;
    db.query(`select * from ${db_comment_name} where page = ? order by no desc`,page,(err, rows)=>{
        if(err) throw err;
        res.json(rows);
    });
});

router.get(`/${board_name}/commentDelete/:page`,(req,res)=>{
    var page = req.params.page;
    db.query(`select * from ${db_comment_name} where No = ?`, page,(err, rows)=>{
        if(err) throw err;
        res.send(`
            <script>
                var IsCf = confirm("?????????????????????????");
                if(IsCf){
                    var prompt = prompt("??????????????? ??????????????????.","");
                    if(prompt == "${rows[0].psw}" || prompt == "${master_psw}"){
                        location.href="/${board_name}/commentDeleteAction/${rows[0].No}";
                    }else{
                        alert("??????????????? ???????????????.");
                        history.back();
                    }
                    
                }else{
                    history.back();
                }
            </script>
        `)
    });
});

router.get(`/${board_name}/commentDeleteAction/:page`,(req,res)=>{
    var page = req.params.page;
    db.query(`select * from ${db_comment_name} where No = ?`,page,(err,rows)=>{
        if(err) throw err;
        db.query(`delete from ${db_comment_name} where No = ?`,page,(err2, rows2)=>{
            if(err2) throw err2;
            res.send(`
                <script>
                    alert("?????????????????????.");
                    location.href="/${board_name}/${rows[0].page}#comment_box";
                </script>
            `);
            return;
        });
    });
});

router.post(`/${board_name}/commentGetData/:page`,(req,res)=>{
    var page = req.params.page;

    db.query(`select * from ${db_comment_name} where No = ?`,page,(err, rows)=>{
        if(err) throw err;
        res.json(rows);
    });
});

router.post(`/${board_name}/commentUpdateAction/:page`,(req,res)=>{
    var page = req.params.page;
    var body = req.body;
    var name = body.name;
    var psw = body.psw;
    var text = body.text;
    var date = require('../lib/date').date();
    var sql = {
        name:name,
        psw:psw,
        text:text,
        insert_date:date
    }
    db.query(`update ${db_comment_name} set ? where No = ?`,[sql,page],(err,rows)=>{
        if(err) throw err;
        db.query(`select * from ${db_comment_name} where No = ?`,page,(err2, rows2)=>{
            if(err2) throw err2;
            res.send(`
            <script>
            alert("?????????????????????.");
            location.href="/${board_name}/${rows2[0].page}#comment_box";
            </script>
            `);
        });
    });
});

module.exports = router;