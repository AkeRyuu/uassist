var express = require('express');
var router = express.Router();
var db = require("./../db");

/* GET home page. */
router.get('/', function(req, res, next) {
  db.getList((e)=>{
    db.getArrays((data)=>{
      console.log(data);
      res.render('index', { data:e,table_items : db.table_items,menu:db.menu_list,arrays:data});
    });
  });
});


router.get('/check_db',(req,res,next)=>db.getList((e)=>res.send(e)));

module.exports = router;
