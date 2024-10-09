var express = require('express');//Para as rotas
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Importando o Sequelize e o modelo User
var sequelize = require('./models').sequelize;
// var User = require('./models/user')(sequelize);

var indexRouter = require('./routes/index');//Para a rota principal do app
var usersRouter = require('./routes/users');//Para a rota users ./routes/users.js
var productsRouter = require('./routes/products');
var cartsRouter = require('./routes/carts');
var transactionsRouter = require('./routes/transactions');
var app = express();//Ativa a API com o Express

app.use(logger('dev'));
app.use(express.json()); //Permite o uso de JSon
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter); 
app.use('/transactions', transactionsRouter);
app.use('/carts', cartsRouter); 

// Sincronizando o Sequelize (em dev)
//Instanciar o banco de dados

const db = require('./models');

async function applyDataStructure(){
    await db.sequelize.sync({alter: true});
}

applyDataStructure();

var port = 8080;
app.listen(port,()=>{
    console.log(`Servidor rodando na porta ${port}`);
});
module.exports = app;
