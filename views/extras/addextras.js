const layout = require("../../views/admin/layout");

module.exports = ({ extras }) => {

  const renderedExtras = extras.products.map((product) => {
    return `
    <tr>
    <td>${product.name} </td>
    <td>
    ${product.price} 
   </td>
   <td>
   <form method="POST" action="/admin/extras/delete/${extras.id}/${product.id}">
   <button class="button is-danger">Delete</button>
   </form>
     </td>
 </tr>
    `;}).join("");


  return layout({
    content: `
      <div class="control">
        <h1 class="subtitle">${extras.title}</h1>  
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
${renderedExtras}        </tbody>
      </table>

      <form method="POST" action="/admin/extras/addProducts/${extras.id}">
      <div class="field">
        <label class="label">Product</label>
        <input class="input" placeholder="Enter Product Name" name="name">
      </div>
      <div class="field">
      <label class="label">Price</label>
      <input class="input" placeholder="Enter Product Price" name="price">
    </div>


      <button class="button is-primary">Add Product</button>
    </form>

    `,
  });
};
