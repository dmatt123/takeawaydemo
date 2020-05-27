const layout = require('../../views/admin/layout');

module.exports = ({ extras }) => {

  //product sort by a-z
//   products.sort(function(a, b) {
//     var textA = a.title
//     var textB = b.title
//     return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
// });
//end of a-z sort
  const renderedExtras = extras
    .map(extra => {


      return `
      <tr>
        <td>${extra.title}</td>
        <td>
        <a href="/admin/extras/addExtras/${extra.id}">
          <button class="button is-link">
            Add/Remove Extras
          </button>
        </a>
      </td>
        <td>
          <a href="/admin/extras/${extra.id}/edit">
            <button class="button is-link">
              Edit
            </button>
          </a>
        </td>
        <td>
        <form method="POST" action="/admin/extras/delete/${extra.id}">
          <button class="button is-danger">Delete</button>
        </form>
          </td>
      </tr>
    `;
    })
    .join('');

  return layout({
    content: `
      <div class="control">
        <h1 class="subtitle">Extras</h1>  
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Add/Remove Extras</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          ${renderedExtras}
        </tbody>
      </table>

      <form method="POST" action="/admin/extras/create/newExtra">
      <div class="field">
        <label class="label">Extra Category Title</label>
        <input class="input" placeholder="Enter Title for Extra Category" name="title">
      </div>

      <button class="button is-primary">Create Extra Category</button>
    </form>
    `
  });
};
