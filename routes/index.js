const productsRouter = require('./productsRouter')
const usersRouter = require('./usersRouter')

function routerApi(app){
  app.use('/api/v1/products', productsRouter);
  app.use('/api/v1/users', usersRouter);
}

module.exports = routerApi;
