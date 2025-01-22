const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
async function getConnection(){
    const connection = await mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : 'adminuser',
        database : 'board'
    });
    return connection;
}

router.post('/login', async (req, res, next)=>{
    const {userid, pwd}=req.body;
    try{
        const connection = await getConnection();
        const sql = 'select * from member where userid=?';
        const [rows, fields] = await connection.query(sql, [userid]);
        if( rows.length>=1){
            if( rows[0].pwd == pwd){
                const uniqInt = Date.now();
                req.session[uniqInt] = rows[0].userid;
                console.log( req.session[uniqInt])
                res.cookie('session', uniqInt, {httpOnly : true,path : '/'});
                res.send('ok');
            }else{
                res.send('패스워드가 다릅니다.');    
            }
        }else{
            res.send('아이디가 없습니다.');
        }
    }catch(err){ next(err); }
});

router.post('/idcheck', async (req, res)=>{
    const userid = req.body.userid;
    try{    
        const connection = await getConnection();
        const sql ='select * from member where userid=?';
        const [rows, fields] = await connection.query(sql, [userid]);
        if( rows.length >= 1){
            res.send('not_ok');
        }else{
            res.send('ok');
        }
    }catch(err){next(err);}
});

router.post('/join', async (req, res)=>{
    const {userid, pwd, name, email, phone} = req.body;
    try{
        const connection = await getConnection();
        const sql = "insert into member(userid, pwd, name, email, phone) values(?,?,?,?,?)";
        const [result, fields] = await connection.query(sql, [userid, pwd, name, email, phone]);
        res.send('ok');
    }catch(err){
        console.error(err);
        res.send('not_ok');
    }
})

module.exports = router;