var express = require('express');
var router = express.Router();
var db = require("./../db");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',table_items : db.table_items,menu:db.menu_list,services:db.service_list ,faq:db.faq_list});
});


module.exports = router;
