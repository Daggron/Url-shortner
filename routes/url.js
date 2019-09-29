const router = require('express').Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const Url = require('../models/url');



router.post('/short',async (req,res)=>{

    const longUrl = req.body.longUrl;

    if(validUrl.isUri(longUrl)){
        try{

            let url =  await Url.findOne({longUrl});

            if(url){
                req.session.url = url.shortUrl;
                // return res.status(201).send(url.shortUrl);
                req.session.error = null;
                return res.redirect('/');
            }
            else{
                const tiny = 'http://localhost:3000/';
                const code = shortid.generate();
                const shortUrl = tiny+code;

                let url = new Url({
                    longUrl,
                    shortUrl,
                    code,
                });
                console.log('Url stored');
                

                await Url.create(url);

                req.session.error = null;
                req.session.url = url.shortUrl;
                
                return res.redirect('/');

                // return res.send(shortUrl);
            }
        }catch{
            req.session.error = "Internal server error";
            req.session.url = null;
            return res.status(501).redirect("/");
        }

    }
    else{
        req.session.error = "Please Enter a valid url";
        req.session.url = null;
        return res.status(401).redirect('/');
    }



})

module.exports = router;