const getProductId = async () => {
        let parameters = new URLSearchParams(window.location.search);
        return parameters.get("id");    
}


const getProducts = async () => {
    const productId = await getProductId(); 
    console.log(productId);
    let response = await fetch('http://localhost:3000/api/cameras/'+productId);
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
    let data = [];
    
try {
    
    data = await getProducts();
    let main_container = document.getElementById("container");

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

 
} catch (e) {
    console.log("Error!")
    console.log(e)
}

})


  