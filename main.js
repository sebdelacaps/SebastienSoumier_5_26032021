// function to create an element and put it in the DOM
const AddElement = (balise, parent) => {
  let element = document.createElement(balise);
  console.log(element);
  parent.appendChild(element);
  return element;
};

//keep the cart number updated from the LocalStorage
let onLoadCartNumbers = () => {
  let productNumbers = localStorage.getItem("cartNumbers");

  if (productNumbers) {
    document.querySelector(".nav-link span").textContent = productNumbers;
  }
};
