// From LocalStorage to the Basket view

let displayCart = () => {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  let productContainer = document.querySelector(".products-container");

  if (cartItems && productContainer) {
    //array creation to store total per article
    let shop = [];

    for (let i = 0; i < Object.values(cartItems).length; i++) {
      let product_row = AddElement("tr", productContainer);
      product_row.className = "products";
      console.log(product_row);

      let product_cell_1 = AddElement("td", product_row);
      product_cell_1.innerHTML = Object.values(cartItems)[i].name;

      let product_cell_2 = AddElement("td", product_row);
      product_cell_2.innerHTML = Object.values(cartItems)[i].price;

      let product_cell_3 = AddElement("td", product_row);
      product_cell_3.innerHTML = Object.values(cartItems)[i].inCart;

      let product_cell_4 = AddElement("td", product_row);
      product_cell_4.innerHTML =
        product_cell_2.innerHTML * product_cell_3.innerHTML + "€";

      shop.push(product_cell_2.innerHTML * product_cell_3.innerHTML);
    }

    //Total basket calculation without LocalStorage
    var total_shop = 0;
    for (let element of shop) {
      total_shop += element;
    }

    let total_row = document.querySelector("#total");
    total_row.textContent = total_shop + "€";
  }
};

displayCart();
