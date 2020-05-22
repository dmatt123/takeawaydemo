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



            <br />
            <button class="button is-primary">Edit</button>
          </form>
        </div>
      </div>
    `,
  });
};
