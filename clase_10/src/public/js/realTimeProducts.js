const socket = io();
const produ = document.getElementById("tbody");

document.getElementById("form-realTime").addEventListener("submit", (e) => {
  e.preventDefault();
  let product = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    price: document.getElementById("price").value,
    thumbnail: document.getElementById("thumbnail").value,
    code: document.getElementById("code").value,
    stock: document.getElementById("stock").value,
    category: document.getElementById("category").value,
  };
  socket.emit("new-product", product);
  document.getElementById("form-realTime").reset();
});

socket.on("products", (data) => {
  console.log(data);
  let prods = "";
  data.length === 0
    ? (prods = "<p>No hay productos</p>")
    : data.map(
        (element) =>
          (prods += `<tr><td>${element.id}</td>
                        <td>${element.title}</td>
                        <td>${element.description}</td>
                        <td>${parseFloat(element.price)}</td>
                        <td>${element.code}</td>
                        <td>${parseInt(element.stock)}</td>
                        <td>${element.status}</td>
                        <td>${element.thumbnail}</td>
                        <td>${element.category}</td><td>
<button onclick="deleteProduct(${element.id})">Eliminar</button></td>
</tr>`),
      );

  produ.innerHTML = prods;
});

const deleteProduct = (id) => {
  socket.emit("delete-product", id);
};
