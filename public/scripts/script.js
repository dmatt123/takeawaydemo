
async function addtoCart(cartId, prodId) {
    console.log(cartId, prodId)
try {
    const response = await axios.post(`/${cartId}/${prodId}`)
    const notification = document.getElementById('userNotification');
    notification.style.display = 'block';
    notification.innerText = "Item successfully added to your order"
    setTimeout(function(){     notification.style.display = 'none';
}, 4000);
    getCart(cartId)

} 
    catch(err) {
        console.log(err)
    }
};

async function getCart(cartId) {
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
    } 
    for (items of response.data.cart.items) {
        itemTotal = items.quantity * items.price
        itemTotal = (Math.round(itemTotal * 100) / 100).toFixed(2)

        itemhtml += `  <p class="cartItem">${items.title} <span class="cartMultiplier"> X <span class="cartQty">${items.quantity}</span> </span>  <span class="cartPrice"> £${itemTotal} </span> <button onclick=deleteCartItem("${items.id}","${cartId}") class="deleteCartItem">X </button> </p>`
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
            itemhtml += `<p class="discountDetail">DISCOUNT! - ${discount.code} - £${discount.discount} OFF! </p>` }

    orderTotal = (Math.round(orderTotal * 100) / 100).toFixed(2)
    if (orderTotal < 0) {
        orderTotal = "0.00"
    }
    itemhtml += `<p class="Total">Order Total: <span class="cartOrderTotal"></span>£${orderTotal} </p>`
 
    if (response.data.cart.items.length > 0 && !window.location.pathname.includes("cart/review")) {
    itemhtml += ` <form method="GET" action="/cart/review"><button type="submit" class="checkoutBtn">Checkout</button></form>`
    } 
    cartElement[0].innerHTML = itemhtml
    console.log(itemhtml)
}
catch(err) {
    console.log(err)
}
}

async function addPromo(cartId) {
    const notification = document.getElementById('userNotification');
 
const spinner = document.getElementById('lds-hourglass')    
    const discount = document.getElementById('discountCodeInput').value;
try {
    spinner.style.display="block";
    const response = await axios.post(`/${cartId}/promos/${discount}`)
    console.log(response)

    getCart(cartId)
 

} 
    catch(err) {
        console.log(err)
        return;
    }
    spinner.style.display="none";
    notification.style.display = 'block';
    notification.innerText = "Discount Code applied to cart"
    setTimeout(function(){     notification.style.display = 'none';
}, 7000);   
 
    getCart(cartId)
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

    

if (postcodes.includes(inputbox.value.toUpperCase())) {
    document.getElementById("postcodeInput").style.display="none";
    document.getElementById("postcodeSuccessMsg").style.display="block";
document.getElementById('sectionMenu').style.display="block";
document.getElementById("postcodeSuccessMsg").innerText="GREAT! WE CAN DELIVER TO YOUR AREA";


} else if (inputbox.value.length > 4) {
    document.getElementById("postcodeFailureMsg").style.display="block";
    document.getElementById("postcodeFailureMsg").innerText="UNFORTUNATELY, WE DO NOT DELIVER TO YOUR AREA";

}
})

; 
