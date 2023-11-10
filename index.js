const express = require("express");
const routerApi = require('./routes')

const app = express();
const port = 3000;

//Primera ruta con respuesta, usamos request(req) y response(res).
app.get("/", (req, res) =>{
  res.send("Hola mi server en Express");
});

routerApi(app);

//Le decimos a la aplicación que escuche en un puerto en específico.
app.listen(port, () =>{
  console.log("My port: " + port);
});
