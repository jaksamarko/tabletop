const express = require('express'),
    compression = require('compression'),
    app = express(),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    router = express.Router();

app.use(session({secret:"Liza",saveUninitialized: true,resave: true}));
app.use(compression());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname+'/views'))

app.use('/',router);

router.get('/',(req,res)=>{
    if(req.session.name) {
        return res.redirect('/lobby.html');
    }
    res.sendFile('index.html');
});

router.post('/login',(req,res)=>{
    req.session.name = req.body.name;
    res.redirect('/lobby.html')
});

router.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/');
})

app.listen(3000)