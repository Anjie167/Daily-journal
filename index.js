const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Arcu risus quis varius quam quisque id diam vel. Feugiat scelerisque varius morbi enim. Duis convallis convallis tellus id interdum velit. Molestie a iaculis at erat pellentesque adipiscing commodo elit. In nisl nisi scelerisque eu ultrices vitae auctor. Ultrices eros in cursus turpis massa. Egestas maecenas pharetra convallis posuere. Lorem ipsum dolor sit amet. Risus at ultrices mi tempus imperdiet nulla. Odio euismod lacinia at quis risus.!";

const aboutContent = "Is tWe use cookies to customise and improve the content shown to you, making sure you'll get the best online shopping experience. By clicking Accept All Cookies, we can continue to deliver personalised offers and inspiration, based on the things you like. If you prefer, you can choose to continue with Only Required Cookies. But, keep in mind that blocking some types of cookies may impact how we can deliver tailored content that you might like.";

const contactContent = "If you want to learn more about cookies and why we use them, visit our Cookie Policy page anytime., click here and share them with all your young friends. Have an enjoyable time!";

const app = express();
let posts = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:  true}));

app.use(express.static("public"));

app.get("/", function(req, res){
    res.render("home", {homeStartingContent: homeStartingContent, posts: posts});
});

app.get("/aboutUs", function(req, res){
    res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
    res.render("contact", {contactContent: contactContent});
});

app.get("/posts/:topic", function(req, res){


    posts.forEach(element => {
        var matchCount = 0;
        if(_.lowerCase(element.title) === _.lowerCase(req.params.topic)){
            matchCount++;
        }
        if(matchCount>=1){
            console.log( matchCount + " " + "Match(s) Found!"); 
        }else{
            console.log("No Match Found!"); 
        }

        if(_.lowerCase(element.title) === _.lowerCase(req.params.topic)){
            res.render("post", {
                title: element.title, 
                content: element.body
            });
        }      
     });
   
});

app.get("/compose", function(req, res){
    res.render("compose");
});
app.post("/compose", function(req, res){
   post = {
        title: req.body.postTitle,
        body: req.body.postBody
    };
    posts.push(post);

res.redirect("/");
});












app.listen(3000, function(){
    console.log("Service started on port 3000");
});