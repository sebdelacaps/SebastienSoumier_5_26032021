// document.getElementById("todo-2").addEventListener('click', function(){
// document.getElementById("todo-1").remove();

// })

// console.log("done")

// fetch('http://localhost:3000/api/cameras/')
// .then(response => response.json())
// .then(json => {
//     for (let i=0; i<json.length; i++){
//         console.log(json[i].name)
//     }
// }
// )
// .catch(error => console.log(error))

// Main function



const getProducts = async () => {
 let response = await fetch('http://localhost:3000/api/cameras/');
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

 for (let i=0; i<data.length; i++){

    // creation elements 
    let article_link = AddElement ("a",main_container);
    let article = AddElement("article",article_link);
    let article_img = AddElement("img",article);
    let article_title = AddElement("h2", article);
    let article_price = AddElement("h3", article);
    let article_description = AddElement("p", article);

    // Add class, href and textContent
    article_link.className = "product_link";
    article_link.href = "product.html?id="+data[i]._id;
    article.className = "product_container";
    article_img.className = "product_img";
    article_img.src = data[i].imageUrl;
    article_title.className = "product_title";
    article_title.textContent = data[i].name;
    article_price.className = "product_price";
    article_price.textContent = data[i].price;
    article_description.className = "product_description";
    article_description.textContent = data[i].description;

 }
} catch (e) {
    console.log("Error!")
    console.log(e)
}

})

