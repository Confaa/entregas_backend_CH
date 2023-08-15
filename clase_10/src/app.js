import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import viewsRouter from "./routes/views.router.js";
import productRouter from "./routes/products.router.js";
import { Server } from "socket.io";
import ProductManager from "./managers/ProductManager.js";

const app = express();

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");
app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", viewsRouter);
app.use("/api/products", productRouter);

const p1 = new ProductManager();
export let products = await p1.sendProducts();

const PORT = 8080;
const httpServer = app.listen(PORT, () => {
  console.log(
    `Servidor HTTP escuchando en el puerto ${httpServer.address().port}`,
  );
});

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  console.log("Nuevo cliente conectado!");
  socket.emit("products", products);
  socket.on("new-product", async (data) => {
    let { title, description, price, thumbnail, code, stock, category } = data;
    await p1.addProduct(
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      category,
    );
    products = await p1.sendProducts();
    socketServer.emit("products", products);
  });
  socket.on("delete-product", async (id) => {
    await p1.deleteProduct(id);
    products = await p1.sendProducts();
    socketServer.emit("products", products);
  });
});
