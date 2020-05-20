const layout = require("../layout");
const { getError } = require("../helpers");

module.exports = ({ completedOrder, categories }) => {
    const cats = categories.map(categories => {
        return `
        <a class="navbar-item" href="/department/${categories.categoryUrl}">
        ${categories.name}</a>`
     
      }).join('\n')
      const items = completedOrder.cart.items.map(itemsOnOrder => {
        return `
        <img src="data:image/png;base64, ${itemsOnOrder.image}" width="40" height="20"/>
       <p> ${itemsOnOrder.title} x ${itemsOnOrder.quantity} </p>
       <p><b>Total: </b> £${parseFloat(itemsOnOrder.quantity * itemsOnOrder.price / 100 * 100).toFixed(2)}</p>
       
       `

      }).join('\n')
  return layout({
      links: `${cats}`,
    content: `
    <div class="container">
        <h1 class="subtitle">Order Confirmation</h1>
        <h3>Your Order Number is: #${completedOrder.orderNo}</h3>
        <h5>Delivery Details:</h5>
        <div>${completedOrder.firstName} ${completedOrder.surname} </div>
        <div>${completedOrder.firstLineDel} </div>
        <div>${completedOrder.secondLineDel} </div>
        <div>${completedOrder.postcode}</div>
</div>
    <div class="container">
    <p><b>Items</b> </p>
    ${items}

    <hr>
    <p><b>Sub Total:</b> £${parseFloat(completedOrder.orderTotal).toFixed(2)}</p>
    <p><b>Discount: </b> £${parseFloat(completedOrder.discountValue).toFixed(2)}</p>
    <p><b>Grand Total: </b> £${parseFloat(completedOrder.grandTotal).toFixed(2)}</p>
    </div>
    
  `,
  });
};
