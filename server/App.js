const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({  resave:false,   saveUninitialized:false,  secret:"abcd", }));  
app.set( 'port', process.env.PORT || 5000 );

const membersRouter = require('./Routers/member');
app.use('/member', membersRouter);
const boardsRouter = require('./routers/board');
app.use('/board', boardsRouter);

app.get('/', (req, res)=>{
    res.send('<h1>Hello World</h1>');
});

app.use( '/img', express.static(path.join(__dirname, 'uploads'))); 





app.listen(app.get('port'),()=>{console.log( app.get('port'),"port Server Open"); } );