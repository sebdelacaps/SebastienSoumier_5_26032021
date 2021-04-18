// catch data from the api with fetch() method
const getProducts = async () => {
  let response = await fetch("http://localhost:3000/api/cameras/");
  let data_response = await response.json();
  return data_response;
};

// when the page is displayed, the promise from the fetch() method is received in the "data" array
//and the Cart numbers is loaded form the LocalStorage (onLoadCartNumbers() function)

document.addEventListener("DOMContentLoaded", async () => {
  onLoadCartNumbers();
  let data = [];
  try {
    data = await getProducts();

    // target the main container element
    let main_container = document.querySelector("main.container");

    for (let i = 0; i < data.length; i++) {
      // creation elements
      let article_link = AddElement("a", main_container);
      let article = AddElement("article", article_link);
      let article_img_cont = AddElement("div", article);
      let article_img = AddElement("img", article_img_cont);
      let article_title = AddElement("h2", article);
      let article_price = AddElement("h3", article);
      let article_description = AddElement("p", article);

      // Add class, href and textContent
      article_link.className = "product_link text-decoration-none m-3";
      article_link.href = "product.html?id=" + data[i]._id;
      article.className =
        "product_container  border text-center bg-light rounded";
      article_img_cont.className = "product_img_cont";
      article_img.className = "product_img rounded-top";
      article_img.src = data[i].imageUrl;
      article_title.className = "product_title";
      article_title.textContent = data[i].name;
      article_price.className = "product_price";
      article_price.textContent = data[i].price;
      article_description.className = "product_description";
      article_description.textContent = data[i].description;
    }
  } catch (e) {
    console.log("Error!");
    console.log(e);
  }
});
