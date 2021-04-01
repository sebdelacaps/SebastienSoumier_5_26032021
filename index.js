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



const getProducts = async () => {
 let response = await fetch('http://localhost:3000/api/cameras/');
 if (response.ok){
     let data = await response.json()

     let main_container = document.getElementById("container")

 for (let i=0; i<data.length; i++){
    

    let article_link = document.createElement("a");
    article_link.className = "product_link";

    article_link.href = "product.html?id="+data[i]._id;
    main_container.appendChild(article_link);

//     let article = document.createElement("article");
//    article.className = "product_container";
//    article_link.appendChild(article);
   
let article = AddElement("article", [("className", "product_container")],article_link );
console.log(article)

   let article_img = document.createElement("img");
   article_img.className = "product_img";
   article_img.src = data[i].imageUrl;
   article.appendChild(article_img);


   console.log(data[i].imageUrl)


   let article_title = document.createElement("h2");
   article_title.className = "product_title";
   article_title.textContent = data[i].name;
   article.appendChild(article_title);
   
   
   let article_price = document.createElement("h3")
   article_price.className = "product_price";
   article_price.textContent = data[i].price;
   article.appendChild(article_price);

let article_description = document.createElement("p")
   article_description.className = "product_description";
   article_description.textContent = data[i].description;
   article.appendChild(article_description);

                 
 }
 }
 else {
     console.error('Retour du serveur : ', response.status)
 }
}

getProducts()

function AddElement (balise, proprieties, parent){
    let element = document.createElement(balise)
    proprieties.forEach(e => {
        // [(key, value), (key, value)]
        element[e[0]]=e[1];

    });
    parent.appendChild(element);
    console.log(element)
return element;

}