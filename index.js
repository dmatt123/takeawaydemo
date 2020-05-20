const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const fs = require("fs");
const moment = require("moment");
const flash = require('express-flash-messages')

const authRouter = require("./routes/admin/auth");
const adminProductsRouter = require("./routes/admin/products");
const productsRouter = require("./routes/products");
const cartsRouter = require("./routes/carts");
const categoryRouter = require("./routes/admin/category");
const ordersRouter = require("./routes/admin/orders");
const promosRouter = require("./routes/admin/promotions")

const app = express();
app.use(flash())


app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  cookieSession({
    keys: ["jhgjg8855ghjgrt456789"],
  })
);

app.use(authRouter, adminProductsRouter, productsRouter, cartsRouter, categoryRouter, ordersRouter, promosRouter);

const http = require('http');

const port = 8000;

const server = http.createServer(app);

server.listen(8000, () => {
    console.log('App is listening on port 8000!')
  });

  // server.listen(process.env.PORT, process.env.IP, () => {
  //   console.log('App has started')
  // });
