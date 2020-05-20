const layout = require("../layout");

module.exports = ({ product, category }) => {
  const cats = category
    .map((category) => {
      return `
    <a class="navbar-item" href="/department/${category.categoryUrl}">
    ${category.name}</a>`;
    })
    .join("\n");

  let rrpSaveCalc = Math.round(
    ((product.RRP - product.price) / product.RRP) * 100
  );
  let rrpFormat = (Math.round(product.RRP * 100) / 100).toFixed(2);
  let priceFormat = (Math.round(product.price * 100) / 100).toFixed(2);

  const renderedProducts = `

  <div class="container">
  <div class="row">
    <div class="col-lg-6 col-sm-12 img">
    <img class="productImgPDP", src="data:image/png;base64, ${product.image}" /> </a>
    </div>
    <div class="col-lg-6 col-sm-12 detail">
    <div class="title"> ${product.title} </div>
    <div class="rrp"><b>RRP: </b>£${rrpFormat} </div>
    <div class="priceElement"><b>NOW: </b>£${priceFormat} </div>
    <div class="saving"><b>SAVE ${rrpSaveCalc}%</div></b>
    <div class="description"><b>Product Description: </b> <p> ${product.description} </p>
    <form action="/cart/products/" method="POST">
    <input hidden value="${product.id}" name="productId" /> 
      <button class="button has-icon is-inverted">
        <i class="fa fa-shopping-cart"></i>  Add to cart
      </button>
    </form>
    </div>
    </div>
  </div>
    
       
     
     
  
           
             

            
              
          
      `;

  return layout({
    links: `${cats}`,
    content: `
      <section class="banner">
        <div class="container">
          <div class="columns is-centered">
            <img src="/images/banner.jpg" />
          </div>
        </div>
      </section>
      
      <section>
                     <div class="columns products">
                  ${renderedProducts}  
           
            <div class="column "></div>
          </div>
        </div>
      </section>
    `,
  });
};
