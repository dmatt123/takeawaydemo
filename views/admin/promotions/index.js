const layout = require('../layout');

module.exports = ({ promotions }) => {

  //product sort by a-z
//   products.sort(function(a, b) {
//     var textA = a.title
//     var textB = b.title
//     return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
// });
//end of a-z sort
  const renderedPromos = promotions
    .map(promo => {


      return `
      <tr>
        <td>${promo.code}</td>
        <td>${promo.type}</td>
        <td>${promo.discount}</td>
        <td>
        <form method="POST" action="/admin/promos/${promo.id}/delete">
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
        <h1 class="subtitle">Promotions</h1>  
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>Code</th>
            <th>Type</th>
            <th>Discount</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          ${renderedPromos}
        </tbody>
      </table>

      <h1 class="subtitle">Add a New Promo</h1>

      <form method="POST" action="/admin/promos/new/create">
      <div class="field">
        <label class="label">Code</label>
        <input class="input" placeholder="Enter Discount Code" name="code">
      </div>
      
      <div class="field">
      <label class="label">Discount Type: </label>
      <select id="spice" name="type">
        <option value="%">% - Percentage off</option>
        <option value="£">£ - Value off</option>
      </select>


      <div class="field">
      <label class="label">Discount Value</label>
      <input class="input" placeholder="Discount" name="discount">
    </div>

      <br />
      <button class="button is-primary">Create Promotion</button>
    </form>
  </div>
    `
  });
};
