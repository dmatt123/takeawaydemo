
async function addtoCart(cartId, prodId) {
    document.getElementById('checkoutBtnMain').style.display="block"

try {
    const response = await axios.post(`/${cartId}/${prodId}`)
    const notification = document.getElementById('userNotification');
    notification.style.display = 'block';
    notification.innerText = "Item successfully added to your order"
    setTimeout(function(){     notification.style.display = 'none';
}, 4000);
window.navigator.vibrate(200);
    getCart(cartId)

} 
    catch(err) {
        console.log(err)
    }
};

async function getExtras(cartId, prodId, extrasId) {
    let extrasHeading = document.getElementById('extrasHeading')
    const modal = document.getElementById('modal');
    let modalContent = document.getElementById('extraContent')
    modalContent.innerHTML = ``
    modal.style.display="block";
try {
    const response = await axios.get(`${cartId}/${prodId}/${extrasId}/show`)
    extrasHeading.innerHTML = response.data.product.title
    extrasData = response.data.product.products
    
    for (extras of extrasData) {
      extras.price =  parseFloat(extras.price * 100 / 100).toFixed(2);
modalContent.innerHTML += `<p class="extras"><span class="extraName">${extras.name} </span> <span class="extraPrice"> £${extras.price} </span> <button onclick=addExtras("${cartId}","${prodId}","${extras.id}") class="btnAddtoCart">+</button></p> `
    }
} catch(err) {
    console.log(err);
}
}

async function addExtras(cartId, prodId, extrasId) {
    document.getElementById('checkoutBtnMain').style.display="block"

    try {
        const response = await axios.post(`${cartId}/${prodId}/${extrasId}/add`)
        const notification = document.getElementById('userNotification');
        notification.style.display = 'block';
        notification.innerText = "Item successfully added to your order"
        setTimeout(function(){     notification.style.display = 'none';
    }, 8000);
    window.navigator.vibrate(200);

    } catch(err) {
        console.log(err)
    }
    const modal = document.getElementById('modal');
    modal.style.display="none";
    getCart(cartId)
}

async function getCart(cartId) {

    const mobCart = document.getElementById('cartMobile');
    let itemhtml = ``
    let orderTotal = 0;
    let itemTotal = 0;
    let discount = null;
cartElement = document.getElementsByClassName('cartDetail')
try {
    const response = await axios.get(`/${cartId}`)
    discount = response.data.cart.discount
    if (response.data.cart.items.length == 0) {
        itemhtml = `<p class="emptyBasket">Please select the dishes you wish to order</p>`
        document.getElementById('checkoutBtnMain').style.display="none"

    } 
    
    for (items of response.data.cart.items) {
        let extras;
      if (!items.extras) {
        extras = ``
      } else {
        extras = `with ${items.extras[0].name}`
      }

        itemTotal = items.quantity * items.price
        itemTotal = (Math.round(itemTotal * 100) / 100).toFixed(2)


        itemhtml += `  <p class="cartItem">${items.title} <span class="cartMultiplier"> X <span class="cartQty">${items.quantity}</span> </span>  <span class="cartPrice"> £${itemTotal} </span> <button onclick=deleteCartItem("${items.id}","${cartId}") class="deleteCartItem">X </button> </p> <p class="extraCart">${extras}</p>`
        orderTotal += items.quantity * items.price
    }
    

        if (!discount.code) {
            discount = `` } 
            else if (discount.type == "£") {
              orderTotal = orderTotal - discount.discount
        } else if (discount.type == "%") {
         let percDisc = parseFloat(orderTotal * (discount.discount / 100) / 100 * 100).toFixed(2)
         orderTotal = orderTotal - percDisc
        discount.discount = percDisc }

         if (discount.code) {
            itemhtml += `<p class="discountDetail"> ${discount.code} - £${discount.discount} OFF! <button class="removePromo" onclick=removePromo("${cartId}")>X</button> </p>` }

    orderTotal = (Math.round(orderTotal * 100) / 100).toFixed(2)
    if (orderTotal < 0) {
        orderTotal = "0.00"
    }
    itemhtml += `<p class="Total">Order Total: <span class="cartOrderTotal"></span>£${orderTotal} </p>`
  
    if (response.data.cart.items.length > 0 && !window.location.pathname.includes("cart/review")) {
    itemhtml += ` <form method="GET" action="/cart/review"><button type="submit" class="checkoutBtn">Checkout</button></form>`

} 
itemhtml += `  <div id="discountCodeSection">
<input id="discountCodeInput" placeholder="Promo Code" name="code">
<br> <button onclick=addPromo("${cartId}") class="reedemBtn">Redeem</button>     <div id="lds-hourglass"></div>
</div>`
    cartElement[0].innerHTML = itemhtml
    mobCart.innerHTML = `View Cart (£${orderTotal})`

    if (response.data.cart.items.length > 0) {
        document.getElementById("postcodeSuccessMsg").innerText="";
    } 
}
catch(err) {
    console.log(err)
}
}

async function addPromo(cartId) {
    const notification = document.getElementById('userNotification');
 let response
const spinner = document.getElementById('lds-hourglass')    
    const discount = document.getElementById('discountCodeInput').value;
try {
    spinner.style.display="block";
    response = await axios.post(`/${cartId}/promos/${discount}`)
    getCart(cartId)
} 
    catch(err) {
        console.log(err)
        
    }
    if (response) {
        notification.style.display = 'block';
        spinner.style.display="none";
        notification.innerText = "Discount Code applied to cart"
        setTimeout(function(){     notification.style.display = 'none';
    }, 7000);   
    } else {
        notification.style.display = 'block';
        spinner.style.display="none";
        notification.innerText = "No discount code found"
        setTimeout(function(){     notification.style.display = 'none';
    }, 7000);   
    }
    
    getCart(cartId)

  
 
}

async function removePromo(cartId) {
try {
    const spinner = document.getElementById('lds-hourglass')    
    const notification = document.getElementById('userNotification');
    const response = await axios.post (`/cart/${cartId}/promo/remove`)
    notification.style.display = 'block';
spinner.style.display="none";
notification.innerText = "Discount Code deleted from order"
setTimeout(function(){     notification.style.display = 'none';
}, 7000);   
getCart(cartId)
}
catch(err) {
    console.log(err)
}


}


async function deleteCartItem(prodId, cartId) {
    try {
        const response = await axios.post(`/cart/delete/${prodId}`)
        const notification = document.getElementById('userNotification');
        notification.style.display = 'block';
        notification.innerText = "Item successfully removed from order"
        setTimeout(function(){     notification.style.display = 'none';
    }, 7000);        getCart(cartId)

    } 
        catch(err) {
            console.log(err)
        }
}

const inputbox = document.getElementById("inputBoxPostcode")


inputbox.addEventListener("keyup", function(e){ 
    document.getElementById("postcodeFailureMsg").style.display="none";

    const postcodes = ['DD1','DD2', 'DD3', 'DD4', 'DD5', 'DD6']

    let date = new Date()
    
    

    
for (postcode of postcodes) {
    inputbox.value = inputbox.value.replace(/\s+/g, '');
if (inputbox.value.length > 5 && inputbox.value.toUpperCase().includes(postcode)) {
    document.getElementById("postcodeInput").style.display="none";
    document.getElementById("postcodeSuccessMsg").style.display="block";
document.getElementById('sectionMenu').style.display="block";
document.getElementById("postcodeSuccessMsg").innerText="GREAT! WE CAN DELIVER TO YOUR AREA";


if (document.body.clientWidth < 600) {
    console.log("screen is less than 600px wide")
    document.getElementById('cartMobile').style.display="block";
}


if (date.getHours() < 16) {
    document.getElementById("postcodeSuccessMsg").innerText="The restaurant is currently closed but we are accepting pre-orders for this evening"
  }



} else if (inputbox.value.length > 6) {
    if (!inputbox.value.toUpperCase().includes(postcode)) {
    document.getElementById("postcodeFailureMsg").style.display="block";
    document.getElementById("postcodeFailureMsg").innerText="UNFORTUNATELY, WE DO NOT DELIVER TO YOUR AREA";
    }
}}
})


async function minCart() {
    const cartMin = document.getElementsByClassName('cart');
    const mobCart = document.getElementById('cartMobile');


    cartMin[0].style.display="none";
    mobCart.style.display="block"
}



async function maxCart() {
    const cartMin = document.getElementsByClassName('cart');
    const mobCart = document.getElementById('cartMobile');


    cartMin[0].style.display="block";
    mobCart.style.display="none"
}