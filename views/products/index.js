const layout = require('../layout');

module.exports = ({ products,category, cartId, extras }) => {
  
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

    currentItem.price = parseFloat((currentItem.price * 100) / 100).toFixed(2)



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

  if (currentItem.extras.length > 0) {
    ctaBtn = `   <button onclick=getExtras("${cartId}","${currentItem.id}","${currentItem.extras}") class="btnAddtoCart">
    +
    </button>`
  } else {
    
    ctaBtn = `<button onclick=addtoCart("${cartId}","${currentItem.id}") class="btnAddtoCart">
    +
    </button> `
  }
    data+= `    
      <div class="product">
    <h4 class="productName">${currentItem.title} ${spice}



    </h4> 
    <div class="orderDetail">          
     <p class="priceElement">£${currentItem.price}</p>

${ctaBtn}
            </button>

            </div>             <p class="productDesc"> ${currentItem.description}</p>  
            
            </div>
            `
  } 
  }


  return layout({
    content: `
      

      <section id="sectionMenu">
      <div class="cart"> <div onclick=minCart() id="cartMinimize"> x </div>  <h4 class="cartHeading">Your Order </h4>
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

      <div class="modal-overlay" id="modal-overlay"></div>

<div id="modal" id="modal">
  <div class="modal-guts">
    <h1 id="extrasHeading"></h1>
    <p id="extraContent"> </p>
  </div>
</div>

<div id="cartMobile" onclick=maxCart()> </div>


    `
  });
};
