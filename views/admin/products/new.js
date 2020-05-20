const layout = require("../layout");
const { getError } = require("../../helpers");

module.exports = ({ errors }) => {
  return layout({
    content: `
    <div class="columns is-centered">
      <div class="column is-half">
        <h1 class="subtitle">Create a Product</h1>

        <form method="POST" enctype="multipart/form-data">
          <div class="field">
            <label class="label">Title</label>
            <input class="input" placeholder="Title" name="title">
            <p class="help is-danger">${getError(errors, "title")}</p>
          </div>
          
          <div class="field">
            <label class="label">Price</label>
            <input class="input" placeholder="Price" name="price">
            <p class="help is-danger">${getError(errors, "price")}</p>
          </div>

          <div class="field">
          <label class="label">RRP</label>
          <input class="input" placeholder="RRP" name="RRP">
        </div>

          <div class="field">
           <label class="label">Description</label>
           <input class="input" placeholder="Description" name="description">
          </div>

          <div class="field">
          <label class="label">Meta Title</label>
          <input class="input" placeholder="Meta Title" name="metatitle">
         </div>

         <div class="field">
         <label class="label">Meta Description</label>
         <input class="input" placeholder="Meta Description" name="metadescription">
        </div>
          
          <div class="field">
            <label class="label">Image</label>            
            <input type="file" name="image" />
          </div>
          <br />
          <button class="button is-primary">Create</button>
        </form>
      </div>
    </div>
  `,
  });
};
