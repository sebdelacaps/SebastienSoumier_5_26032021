const getProductId = () => {
    let parameters = new URLSearchParams(window.location.search)
    return parameters.get("id")
    
}
  
const productId = getProductId()
console.log(productId)

const getProducts = async () => {
    let response = await fetch('http://localhost:3000/api/cameras/'+productId);
    console.log(response)
    if (response.ok){
        let data = await response.json()
        console.log(data)
        
    

       let main_container = document.getElementById("container")
   
         
       let article = document.createElement("article");
      article.className = "product_container";
      main_container.appendChild(article);
      
      let article_img = document.createElement("img");
      article_img.className = "product_img";
      article_img.src = data.imageUrl;
      article.appendChild(article_img);
   
   
      console.log(data.imageUrl)
   
   
      let article_title = document.createElement("h2");
      article_title.className = "product_title";
      article_title.textContent = data.name;
      article.appendChild(article_title);
      
      
      let article_price = document.createElement("h3")
      article_price.className = "product_price";
      article_price.textContent = data.price;
      article.appendChild(article_price);
   
   let article_description = document.createElement("p")
      article_description.className = "product_description";
      article_description.textContent = data.description;
      article.appendChild(article_description);
   
                    
    
    }
    else {
        console.error('Retour du serveur : ', response.status)
    }
   }
   
   getProducts()
   

