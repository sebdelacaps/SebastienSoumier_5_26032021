// function that allows to capture the product identifier in the url
const getOrderId = () => {
    let parameters = new URLSearchParams(window.location.search);
    let orderId = parameters.get("orderId")
   
        return orderId;
  };

  let cartItems_To_Array = () =>{

    let price_array = [];
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    
    for (var cartItem in cartItems) {
      price_array.push(cartItems[cartItem].price)
    }
   
    var sum = price_array.reduce(function(a, b){
        
  console.log(sum)
        return a + b;
    }, 0);

  }

  // when the page is displayed, the promise from the fetch() method is received in the "data" array
//and the Cart numbers is loaded from the LocalStorage (onLoadCartNumbers() function)

document.addEventListener("DOMContentLoaded",  () => {

    const orderId_result = getOrderId();


    const total_confirmation = document.querySelector("#total_confirmation");
    
    const orderId_confirmation = document.querySelector("#orderId_confirmation");
    
    orderId_confirmation.innerHTML= "L'identifiant de votre commande est : "+orderId_result;

    console.log(cartItems_To_Array())
    // localStorage.clear();
    
})
 

