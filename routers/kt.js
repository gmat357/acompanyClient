var express = require('express');
var router = express.Router();
var db = require('../lib/mysql').db();
var layout = require('../lib/layout');
var layoutResult = layout.layout();

router.get('/kt',(req,res)=>{
    db.query('select * from link',(err,rows)=>{
        if(err) throw err;
        db.query('select * from price where name = ?',"kt",(err2,rows2)=>{
            if(err2) throw err2;
            var render = {
                header:layoutResult.header.header(),
                nav:layoutResult.nav.nav(),
                kt:rows2[0].value,
                footer:layoutResult.footer.footer(rows)
            }
            
            res.render("kt",render);
        });
    });
});

module.exports = router;