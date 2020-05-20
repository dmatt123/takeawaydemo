const layout = require("../layout");
const { getError } = require("../helpers");

module.exports = ({ errors, categories }) => {
    const cats = categories.map(categories => {
        return `
        <a class="navbar-item" href="/department/${categories.categoryUrl}">
        ${categories.name}</a>`
     
      }).join('\n')
  return layout({
      links: `${cats}`,
    content: `
    <div class="columns is-centered">
      <div class="column is-half">
        <h1 class="subtitle">Delivery Details</h1>

        <form method="POST">

          <div class="field">
            <label class="label">First Name</label>
            <input class="input" placeholder="First Name" name="firstName">
          </div>

          <div class="field">
          <label class="label">Surname</label>
          <input class="input" placeholder="Surname" name="surname">
        </div>

        <div class="field">
        <label class="label">Email</label>
        <input class="input" placeholder="Email" name="email">
      </div>
          
          <div class="field">
           <label class="label">1st Line of Address</label>
           <input class="input" placeholder="1st Line of Address" name="firstLineDel">
          </div>

          <div class="field">
          <label class="label">2nd Line of Address</label>
          <input class="input" placeholder="2nd Line of Address" name="secondLineDel">
         </div>

          <div class="field">
          <label class="label">Postcode</label>
          <input class="input" placeholder="Postcode" name="postcode">
         </div>

         <div class="field">
         <label class="label">Telephone Number</label>
         <input class="input" placeholder="Tel No." name="telNumber">
        </div>
          
          <br />
          <button class="button is-primary">Complete Order</button>
        </form>
      </div>
    </div>
  `,
  });
};
