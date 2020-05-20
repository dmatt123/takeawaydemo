
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
    let orderTotal = 0
cartElement = document.getElementsByClassName('cartDetail')
try {
    const response = await axios.get(`/${cartId}`)
    if (response.data.cart.items.length == 0) {
        itemhtml = `<p class="emptyBasket">Please select the dishes you wish to order</p>`
    } 
    for (items of response.data.cart.items) {
        itemhtml += `  <p class="cartItem">${items.title} <span class="cartMultiplier"> X <span class="cartQty">${items.quantity}</span> </span>  <span class="cartPrice"> £${items.price} </span> <button onclick=deleteCartItem("${items.id}","${cartId}") class="deleteCartItem">X </button> </p>`
        orderTotal += items.quantity * items.price
    }
    orderTotal = (Math.round(orderTotal * 100) / 100).toFixed(2)

    itemhtml += `<p class="Total">Order Total: <span class="cartOrderTotal"></span>£${orderTotal}</p>`
    cartElement[0].innerHTML = itemhtml
    console.log(itemhtml)
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
    }, 4000);        getCart(cartId)

    } 
        catch(err) {
            console.log(err)
        }
}

const inputbox = document.getElementById("inputBoxPostcode")


inputbox.addEventListener("keyup", function(e){ 
if (inputbox.value.length >= 2) {
    document.getElementById("postcodeInput").style.display="none";
    document.getElementById("postcodeSuccessMsg").style.display="block";
document.getElementById('sectionMenu').style.display="block";
document.getElementById("postcodeSuccessMsg").innerText="GREAT! WE CAN DELIVER TO YOUR AREA";


}
})

; 
