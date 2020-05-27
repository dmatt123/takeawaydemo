const layout = require("../layout");
const { getError } = require("../../helpers");

module.exports = ({ product, errors, extras }) => {
  const renderedExtras = extras
  .map(extra => {
    return `
    <option value="${extra.id}">${extra.title}</option> `
  }).join('');


  return layout({
    content: `
      <div class="columns is-centered">
        <div class="column is-half">
          <h1 class="subtitle">Edit a Product</h1>

          <form method="POST" enctype="multipart/form-data">
            <div class="field">
              <label class="label">Title</label>
              <input value="${
                product.title
              }" class="input" placeholder="Title" name="title">
              <p class="help is-danger">${getError(errors, "title")}</p>
            </div>
            
            <div class="field">
              <label class="label">Price</label>
              <input value="${
                product.price
              }" class="input" placeholder="Price" name="price">
              <p class="help is-danger">${getError(errors, "price")}</p>
            </div>
            
            <div class="field">
            <label class="label">Description</label>
            <input value="${
              product.description
            }" class="input" placeholder="Description" name="description">
          </div>

    <div class="field">
    <label class="label">Spice indicator:</label>
    <select id="spice" name="spice" value="1">
      <option value="none">N/A</option>
      <option value="spice1">1</option>
      <option value="spice2">2</option>
      <option value="spice3">3</option>
    </select>
      </div>

      <div class="field">
      <label class="label">Extras Category:</label>
      <select id="extras" name="extras">
        <option value="">N/A</option>
       ${renderedExtras}
      </select>
</div>

            <button class="button is-primary">Edit</button>
          </form>
        </div>
      </div>
    `,
  });
};
