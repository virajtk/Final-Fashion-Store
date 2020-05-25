require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.connect(process.env.DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

//DATABASE_URL=mongodb://localhost:27017/Subscribers

const db = mongoose.connection;

db.on("error", (error) => {
  console.error(error);
});
db.once("open", () => {
  console.log("Connected to DataBase");
});

app.use(express.json());

app.use(cors());

// Subscriber
const subscribersRouter = require("./routes/subscribers");
app.use("/subscribers", subscribersRouter);

// Admin User
const adminUserRouter = require("./routes/adminUser");
app.use("/adminUser", adminUserRouter);

// Product Category
const productCategoryRouter = require("./routes/productCategory");
app.use("/category", productCategoryRouter);

// Product

const productRouter = require('./routes/product')
app.use('/product', productRouter)

// User
const userRouter = require('./routes/users')
app.use('/user', userRouter)

// Login
const loginRouter = require("./routes/login");
app.use("/login", loginRouter );

//cart
const cartRouter = require("./routes/cart");
app.use("cart", cartRouter);

//wishlist
const wishlistRouter = require("./routes/wishlist");
app.use("wishlist", wishlistRouter);

app.listen(3000, () => {
    console.log('Server Started');

});
