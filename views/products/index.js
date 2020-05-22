const layout = require('../layout');

module.exports = ({ products,category, cartId }) => {
  
  const addtoCart = `addtoCart("${cartId}")`
  let data = ""
  let currentItem

  for (cat of category) {
    data+= `<h2 class="categoryTitle">${cat.name}</h2>
            <h4 class="categoryDesc">${cat.description}</h4>`
  for (prod of cat.products) {
    currentItem = products.find(
      (item) => item.id == prod.id
      
    );

    let spice = ``;

    if (currentItem.spice == "spice1") {
      spice = `<i class="fas fa-pepper-hot"></i>` }
    else if (currentItem.spice == "spice2") {
      spice = `<i class="fas fa-pepper-hot"></i><i class="fas fa-pepper-hot"></i>`
    } else if (currentItem.spice == "spice3") {
      spice = `<i class="fas fa-pepper-hot"></i><i class="fas fa-pepper-hot"></i><i class="fas fa-pepper-hot"></i>`
    } else {
    spice = ``
  }

    data+= `    
      <div class="product">
    <h4 class="productName">${currentItem.title} ${spice}



    </h4> 
    <div class="orderDetail">          
     <p class="priceElement">£${currentItem.price}</p>

    <button onclick=addtoCart("${cartId}","${currentItem.id}") class="btnAddtoCart">
            +
            </button>

            </div>             <p class="productDesc"> ${currentItem.description}</p>
            </div>
            `
  } 
  }


  return layout({
    content: `
      

      <section id="sectionMenu">
      <div class="cart"> <h4 class="cartHeading">Your Order</h4>
      <p class="cartDetail"></p>
</div>
                <div class="container menu">
                <div class="row">

                ${data}
              
        <p></p>
        </div>
        </div>
        </div>


      </section>
      <body onload=getCart("${cartId}")


    `
  });
};
