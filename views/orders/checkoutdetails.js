const layout = require("../checkoutLayout");
const { getError } = require("../helpers");

module.exports = ({ errors, cart}) => {
let orderTotal = 0
let itemTotal = 0
let currentCart = ''

for (items of cart.items) {
itemTotal = items.quantity * items.price
itemTotal = (Math.round(itemTotal * 100) / 100).toFixed(2)

currentCart += `  <p class="cartItem">${items.title} <span class="cartMultiplier"> X <span class="cartQty">${items.quantity}</span> </span>  <span class="cartPrice"> £${itemTotal} </span> <button onclick=deleteCartItem("${items.id}","${cart.id}") class="deleteCartItem">X </button> </p>`
orderTotal += items.quantity * items.price
}
orderTotal = (Math.round(orderTotal * 100) / 100).toFixed(2)

  return layout({
    content: `
  
    <div class="cartReview">  <h4 class="cartHeading">Your Order</h4>
    ${currentCart}
    
    Order Total: £${orderTotal}</div>

    
    <div class="deliveryForm">

        <form method="POST" action="/cart/review/confirm">

            <input class="standardInput-firstName" placeholder="First Name" name="firstName">

          <input class="standardInput-surname" placeholder="Surname" name="surname">

        <input class="standardInput-email" placeholder="Email" name="email">
          
           <input class="standardInput-firstLineAdd" placeholder="1st Line of Address" name="firstLineDel">
          

          <input class="standardInput-secondLineAdd" placeholder="2nd Line of Address" name="secondLineDel">
         

          <input class="standardInput-postcode" placeholder="Postcode" name="postcode">
         

       
         <input class="standardInput-telNumber" placeholder="Tel No." name="telNumber">
        
          
          <button type="submit" class="button is-primary">Confirm & Pay</button>
        </form>
        
      
    </div>
  `,
  });
};
