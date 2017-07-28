var express = require('express');
var router = express.Router();
var db = require("./../db");

/* GET home page. */
router.get('/', function(req, res, next) {
  db.check_db((e)=>res.render('index', { data:e,table_items : db.table_items,menu:db.menu_list,services:db.service_list ,faq:db.faq_list}));
});


router.get('/check_db',(req,res,next)=>db.check_db((e)=>res.send(e)));

module.exports = router;
