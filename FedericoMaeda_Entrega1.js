const fs = require("fs").promises;

class ProductManager {
  constructor() {
    this.products = [];
  }

  async getProducts() {
    try {
      const data = await fs.readFile("data.json", "utf-8");
      this.products = JSON.parse(data);
    } catch (error) {
      console.error(error);
    }
    return this.products;
  }

  async addProduct(product) {
    await this.getProducts();
    const id = this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1;
    const newProduct = { ...product, id };
    this.products.push(newProduct);
    try {
      await fs.writeFile("data.json", JSON.stringify(this.products, null, 2));
    } catch (error) {
      console.error(error);
    }
    return newProduct;
  }

  async getProductById(id) {
    await this.getProducts();
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }
    return product;
  }

  async updateProduct(id, updatedFields) {
    await this.getProducts();
    const productIndex = this.products.findIndex((product) => product.id === id);
    if (productIndex === -1) {
      throw new Error(`Product with id ${id} not found`);
    }
    const updatedProduct = { ...this.products[productIndex], ...updatedFields };
    this.products[productIndex] = updatedProduct;
    try {
      await fs.writeFile("data.json", JSON.stringify(this.products, null, 2));
    } catch (error) {
      console.error(error);
    }
    return updatedProduct;
  }

  async deleteProduct(id) {
    await this.getProducts();
    const productIndex = this.products.findIndex((product) => product.id === id);
    if (productIndex === -1) {
      throw new Error(`Product with id ${id} not found`);
    }
    this.products.splice(productIndex, 1);
    try {
      await fs.writeFile("data.json", JSON.stringify(this.products, null, 2));
    } catch (error) {
      console.error(error);
    }
  }
}

async function test() {
  const productManager = new ProductManager();

  // Test getProducts()
  console.log(await productManager.getProducts()); // []

  // Test addProduct()
  const newProduct = await productManager.addProduct({
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25,
  });
  console.log(newProduct); // { title: 'producto prueba', description: 'Este es un producto prueba', price: 200, thumbnail: 'Sin imagen', code: 'abc123', stock: 25, id: 1 }
  
  // Test getProducts()
  console.log(await productManager.getProducts()); // [ { title: 'producto prueba', description: 'Este es un producto prueba', price: 200, thumbnail: 'Sin imagen', code: 'abc123', stock: 25, id: 1 } ]
  
  // Test getProductById()
  console.log(await productManager.getProductById(1)); 
}