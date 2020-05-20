const layout = require('../layout');

module.exports = ({ orders }) => {

  //orders sort by a-z
  orders.sort(function(a, b) {
    var textA = a.orderDate
    var textB = b.orderDate
    return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
});
//end of orders sort
  const renderedOrders = orders
    .map(orders => {


      return `
      <tr>
        <td><a href="/admin/orders/${orders.orderNo}">Order No - ${orders.orderNo} (View)</a></td>
        <td>${orders.orderDate}</td>
        <td>
          ${orders.firstName} ${orders.surname}
        </td>

        <td> £${parseFloat(orders.orderTotal / 100 * 100).toFixed(2)}
          </td>
        <td>
       ${orders.email}
        </td>
      </tr>
    `;
    })
    .join('');

  return layout({
    content: `
      <div class="control">
        <h1 class="subtitle">Orders</h1>  
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>Order No</th>
            <th>Order Date</th>
            <th>Customer</th>
            <th>Order Total</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          ${renderedOrders}
        </tbody>
      </table>
    `
  });
};
