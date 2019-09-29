const router = require('express').Router();
const Url = require('../models/url');

router.get('/404',(req,res)=>{
    res.redirect("404.ejs");
});

router.get('/',(req,res)=>{

    res.render('index.ejs',{
        url : req.session.url,
        error:req.session.error
    });
    req.session.url = null;
    req.session.error = null;
});

router.get('/:code',async (req,res)=>{

    try {

       let url = await  Url.findOne({code:req.params.code});

       if(!url){
            req.session.url = null;
           return res.status(404).redirect('404');
       }else{
           res.redirect(url.longUrl);
       }

    } catch (err) {
        return res.status(501).send("Internal server error");
    }


});


module.exports = router;