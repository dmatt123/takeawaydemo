const layout = require("../layout");

module.exports = ({ category, products }) => {
  products.sort(function(a, b) {
    console.log(b.position)
    var numA = parseInt(a.position)
    var numB = parseInt(b.position)
    return (numA < numB) ? -1 : (numA > numB) ? 1 : 0;
}); 

  const inCat = products.filter((product) =>
    product.categories.includes(category.id)
  );
  const notInCat = products.filter(
    (product) => !product.categories.includes(category.id)
  );

  const prodsNotInCat = notInCat.map((product) => {
    return `
    <tr>
    <td>${product.title} </td>
    <td>
    <form method="POST" action="/admin/categories/${category.id}/addProducts">
       <button hidden value="${product.id}" class="button is-link" name="productId">
         Add
       </button>
     </a>
   </td>
   </form>
   <td>

     </td>
 </tr>
    `;}).join("");

  const prodsInCat = inCat
    .map((product) => {
      return `
      <tr>
        <td>${product.title} </td>

  
        <td>
        <form method="POST" action="/admin/categories/delete/${category.id}">
          <button hidden value="${product.id}" class="button is-danger" name="productIdDelete">Remove</button>
        </form>
          </td>
          <td>
          <form method="POST" action="/admin/categories/changeRank/${category.id}">
           <input class="field" value="${product.position}" name="changeRank">  
          <button hidden value="${product.id}" class="button is-link" name="productIdChangeRank">Update</button>
        </form> </td>
      </tr>
    `;
    })
    .join("");

  return layout({
    content: `
      <div class="control">
        <h1 class="subtitle">${category.name}</h1>  
        <a href="/admin/categories/new" class="button is-primary">New Categories</a>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Add</th>
          </tr>
        </thead>
        <tbody>
          ${prodsNotInCat}
        </tbody>
      </table>

      <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Remove</th>
          <th>Rank</th>
        </tr>
      </thead>
      <tbody>
        ${prodsInCat}
      </tbody>
    </table>

    `,
  });
};
