var express=require('express');
var session=require('express-session');
var bodyParser= require('body-parser');

var app=express();

//moteur de template
app.set('view engine','ejs');
//middeleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/assets',express.static('public'))
// session pour stocker
app.use(session({
    secret: 'zzzzzzzzzz',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))

app.use(require('./middelwares/flash'))

//route

app.get('/',(req,res)=>{
    /*if(req.session.error)
    {
        res.locals.error=req.session.error
        req.session.error=undefined
    }*/
  //  res.send('salut')
  let Message=require('./models/message')
  Message.all((messages)=>{
      
      res.render('pages/index',{ messages : messages});
  });
  
})
app.post('/',(req,res)=>{
    if(req.body.message=== undefined || req.body.message==='')
    {   
        req.flash('error',"vous n'avez pas poster message")
       // res.render('pages/index',{error:"vous n'avez pas entrer de message"});
       res.redirect('/')
    }
    else{
        let Message=require('./models/message')
        Message.create(req.body.message,function(){
        req.flash('success',"merci !")
        res.redirect('/')
        })
    }
    
   
})
app.get('/message/:id',(req,res)=>{
  let Message=require('./models/message')
  Message.find(req.params.id,(message)=>{
      res.render('messages/show',{message:message})

  })
    req.params.id
})
app.listen(8000)


/*
  si on ajout NODE_ENV=production en esy changer le mode qui est mode devloppeur to mode  production 
  
*/ 