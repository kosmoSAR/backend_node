const express = require("express");
const {faker} = require('@faker-js/faker');

const router = express.Router();

router.get('/', (req,res) => {
  const products = [];
  const {size} = req.query;
  //Si se tiene no se envía un tamaño por defecto es 10.
  const limit = size || 10;
  for (let i = 0; i < limit; i++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.url()
    });
  }
  res.json(products);
})

router.get("/filter", (req, res) => {
  res.send('Filtro')
})

router.get("/:id", (req, res) =>{
	//Obtenemos el id desde los parámetros
	const {id} = req.params;
  res.json({
    id,
    name: 'Product 1',
    price: 1000
  });
});

router.get("/:categoryId/products/:productId", (req, res) =>{
	//Obtenemos varios parámetros
	const {categoryId, productId} = req.params;
  res.json({
    categoryId,
    productId,
    name: 'Product 1',
    price: 1000
  });
});

module.exports = router;
