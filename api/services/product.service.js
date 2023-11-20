const {faker} = require('@faker-js/faker');
const boom = require('@hapi/boom');

class ProductService {

  constructor(){
    this.products = [];
    this.generate();
  }

  async generate(){
    const limit = 10;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
        isBock: faker.datatype.boolean()
      });
    }
  }

  async create(data){
    const newProduct = {
      id:faker.datatype.uuid(),
      ...data
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async find(){
    return new Promise((resolve, reject) => {
      resolve(this.products);
      reject()
    })
    // return this.products;
  }

  async findOne(id){
    const product = this.products.find(item => item.id === id);
    if (!product){
      throw boom.notFound('Product not found')
    }
    return product;
  }

  async update(id, changes) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1){
      throw boom.notFound("Product not found");
    }
    const product = this.products[index];
    if (product.isBlock){
      throw boom.conflict("Product is Block");
    }
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index];
  };

  async delete(id){
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('Product not foud')
    }
    this.products.splice(index, 1);
    return {id};
  }
}


module.exports = ProductService;


