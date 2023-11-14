const express = require("express");
const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = 3000;

//MiddleWare
app.use(express.json());

//Primera ruta con respuesta, usamos request(req) y response(res).
app.get("/", (req, res) =>{
  res.send("Hola mi server en Express");
});

routerApi(app);
//Se colocan despues del router
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

//Le decimos a la aplicación que escuche en un puerto en específico.
app.listen(port, () =>{
  console.log("My port: " + port);
});
