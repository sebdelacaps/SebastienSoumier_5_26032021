//LocalStorage Items to an array of product Id (used to push the array in the post method)
let cartItems_To_Array = () =>{

  let products_array = [];
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  
  for (var cartItem in cartItems) {
    products_array.push(cartItems[cartItem]._id)
  }
 
  return products_array

}



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

// form input validation submission

const myform = document.getElementById("myform");

myform.email.addEventListener("change", ()=> {
validEmail(myform.email);
} )

myform.firstName.addEventListener("change", ()=> {
validText(myform.firstName);
} )

myform.lastName.addEventListener("change", ()=> {
  validText(myform.lastName);
  } )

  myform.address.addEventListener("change", ()=> {
    validText(myform.address);
    } )

    myform.cp.addEventListener("change", ()=> {
      validCp(myform.cp);
      } )

      myform.city.addEventListener("change", ()=> {
        validText(myform.city);
        } )


         //pattern regex email address
let emailRegExp = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

  //pattern regex postcode
  let cpRegExp = /[0-9]{5}/;

//*********EMAIL VALIDATION************:
const validEmail = (inputEmail) => {
 
 
// small balise catching 
let small = inputEmail.nextElementSibling;

// Email regex testing 
if (emailRegExp.test(inputEmail.value)) {
 
 small.innerHTML = "Syntaxe Email valide";
 inputEmail.classList.remove('is-invalid');
 inputEmail.classList.add('is-valid')
 small.classList.remove('text-danger');
 small.classList.add('text-success');
} else{
  
  small.innerHTML = "Syntaxe Email non valide"
  inputEmail.classList.remove('is-valid');
  inputEmail.classList.add('is-invalid')
  small.classList.remove('text-success');
  small.classList.add('text-danger');
}
}


//*********TEXT VALIDATION***********:
const validText = (inputText) => {
  
  // small balise catching 
let small = inputText.nextElementSibling;

  //at least 2 letters

  if(inputText.value.length > 1) {
 
    small.innerHTML = "Entrée valide";
    inputText.classList.remove('is-invalid');
    inputText.classList.add('is-valid')
 small.classList.remove('text-danger');
 small.classList.add('text-success');
  }
  else{
    small.innerHTML = "Entrée non valide"
    inputText.classList.remove('is-valid');
    inputText.classList.add('is-invalid')
    small.classList.remove('text-success');
    small.classList.add('text-danger');
  }

}

//*********POST CODE VALIDATION***********:

const validCp = (inputCp) => {
 

  
// small balise catching 
let small = inputCp.nextElementSibling;

// Post code regex testing 
if (cpRegExp.test(inputCp.value)) {

 small.innerHTML = "Code postal valide";
 inputCp.classList.remove('is-invalid');
 inputCp.classList.add('is-valid')
 small.classList.remove('text-danger');
 small.classList.add('text-success');
} else{
  
  small.innerHTML = "Code Postal non valide"
  inputCp.classList.remove('is-valid');
    inputCp.classList.add('is-invalid')
  small.classList.remove('text-success');
  small.classList.add('text-danger');
}
}





myform.addEventListener("submit", (event) => {
   // event is an object

   let products_array = cartItems_To_Array()
   
// form validation - Client side
// 
  if (myform.checkValidity() === false || emailRegExp.test(myform.email.value) ===false || cpRegExp.test(myform.cp.value) ===false || firstName.value.length < 2 || lastName.value.length < 2 || city.value.length < 2 || address.value.length < 2) 
  {
    
       event.preventDefault();
       alert("Merci de renseigner correctement vos coordonées")
      
  }
  

// if ok, form submission by a POST request
    
    


else if (products_array.length === 0) {
  event.preventDefault();

  alert("Votre panier est vide!")
 
}


else{
  
  fetch("http://localhost:3000/api/cameras/order", {
   
    method : "POST",
    headers : {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json'
    },
    body : JSON.stringify({
      contact: {firstName: document.getElementById("firstName").value, 
      lastName: document.getElementById("lastName").value, 
      address: document.getElementById("address").value, 
      city: document.getElementById("city").value, 
      email: document.getElementById("email").value},
      products : products_array
    }) 
 
})



 .then((first_response) => first_response.json())
          .then(
            (second_response) =>
              (window.location.href =
                "confirmation.html?orderId=" + second_response.orderId))

}
 
})


displayCart();
