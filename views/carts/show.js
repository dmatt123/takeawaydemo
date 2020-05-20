const layout = require('../layout');



module.exports = ({ items, categories, cart }) => {
  const cats = categories.map(categories => {
    return `
    <a class="navbar-item" href="/department/${categories.categoryUrl}">
    ${categories.name}</a>`
 
  }).join('\n')

 

    // const totalPrice = items.reduce((prev, item) => {
    //   return prev + item.quantity * item.product.price
    // }, 0) 

    // alternative way of getting TotalPrice using reduce

    let totalPrice = 0

    for (let item of items) {
      totalPrice += item.quantity * item.product.price
    }

    totalPrice = (Math.round(totalPrice * 100) / 100).toFixed(2)

    let discount = cart.discount.discount
    let orderTotal = parseFloat((totalPrice / 100 * 100).toFixed(2))
     
    if (discount == undefined) {
       discount = `` } else if (cart.discount.type == "£") 
       {
         orderTotal = totalPrice - cart.discount.discount
         discount = `Discount: <h1 class="title">£${cart.discount.discount} </h2> <p> Voucher Code - ${cart.discount.code} was successfully applied! <form method="POST" action="/cart/${cart.id}/promo/remove"><button class="button is-danger">Delete</button></form></p> 
         `
   } else if (cart.discount.type == "%") {
    let percDisc = parseFloat(totalPrice * (cart.discount.discount / 100) / 100 * 100).toFixed(2)
    orderTotal = totalPrice - percDisc
    discount = `Discount: <h1 class="title">£${percDisc} </h2> <p> Voucher Code - ${cart.discount.code} was successfully applied! <form method="POST" action="/cart/${cart.id}/promo/remove"><button class="button is-danger">Delete</button></form></p> 
    `
   }
   
   if (orderTotal < 0) {
orderTotal = 0; }

  const renderedItems = items
    .map(item => {
      return `
        <div class="cart-item message style">
        <a href="/products/${item.product.productUrl}">
        <img src="data:image/png;base64, ${item.product.image}" width="100" height="100"/>
        <h3 class="subtitle cartProduct">${item.product.title}</h3>

         </a>
          <div class="cart-right">
            <div>
              £${item.product.price}  X  ${item.quantity} = 
            </div>
            <div class="price is-size-4">
              £${item.product.price * item.quantity}
            </div>
            <div class="remove">
              <form action="/cart/products/delete" method="POST">
              <input hidden value="${item.id}" name="itemId" />
                <button class="button is-danger">                  
                  <span class="icon is-small">
                    <i class="fas fa-times"></i>
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      `;
    })
    .join('');

  return layout({
    links: `${cats}`,
    content: `
      <div id="cart" class="container">
        <div class="columns">
          <div class="column"></div>
          <div class="column is-four-fifths">
            <h3 class="subtitle"><b>Shopping Cart</b></h3>
            <div>
              ${renderedItems}
            </div>
            <div class="container">
            <form method="POST">
            <div class="field">
            <input class="input" placeholder="Enter Discount Code" name="code">
            <button class="button is-primary">Apply Code</button>
            </form>
          </div> <br>
            <div class="total message is-info">
              Subtotal: <h1 class="title">£${totalPrice}</h1>
    ${discount}
            Grand Total: <h1 class="title">£${parseFloat(orderTotal / 100 * 100).toFixed(2)}</h1>

            
            </div>
            </div>
            <br>
          <a href="/cart/review">
          <button class="button is-primary">Checkout</button>
          </a>
          <div class="column"></div>
        </div>

        </div>
      </div>
    `
  });
};
