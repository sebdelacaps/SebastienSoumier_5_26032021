// From LocalStorage to the Basket view

const AddElement = (balise, parent) => {
    let element = document.createElement(balise);
    
    parent.appendChild(element);
    return element;

}

let displayCart = () => {
    let cartItems = localStorage.getItem("productsInCart")
    cartItems = JSON.parse(cartItems)
    
    let productContainer = document.querySelector(".products-container")
 
    if(cartItems && productContainer){
       
        
        for (let i = 0; i<Object.values(cartItems).length; i++){
            
            let product_row = AddElement("tr", productContainer);
            product_row.className = "products"
            console.log(product_row)

                
                let product_cell_1 = AddElement("td", product_row);
                product_cell_1.innerHTML = Object.values(cartItems)[i].name

                
                let product_cell_2 = AddElement("td", product_row);
                product_cell_2.innerHTML = Object.values(cartItems)[i].price 

            
                let product_cell_3 = AddElement("td", product_row);
                product_cell_3.innerHTML = Object.values(cartItems)[i].inCart;

                let product_cell_4 = AddElement("td", product_row);
                product_cell_4.innerHTML = product_cell_2.innerHTML * product_cell_3.innerHTML + "€"
          
    }

    let cartTotal = localStorage.getItem("totalCost");
    let total_row = document.querySelector("#total");
    total_row.textContent = cartTotal+"€"
}
}
displayCart()