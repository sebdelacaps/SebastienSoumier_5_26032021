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
      price_array.push(cartItems[cartItem].price*cartItems[cartItem].inCart)
    }
   
    // Reduce method to sum elements in an array
  let totalOrder 
  totalOrder = price_array.reduce((a, b) => a + b, 0)

return totalOrder
  
  }

  // when the page is displayed, catch OrderId with getOrderId function, and total calculation with cartItems_To_Array function
//LocalStorage is cleared at the end

document.addEventListener("DOMContentLoaded",  () => {

    const orderId_result = getOrderId();
    
    const totalOrder_result = cartItems_To_Array();


    let total_confirmation = document.querySelector("#total_confirmation");
    
   let orderId_confirmation = document.querySelector("#orderId_confirmation");
    
    orderId_confirmation.innerHTML= "L'identifiant de votre commande est : "+orderId_result;

    total_confirmation.innerHTML = "Merci de votre commande, d'un montant de "+totalOrder_result+"€";
   
     localStorage.clear();
    
})
 

