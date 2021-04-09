const getProductId = async () => {
        let parameters = new URLSearchParams(window.location.search);
        return parameters.get("id");    
}


const getProducts = async () => {
    const productId = await getProductId(); 
    console.log(productId);
    // let response = await fetch('http://localhost:3000/api/cameras/'+productId);
    let response = await fetch('https://ab-p5-api.herokuapp.com/api/cameras/'+productId);
        let data_response = await response.json();
        return data_response
   }

const AddElement = (balise, parent) => {
    let element = document.createElement(balise);
    console.log(element)
    parent.appendChild(element);  
    return element;

}


document.addEventListener("DOMContentLoaded", async () => {
    onLoadCartNumbers();
  

    let data = [];
  
    
    
try {
    
    data = await getProducts();
    //add the key/value inCart to the Object data
    data.inCart = 0;
    let main_container = document.getElementById("container");
    console.log(data)
    // creation elements 
    let article = AddElement("article",main_container);
    let article_img = AddElement("img",article);
    let article_title = AddElement("h2", article);
    let article_price = AddElement("h3", article);
    let article_description = AddElement("p", article);
         
       // Add class, href and textContent
      article.className = "product_container";
      article_img.className = "product_img";
      article_img.src = data.imageUrl;
      article_title.className = "product_title";
      article_title.textContent = data.name;
      article_price.className = "product_price";
      article_price.textContent = data.price;
      article_description.className = "product_description";
      article_description.textContent = data.description;
  
       // Add choices in the menu
      data.lenses.forEach(lense => {
          
        let choice = AddElement ("a", document.getElementById("menu"));
        choice.className = "dropdown-item";
        choice.textContent = lense;
      });
    
      // Add to LocalStorage

      let carts = document.getElementById("add-cart");
    
    carts.addEventListener("click", () => {
    cartNumbers(data);
    totalCost(data);
    console.log("added")  
    })

    
    let cartNumbers = (data) => {
    let productNumbers = localStorage.getItem('cartNumbers');
   
    productNumbers = parseInt(productNumbers);
    
    if (productNumbers) {
        localStorage.setItem('cartNumbers',productNumbers + 1);
        document.querySelector(".nav-link span").textContent = productNumbers + 1;
    }
    else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector(".nav-link span").textContent = 1;
    }
   
    setItems(data);
}


} catch (e) {
    console.log("Error!")
    console.log(e)
}


})

let onLoadCartNumbers = () =>{
    let productNumbers = localStorage.getItem('cartNumbers');
    
    if(productNumbers) {
        document.querySelector(".nav-link span").textContent = productNumbers;
    }
}

let setItems = (data) => {

    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);


console.log(cartItems)

if (cartItems != null) {

    if (cartItems[data.name] == undefined) {
        cartItems = {
           ...cartItems,
            [data.name] : data

        }
    }
cartItems[data.name].inCart += 1;

} else {
    data.inCart = 1;
cartItems = {
    [data.name]: data,
    
}
}


localStorage.setItem("productsInCart", JSON.stringify(cartItems))
}

let totalCost = (data) => {
    
    let cartCost = localStorage.getItem("totalCost");
    
    console.log(typeof cartCost)
    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + data.price)
    }
    else{
        localStorage.setItem("totalCost", data.price)
    }
    
}

