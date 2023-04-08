const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.products = [];
    this.lastId = 0;
    this.path = path;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error("All fields are required");
      return;
    }

    if (this.products.find((product) => product.code === code)) {
      console.error("Product with code already exists");
      return;
    }

    const newProduct = {
      id: ++this.lastId,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(newProduct);
    this.saveProducts();
  }

  getProducts() {
    return this.products;
   
  }
  

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);

    if (!product) {
      console.error("Not found");
      return;
    }

    return product;
  }

  saveProducts() {
    fs.writeFile(this.path, JSON.stringify(this.products), (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Products saved successfully!");
      }
    });
  }
}

const productManager = new ProductManager("./productos.json");

// Verificar que getProducts devuelve un arreglo vacío
console.log(productManager.getProducts()); // []

// Agregar un producto exitosamente
productManager.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);

// Verificar que el producto se agregó correctamente
console.log(productManager.getProducts()); // [{id: 1, title: "producto prueba", description: "Este es un producto prueba", price: 200, thumbnail: "Sin imagen", code: "abc123", stock: 25}]

// Intentar agregar un producto con un código repetido
productManager.addProduct(
  "producto prueba 2",
  "Este es otro producto de prueba",
  250,
  "Sin imagen",
  "abc123",
  30
); // "Product with code already exists"

// Verificar que getProductById devuelve el producto correcto o un error
console.log(productManager.getProductById(1)); // {id: 1, title: "producto prueba", description: "Este es un producto prueba", price: 200, thumbnail: "Sin imagen", code: "abc123", stock: 25}
console.log(productManager.getProductById(2)); // "Not found"
