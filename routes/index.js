const router = require('express').Router();
const Url = require('../models/url');

router.get('/404',(req,res)=>{
    res.send('404');
})

router.get('/:code',async (req,res)=>{

    try {

       let url = await  Url.findOne({code:req.params.code});

       if(!url){
           return res.status(404).redirect('404');
       }else{
           res.redirect(url.longUrl);
       }

    } catch (err) {
        return res.status(501).send("Internal server erro");
    }


});


module.exports = router;