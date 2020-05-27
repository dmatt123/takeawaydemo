module.exports = ({ content }) => {

    return `
      <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,300;0,400;1,100;1,200&display=swap" rel="stylesheet">
          <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" rel="stylesheet">
          <link href="/css/main.css" rel="stylesheet">
  
       
          </head>
          <header class="header-banner-checkout">
          <div class="header-banner-checkout__text-box"> Chopstix
          </div> <div class="header-banner-checkout__review">Order Confirmation</div>
  </header>
        <body>
        <div id="userNotification" class="">
        
    </div>
  
      
        <a href="/">
        <div id="containerLogo" class="container">
        </a>
        </div>
  
  
  
     
  
        
    
          </header>
  
          ${content}
  
          <footer class="footer-section">  
  <div class="footer__text-box"> </div>
  </footer>
        </body>
        <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
        <script src="/scripts/script.js"></script>
  
      </html>
    `;
  };
  