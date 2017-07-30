var express = require('express');
var router = express.Router();
var db = require("./../db");

router.get('/', function(req, res, next) {
  res.render('admin_index', { title: 'Admin panel'});
});


router.get('/sections', (req,res,next)=>{
  db.getList((e)=>{
    res.render('admin_sections',{title:"Sections",list:e});
  })
})

router.get('/section/:id',(req,res,next)=>{
  db.getItem(req.params.id,(e)=>{
    console.log(e);
    res.render('admin_section',{title:e.name,item:e});
  })
})

router.post('/item/:id',(req,res,next)=>{
  if (req.body.submit == "Update") {
    delete req.body.submit;
    db.updateItem(req.params.id,req.body,()=>{
      backURL=req.header('Referer') || '/';
      res.redirect(backURL);
    })
  } if (req.body.submit == "Delete") {
    db.deleteItem(req.params.id,()=>{
      backURL=req.header('Referer') || '/';
      res.redirect(backURL);
    })
  }
})


router.get('/list_of/:id',(req,res,next)=>{
  db.getArray(req.params.id,e=>{
    res.render('admin_array',{title:"Список",array:e});
  })
})

router.get('/insert',(req,res,next)=>{
  db.insert_arrays();
  res.send("done");
})

module.exports = router;