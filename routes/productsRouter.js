const express = require("express");
const ProductService = require('./../services/product.service')

const router = express.Router();
const service = new ProductService();

router.get('/', async (req,res) => {
  const products = await service.find();
  res.json(products);
})

router.get("/:id", async (req, res) =>{
	//Obtenemos el id desde los parámetros
	const {id} = req.params;
  const product = await service.findOne(id);
  res.json(product);
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

router.post('/', async (req, res) => {
  const body =  req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct)
})

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const rta = await service.update(id,req.body)
    res.json(rta)
  } catch (error) {
    res.status(404).json({
      message: error.message
    });
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const rta = await service.delete(id);
  res.json(rta);
})

module.exports = router;
