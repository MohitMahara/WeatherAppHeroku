const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const port = 8000;
const staticPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname , "../templates/views");
const partialsPath = path.join(__dirname , "../templates/partials");


app.set("view engine", "hbs");
app.set("views" , viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(staticPath));


app.get("" , (req, res) =>{
   res.render('index');
})

app.get("/about", (req, res) =>{
    res.render('about');
})


app.get("/weather", (req, res) =>{
    res.render('weather');
})

app.get("*" , (req, res) =>{
  res.render('404error');
});


app.listen( port , () =>{
    console.log(`listening to the port at ${port}`)
})