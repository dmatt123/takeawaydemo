const layout = require("../checkoutLayout");
const { getError } = require("../helpers");

module.exports = ({ errors, cart}) => {


  return layout({
    content: `
    <div class="cartDetailHeading">Your Order</div>

    <div class="cartDetail"> 
    </div>

    <div class="field">
    <input id="discountCodeInput" placeholder="Enter Discount Code" name="code">
   <br> <button onclick=addPromo("${cart.id}") class="button is-primary">Apply Code</button>     <div id="lds-hourglass"></div>

<div class="container">
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
        
      
    </div> </div>

    <body onload=getCart("${cart.id}")

  `,
  });
};
