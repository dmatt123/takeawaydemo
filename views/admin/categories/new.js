const layout = require("../layout");
const { getError } = require("../../helpers");

module.exports = ({ errors }) => {
  return layout({
    content: `
    <div class="columns is-centered">
      <div class="column is-half">
        <h1 class="subtitle">Create a Category</h1>

        <form method="POST">
          <div class="field">
            <label class="label">Name</label>
            <input class="input" placeholder="Category Name" name="name">
          </div>
          
          <div class="field">
           <label class="label">Description</label>
           <input class="input" placeholder="Description" name="description">
          </div>
          <br />
          <button class="button is-primary">Create</button>
        </form>
      </div>
    </div>
  `,
  });
};
