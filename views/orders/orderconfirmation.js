const layout = require("../checkoutLayout");
const { getError } = require("../helpers");

module.exports = ({ completedOrder, categories }) => {
    const cats = categories.map(categories => {
        return `
        <a class="navbar-item" href="/department/${categories.categoryUrl}">
        ${categories.name}</a>`
     
      }).join('\n')
      const items = completedOrder.cart.items.map(itemsOnOrder => {
        return `
       <p class="orderConfItems"> ${itemsOnOrder.title} x ${itemsOnOrder.quantity} </p>
       <p class="orderConfItemPrice"><b>Total: </b> £${parseFloat(itemsOnOrder.quantity * itemsOnOrder.price / 100 * 100).toFixed(2)}</p>
       
       `

      }).join('\n')
  return layout({
      links: `${cats}`,
    content: `
    <div class="container">
      <div class="orderConfirmation">
        <h1 class="orderConfirmationH1">Order Confirmation</h1>
        <h3>Your Order Number is: #${completedOrder.orderNo}</h3>
        <h5 class="orderConfDeliverySection">Delivery Details:</h5>
        <div>${completedOrder.firstName} ${completedOrder.surname} </div>
        <div>${completedOrder.firstLineDel} </div>
        <div>${completedOrder.secondLineDel} </div>
        <div class="orderConfPostcode">${completedOrder.postcode}</div>
    <div class="container">
    <p class="orderConfItemsHeading><b>Items</b> </p>
    ${items}

    <hr>
    <p class="orderConfSubTotal"><b>Sub Total:</b> £${parseFloat(completedOrder.orderTotal).toFixed(2)}</p>
    <p><b>Discount: </b> £${parseFloat(completedOrder.discountValue).toFixed(2)}</p>
    <p class="orderConfGrandTotal"><b>Grand Total: </b> £${parseFloat(completedOrder.grandTotal).toFixed(2)}</p>
    </div>
    </div>
    </div>

  `,
  });
};
