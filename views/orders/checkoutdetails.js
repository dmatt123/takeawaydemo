const layout = require("../checkoutLayout");
const { getError } = require("../helpers");

module.exports = ({ errors,prevValues, cart}) => {
let item;
let hours;
let mins;
let date = new Date()
let closedMsg = ``
hours = date.getHours();

if (date.getHours() < 16) {
  closedMsg = `The restaurant is currently closed but we are accepting pre-orders for this evening`
}

date.setHours(hours + 1)


if (date.getHours() < 17) {
  date.setHours(17)
  date.setMinutes(00)
}





for (var i = 0; i < 300; i++) {
  mins = date.getMinutes();

  mins = round5(mins)

  date.setMinutes(mins + 5)

  normalDate = parseDate(date)

  item += `<option value="${normalDate}">${normalDate}</option>`

  if (date.getHours() > 22) {
    break;
  }

}

function parseDate(date) {
min = date.getMinutes()

if (min == 0) {
  min = "00"
}
if (min == 5) {
  min = "05"
}

return date.getHours() + ":" + min
}

function round5(x)
{
    return Math.ceil(x/5)*5;
}

deliveryTime = `    
<select class="standardInput" id="deliveryTime" name="deliveryTime">
<option value="ASAP">ASAP</option>
  ${item}
</select> `

if (prevValues) {
 cartDetail = `      
 
 <input class="standardInput" placeholder="First Name" name="firstName" value="${prevValues.firstName}">
 <p class="help is-danger">${getError(errors, 'firstName')}</p>


 <input class="standardInput" placeholder="Surname" name="surname" value="${prevValues.surname}">
 <p class="help is-danger">${getError(errors, 'surname')}</p>


<input class="standardInput" placeholder="Email" name="email" value="${prevValues.email}">
<p class="help is-danger">${getError(errors, 'email')}</p>

  <input class="standardInput" placeholder="1st Line of Address" name="firstLineDel" value="${prevValues.firstLineDel}">
  <p class="help is-danger">${getError(errors, 'firstLineDel')}</p>

 <input class="standardInput" placeholder="2nd Line of Address" name="secondLineDel" value="${prevValues.secondLineDel}">


 <input class="standardInput" placeholder="Postcode" name="postcode" value="${prevValues.postcode}">
 <p class="help is-danger">${getError(errors, 'postcode')}</p>


<input class="standardInput" placeholder="Tel No." name="telNumber" value="${prevValues.telNumber}"> 
<p class="help is-danger">${getError(errors, 'telNumber')}</p>

${deliveryTime}
`
} else {
  cartDetail =
 ` <input class="standardInput" placeholder="First Name" name="firstName">
  <p class="help is-danger">${getError(errors, 'firstName')}</p>


  <input class="standardInput" placeholder="Surname" name="surname">
  <p class="help is-danger">${getError(errors, 'surname')}</p>

 
 <input class="standardInput" placeholder="Email" name="email">
 <p class="help is-danger">${getError(errors, 'email')}</p>
 
  
   <input class="standardInput" placeholder="1st Line of Address" name="firstLineDel">
   <p class="help is-danger">${getError(errors, 'firstLineDel')}</p>

 
  <input class="standardInput" placeholder="2nd Line of Address" name="secondLineDel">

 
  <input class="standardInput" placeholder="Postcode" name="postcode">
  <p class="help is-danger">${getError(errors, 'postcode')}</p>
 
 <input class="standardInput" placeholder="Tel No." name="telNumber">
 <p class="help is-danger">${getError(errors, 'telNumber')}</p>

 ${deliveryTime}


 `
}
  return layout({
    content: `
    <div class="container menuReview">
    <div class="cartReview">
    <div class="cartDetailHeading">Your Order     
    </div>
    <div class="cartDetail"> 

    </div>
    
   </div></div></div>
 
    <div class="container menu">
          ${closedMsg}
        <form method="POST" action="/cart/review/confirm">

   
        ${cartDetail}
          
          <button type="submit" class="confirmBtn">Confirm & Pay</button>
        </form>
        
      
    </div> </div>

    <body onload=getCart("${cart.id}")

  `,
  });
};
