const fs = require("fs");

class ProductManager {
  constructor() {
    this.products = [];
    this.path = "archivo.txt";
    this.id = 0;
  }

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    const product = {
      id: ++this.id,
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
    };
    if (
      product.title &&
      product.description &&
      product.price &&
      product.thumbnail &&
      product.code &&
      product.stock
    ) {
      try {
        const products = await this.sendProducts();
        products.forEach((element) => {
          if (product.code === element.code) {
            throw new Error("Codigo repetido");
          }
        });
        products.push(product);
        this.products = products;
        console.log("Producto agregado con exito");
      } catch (error) {
        console.log(error);
      }

      try {
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(this.products, null, "\t"),
        );
        console.log("Producto agregado correctamente!");
      } catch (error) {
        console.error("Error al crear el producto\n", error);
      }
    } else {
      console.log("No se cumplen con todas las propiedades");
    }
  };

  async sendProducts() {
    try {
      const products = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(products);
    } catch (error) {
      console.error(error);

      return this.products;
    }
  }

  getProductById = (id) => {
    let coincidencias = fs.readFileSync(this.path, "utf-8");
    if (coincidencias.length === 0) {
      console.log("Not Found");
    }
    return coincidencias;
  };

  getProducts = async () => {
    try {
      const products = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(products);
    } catch (error) {
      return this.products;
    }
  };

  async deleteProduct(id) {
    const products = await this.sendProducts();

    const auxDelete = products.findIndex((prod) => prod.id === id);

    if (auxDelete === -1) {
      return console.error("Not found");
    }

    const product = await products[auxDelete];

    products.splice(auxDelete, 1);

    try {
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null, "\t"),
      );

      console.log("Se ha eliminado el producto ", product.id, " exitosamente!");
    } catch (e) {
      console.error("No se ha podido eliminar el producto \n", e);
    }
  }

  updateProduct = async (id, parametro, newValue) => {
    const prods = await this.sendProducts();

    let aux = prods.findIndex((prod) => prod.id === id);

    let product = prods[aux];

    product[parametro] = newValue;

    try {
      await fs.promises.writeFile(this.path, JSON.stringify(prods, null, "\t"));

      console.log("Producto Actualizado!");
    } catch (e) {
      console.error("Error al Actualizar el producto\n", e);
    }
  };
}

let p1 = new ProductManager();

p1.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25,
);
p1.addProduct(
  "producto prueba2",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc1234",
  25,
);

p1.getProducts()
  .then((res) => console.log(res))
  .catch((error) => console.log(error));
p1.getProductById(1);
p1.updateProduct(1, "stock", 1);
p1.deleteProduct(1);
