const express = require("express");
const routerApi = require('./routes');
const cors = require('cors');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

//MiddleWare
app.use(express.json());

//Cors
const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('No permitido'))
    }
  }
}
app.use(cors(options));

//Primera ruta con respuesta, usamos request(req) y response(res).
app.get("/api", (req, res) =>{
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
