const express = require("express");
const app = express();
const path = require("path")
const connectDB = require("./config/db")
const cookieParser = require("cookie-parser")
const dotenv = require("dotenv");
const isValidated = require("./middleware/isValidate")
const isAuthenticated = require("./middleware/isAuthencate");
const {signup, login, logout} = require("./controllers/userLogin.controller");

dotenv.config();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

app.get("/login",isAuthenticated, (req, res) => {
  res.render("login");
});

app.get("/signup",isAuthenticated, (req,res)=>{
  res.render("signup")
})

app.post("/login", login);

app.post('/signup', signup );

app.get("/logout", logout); 

app.get("/home",isValidated,(req,res)=>{
  res.send("Home page")
})

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server Running at http://localhost:" + PORT);
    });
  })
  .catch(err => {
    console.error("Database connection error:", err);
  });




