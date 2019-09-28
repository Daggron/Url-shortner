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
                return res.status(201).send(url.shortUrl);
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

                return res.send(shortUrl);
            }
        }catch{
            return res.status(501).send("Interna server Error");
        }

    }
    else{
        return res.status(401).send("Please enter a valid url")
    }



})

module.exports = router;