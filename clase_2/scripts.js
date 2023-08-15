class ProductManager {
  static id = 1;

  constructor() {
    this.products = [];
  }
  addProduct = (product) => {
    if (
      product.title &&
      product.description &&
      product.price &&
      product.thumbnail &&
      product.code &&
      product.stock
    ) {
      try {
        this.products.forEach((element) => {
          if (product.code === element.code) {
            throw new Error("Codigo repetido");
          }
        });
        this.products.push({ ...product, id: ProductManager.id });
        ProductManager.id++;
        console.log("Producto agregado con exito");
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("No se cumplen con todas las propiedades");
    }
  };

  getProducts = () => {
    return this.products;
  };

  getProductById = (id) => {
    let coincidencias = this.products.filter((element) => element.id === id);
    if (coincidencias.length === 0) {
      console.log("Not Found");
    }
    return coincidencias;
  };
}

let p1 = new ProductManager();

console.log(p1.getProducts());

let product = {
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: 25,
};

p1.addProduct(product);

console.log(p1.getProducts());

p1.addProduct(product);

p1.getProductById(2);
