const layout = require('../layout');

module.exports = ({ products, categories, query }) => {
  
  const cats = categories.map(categories => {



    return `
    <a class="navbar-item" href="/department/${categories.categoryUrl}">
    ${categories.name}</a>`
 
  }).join('\n')
  const renderedProducts = products
    .map(product => {
      let rrpSaveCalc = Math.round((product.RRP - product.price) / product.RRP * 100)
      let rrpFormat = (Math.round(product.RRP * 100) / 100).toFixed(2)
      let priceFormat = (Math.round(product.price * 100) / 100).toFixed(2)

   
      return `
      <div class="col-lg-3 col-sm-12" align="center">
      <a href="/products/${product.productUrl}">
        <img class="productImg", src="data:image/png;base64, ${product.image}" /> </a>
      
      <a href="/products/${product.productUrl}"> <h3 class="productTitle">${product.title}</h3> </a>
        <div class="priceDetail">
      <p class="saveCalc">SAVE ${rrpSaveCalc}%</p>
        <b>WAS:</b></i><strike> £${rrpFormat}</strike>
        <b>NOW:</b><h5>£${priceFormat}</h5>
     </div>
</div>     
      `;
    })
    .join('\n');

  return layout(
    {links: `${cats}`,
    content: `
    <head>

    <section>
    <div class="container">
    <h4><div class="queryTitle"> Search for '${query}' returned ${products.length} products</div> </h4>

                        <div class="container">
            <div class="row">
              ${renderedProducts}  
       </div>
      </div>
    </div>
  </section>
      
    `
  });
};
