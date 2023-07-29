import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();

const p1 = new ProductManager();

app.use(express.urlencoded({extended: true}))

app.get('/products', async (req, res) => {
    let products = await p1.getProducts()

    if (req.query.limit) {
        products=products.slice(0,parseInt(req.query.limit))
    }
    res.send(products);

})

app.get('/products/:pid',async (req,res)=>{
    let product = await p1.getProductById(parseInt(req.params.pid))
    res.send(product)
})

app.listen(8080, () => {
    console.log("Hola mundo")
})