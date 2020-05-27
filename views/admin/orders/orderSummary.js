const layout = require('../layout');

module.exports = ({ order }) => {

  const renderedItems = order.cart.items
  .map((item) => { 
    let extras;
    if (!item.extras) {
      extras = ``
    } else {
      extras = `with ${item.extras[0].name}`
    }
    
    return `
      <tr>
      <td> ${item.title} ${extras}</td>
      <td> ${item.quantity} </td>
      <td> ${parseFloat(item.price / 100 * 100).toFixed(2)}</td>
      <td> ${parseFloat(item.price / 100 * 100).toFixed(2) * item.quantity}</td>
      
    </tr>


    
    `}).join('\n');

    return layout({
    content: `
      <div class="control">
        <h1 class="subtitle">Order No: ${order.orderNo}</h1>  
        <h2> Requested for ${order.deliveryTime}</h2>
      </div>
      <div class="container">
      <div class="row">
        <div class="col">
        <div> <b>First Name: </b> ${order.firstName}  </div>
        <div><b>Surname: </b>${order.surname} </div>
        <div><b>Email: </b><a href="mailto:${order.email}">${order.email}</a> </div>
        </div>
        <div class="col">
        <div><b>1st Line: </b>${order.firstLineDel} </div>
        <div><b>2nd Line: </b>${order.secondLineDel} </div>
        <div><b>Postcode: </b>${order.postcode} </div>
        </div>
        </div>

<div class="container itemSummary" style="margin-top:5%";>


         <table >
         <th> Item </th>
         <th> Quantity</th>
         <th> Item Price</th>
         <th> Total Price</th>
         
	<tbody>
		<tr>
        ${renderedItems}
		</tr>
	</tbody>

         </table>
         </div>

         <div class="container total">
         <p><b>Sub Total:</b> £${parseFloat(order.orderTotal /100 * 100).toFixed(2)}</p>
         <p><b>Discount: </b> £${parseFloat(order.discountValue / 100 * 100).toFixed(2)}</p>
         <p><b>Grand Total: </b> £${parseFloat(order.grandTotal / 100 * 100).toFixed(2)}</p>
        </div>


        </tbody>
      </table>
    `
  });
}