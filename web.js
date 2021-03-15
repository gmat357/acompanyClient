var express = require('express');
var app = express();
var port = process.env.PORT || 5000;
var path = require('path');

var indexRouter = require('./routers/index');
var inquiryRouter = require('./routers/inquiry');
var reviewRouter = require('./routers/review');
var eventRouter = require('./routers/event');
var ktRouter = require('./routers/kt');
var lgRouter = require('./routers/lg');
var skRouter = require('./routers/sk');


app.set('views',path.join(__dirname,"views"));
app.set('view engine','ejs');

app.use('/public',express.static(path.join(__dirname,"public")));
app.use('/node_modules',express.static(path.join(__dirname,"node_modules")));
app.use('/inquiry/public',express.static(path.join(__dirname,"public")));
app.use('/review/public',express.static(path.join(__dirname,"public")));
app.use('/event/public',express.static(path.join(__dirname,"public")));
// app.use('/event/node_modules',express.static(path.join(__dirname,"public")));
app.use('/event/update_page/public',express.static(path.join(__dirname,"public")));
app.use('/upload/img',express.static(path.join(__dirname,"public/upload/img")));

app.use('/',indexRouter);
app.get('/privacy', indexRouter);
app.post('/remote_consulting', indexRouter);
app.post('/main_consulting', indexRouter);
app.get('/kt', ktRouter);
app.get('/lg', lgRouter);
app.get('/sk', skRouter);

app.get('/inquiry',inquiryRouter);
app.get('/inquiry/write',inquiryRouter);
app.post('/inquiry/writeAction',inquiryRouter);
app.get('/inquiry/:page',inquiryRouter);
app.post('/inquiry/getList',inquiryRouter);
app.get('/inquiry/update/:page',inquiryRouter);
app.get('/inquiry/update_page/:page',inquiryRouter);
app.post('/inquiry/updateAction/:page',inquiryRouter);
app.get('/inquiry/delete/:page',inquiryRouter);
app.get('/inquiry/deleteAction/:page',inquiryRouter);
app.post('/inquiry/commentWriteAction/:page',inquiryRouter);
app.post('/inquiry/commentGetList/:page',inquiryRouter);
app.post('/inquiry/commentUpdateAction/:page',inquiryRouter);
app.get('/inquiry/commentDelete/:page',inquiryRouter);
app.get('/inquiry/commentDeleteAction/:page',inquiryRouter);
app.post('/inquiry/commentGetData/:page',inquiryRouter);

app.get('/review',reviewRouter);
app.get('/review/write',reviewRouter);
app.post('/review/writeAction',reviewRouter);
app.get('/review/:page',reviewRouter);
app.post('/review/getList',reviewRouter);
app.get('/review/update/:page',reviewRouter);
app.get('/review/update_page/:page',reviewRouter);
app.post('/review/updateAction/:page',reviewRouter);
app.get('/review/delete/:page',reviewRouter);
app.get('/review/deleteAction/:page',reviewRouter);
app.post('/review/commentWriteAction/:page',reviewRouter);
app.post('/review/commentGetList/:page',reviewRouter);
app.post('/review/commentUpdateAction/:page',reviewRouter);
app.get('/review/commentDelete/:page',reviewRouter);
app.get('/review/commentDeleteAction/:page',reviewRouter);
app.post('/review/commentGetData/:page',reviewRouter);

app.get('/review',reviewRouter);
app.get('/review/write',reviewRouter);
app.post('/review/writeAction',reviewRouter);
app.get('/review/:page',reviewRouter);
app.post('/review/getList',reviewRouter);
app.get('/review/update/:page',reviewRouter);
app.get('/review/update_page/:page',reviewRouter);
app.post('/review/updateAction/:page',reviewRouter);
app.get('/review/delete/:page',reviewRouter);
app.get('/review/deleteAction/:page',reviewRouter);
app.post('/review/commentWriteAction/:page',reviewRouter);
app.post('/review/commentGetList/:page',reviewRouter);
app.post('/review/commentUpdateAction/:page',reviewRouter);
app.get('/review/commentDelete/:page',reviewRouter);
app.get('/review/commentDeleteAction/:page',reviewRouter);
app.post('/review/commentGetData/:page',reviewRouter);

app.get('/event',eventRouter);
app.get('/event/write',eventRouter);
app.post('/event/imgUpload',eventRouter);
app.post('/event/writeAction',eventRouter);
app.get('/event/:page',eventRouter);
app.post('/event/getList',eventRouter);
app.get('/event/update/:page',eventRouter);
app.get('/event/update_page/:page',eventRouter);
app.post('/event/updateAction/:page',eventRouter);
app.get('/event/delete/:page',eventRouter);
app.get('/event/deleteAction/:page',eventRouter);
app.post('/event/commentWriteAction/:page',eventRouter);
app.post('/event/commentGetList/:page',eventRouter);
app.post('/event/commentUpdateAction/:page',eventRouter);
app.get('/event/commentDelete/:page',eventRouter);
app.get('/event/commentDeleteAction/:page',eventRouter);
app.post('/event/commentGetData/:page',eventRouter);

app.listen(port,()=>{console.log(`${port}번 포트 서버가 열렸습니다.`)});

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
  });
  
  setTimeout(function () {
    console.log('This will still run.');
  }, 500);
  
  // Intentionally cause an exception, but don't catch it.
  nonexistentFunc();
  console.log('This will not run.');
