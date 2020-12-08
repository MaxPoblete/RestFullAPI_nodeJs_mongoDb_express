const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./routers');

const app = express();

//conection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/store-api',{useNewUrlParser : true});

//habilitar body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.use('/', routes());

app.listen(5000, function(){
    console.log('¡servidor web express en ejecucion!' , 'http://localhost:5000/');
});
