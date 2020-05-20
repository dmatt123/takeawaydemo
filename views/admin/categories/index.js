const layout = require('../layout');

module.exports = ({ category }) => {

  //product sort by a-z
//   products.sort(function(a, b) {
//     var textA = a.title
//     var textB = b.title
//     return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
// });
//end of a-z sort
  const renderedCategories = category
    .map(category => {


      return `
      <tr>
        <td>${category.name}</td>
        <td>${category.id}</td>
        <td>
          <a href="/admin/categories/${category.id}/edit">
            <button class="button is-link">
              Edit
            </button>
          </a>
        </td>
        <td>
        <form method="POST" action="/admin/categories/${category.id}/delete">
          <button class="button is-danger">Delete</button>
        </form>
          </td>
        <td>
        <a href="/admin/categories/${category.id}/addproducts">
        <button class="button is-link"> Add Products</button>
        </a>
        </td>
      </tr>
    `;
    })
    .join('');

  return layout({
    content: `
      <div class="control">
        <h1 class="subtitle">Categories</h1>  
        <a href="/admin/categories/new" class="button is-primary">New Categories</a>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Id</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>Add/Remove Products</th>
          </tr>
        </thead>
        <tbody>
          ${renderedCategories}
        </tbody>
      </table>
    `
  });
};
