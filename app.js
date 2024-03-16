//---------SETUP CODE----------//
//importing essential modules
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//using express application
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//---------------------LOGICAL--------------------------//

//MongoDB logic
//connecting/creating to a new database in monogodb on port27027
mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser:true});
//creating schema based on the data to store
const itemsSchema = {
  name: String
};
//creting model to get the data of schema type mentioned
const Item = mongoose.model("Item",itemsSchema);

//creting documents in collection Items(table)
const item1 = new Item({
  name: "Welcome to your todoList!"
});
const item2 = new Item({
  name: "Hit the + button to add a new item"
});
const item3 = new Item({
  name: "<---- hit this to delete an item"
});

const defaultItems = [item1,item2,item3];           //array

//Inserting into Items collection in database
mongoose.connection.once('open', function() {
  console.log('Connected to MongoDB');

  // Insert default items once connected
  Item.insertMany(defaultItems);
});

app.get("/", function(req, res) {

  res.render("list", {listTitle: "Today", newListItems: items});

});

app.post("/", function(req, res){

  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
