let form = document.getElementById("form");

form.addEventListener("submit", async (e) => {
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
  console.log(product);

  try {
    await fetch("http://localhost:8080/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    console.log("Producto agregado");
    form.reset();
  } catch (error) {
    console.log(error);
  }
});
