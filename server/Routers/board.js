const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const multer = require('multer'); 
const path = require('path');
const fs = require('fs');

async function getConnection(){
    const connection = await mysql.createConnection({
        host : 'localhost',  user : 'root',  password : 'adminuser',  database : 'board'
    });
    return connection;
}


module.exports = router;