const layout = require("../layout");
const { getError } = require("../../helpers");

module.exports = ({ category, errors }) => {
  return layout({
    content: `
      <div class="columns is-centered">
        <div class="column is-half">
          <h1 class="subtitle">Edit a Product</h1>

          <form method="POST">
            <div class="field">
              <label class="label">Title</label>
              <input value="${
                category.name
              }" class="input" placeholder="Name" name="name">
            </div>

            <div class="field">
            <label class="label">Description</label>
            <input value="${
              category.description
            }" class="input" placeholder="description" name="description">
          </div>
            

          <div class="field">
          <label class="label">Meta Title</label>
          <input value="${
            category.metatitle
          }" class="input" placeholder="Meta Title" name="metatitle">
        </div>
          
        <div class="field">
        <label class="label">Meta Description</label>
        <input value="${
          category.metadescription
        }" class="input" placeholder="Meta Description" name="metadescription">
      </div>
        
      <div class="field">
      <label class="label">Category Url</label>
      <input value="${
        category.categoryUrl
      }" class="input" placeholder="Product URL" name="categoryUrl">
    </div>
      



            <br />
            <button class="button is-primary">Edit</button>
          </form>
        </div>
      </div>
    `,
  });
};
