// function that allows to capture the product identifier in the url
const getProductId = async () => {
  let parameters = new URLSearchParams(window.location.search);
  return parameters.get("id");
};

// catch data from the api with fetch() method and the id using the GetProductId function above
const getProducts = async () => {
  const productId = await getProductId();
  console.log(productId);
  let response = await fetch("http://localhost:3000/api/cameras/" + productId);

  console.log(response);
  let data_response = await response.json();
  return data_response;
};

// when the page is displayed, the promise from the fetch() method is received in the "data" array
//and the Cart numbers is loaded from the LocalStorage (onLoadCartNumbers() function)

document.addEventListener("DOMContentLoaded", load = async () => {
  onLoadCartNumbers();
  let data = [];

  try {
    data = await getProducts();

    //add the key/value inCart to the Object data to manipulate the Cart later
    data.inCart = 0;

    // target the main container element
    let main_container = document.querySelector("main.container");
    console.log(data);

    // creation elements
    let article = AddElement("article", main_container);
    let article_img_cont = AddElement("div", article);
    let article_img = AddElement("img", article_img_cont);
    let article_title = AddElement("h2", article);
    let article_price = AddElement("h3", article);
    let article_description = AddElement("p", article);

    // Add class, href and textContent
    article.className =
      "product_container  border text-center bg-light rounded noHover";
    article_img_cont.className = "product_img_cont";
    article_img.className = "product_img rounded";
    article_img.src = data.imageUrl;
    article_title.className = "product_title";
    article_title.textContent = data.name;
    article_price.className = "product_price";
    article_price.textContent = data.price;
    article_description.className = "product_description";
    article_description.textContent = data.description;

    // Add choices in the menu
    data.lenses.forEach((lense) => {
      let choice = AddElement("a", document.getElementById("menu"));
      choice.className = "dropdown-item";
      choice.textContent = lense;
    });

    // Add to LocalStorage

    //target the add-cart button
    let carts = document.getElementById("add-cart");

    //listening to the click event and creation of a callback function
    carts.addEventListener("click", () => {
      cartNumbers(data);
      // totalCost(data);
      console.log("added");
    });

    //CartNumbers creation or incrementation
    let cartNumbers = (data) => {
      let productNumbers = localStorage.getItem("cartNumbers");
      productNumbers = parseInt(productNumbers);

      if (productNumbers) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector(".nav-link span").textContent =
          productNumbers + 1;
      } else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector(".nav-link span").textContent = 1;
      }

      //And calling the function in to store data in the LocalStorage
      setItems(data);
    };
  } catch (e) {
    console.log("Error!");
    console.log(e);
  }
});

//function to add data in the localStorage
let setItems = (data) => {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  console.log(cartItems);

  if (cartItems != null) {
    if (cartItems[data.name] == undefined) {
      cartItems = {
        ...cartItems,
        [data.name]: data,
      };
      cartItems[data.name].inCart += 1;
    } else {
      cartItems[data.name].inCart += 1;
    }
  } else {
    data.inCart = 1;
    cartItems = {
      [data.name]: data,
    };
  }

  //and push the data in the LocalStorage
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
};

// let totalCost = (data) => {

//     let cartCost = localStorage.getItem("totalCost");

//     console.log(typeof cartCost)
//     if (cartCost != null) {
//         cartCost = parseInt(cartCost);
//         localStorage.setItem("totalCost", cartCost + data.price)
//     }
//     else{
//         localStorage.setItem("totalCost", data.price)
//     }

// }
