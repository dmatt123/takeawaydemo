const layout = require("../layout");
const { getError } = require("../../helpers");

module.exports = ({ product, errors }) => {
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
            <label class="label">RRP</label>
            <input value="${
              product.RRP
            }" class="input" placeholder="RRP" name="RRP">
            <p class="help is-danger">${getError(errors, "price")}</p>
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
          <label class="label">Meta Title</label>
          <input value="${
            product.metatitle
          }" class="input" placeholder="Meta Title" name="metatitle">
        </div>
          
        <div class="field">
        <label class="label">Meta Description</label>
        <input value="${
          product.metadescription
        }" class="input" placeholder="Meta Description" name="metadescription">
      </div>

      <div class="field">
      <label class="label">Colour</label>
      <input value="${
        product.colour
      }" class="input" placeholder="Colour" name="colour">
    </div>
      
        
      <div class="field">
      <label class="label">Product Url</label>
      <input value="${
        product.productUrl
      }" class="input" placeholder="Product URL" name="productUrl">
    </div>
      


            <div class="field">
              <label class="label">Image</label>            
              <input type="file" name="image" />
            </div>
            <br />
            <button class="button is-primary">Edit</button>
          </form>
        </div>
      </div>
    `,
  });
};
