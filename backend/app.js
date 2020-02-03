const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Post = require("./models/post");

const dbUrl =
  "mongodb+srv://alex:BLsrIf6aybmNEltd@cluster0-8mt2s.mongodb.net/node_angular?retryWrites=true&w=majority";
const myPwd = "BLsrIf6aybmNEltd";
const app = express();

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
  })
  .then(() => {
    console.log("connected to the DB");
  })
  .catch(() => {
    console.log("Failed to connect");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST,PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content
  });

  post.save().then(createdPost => {
   
    res.status(201).json({
      message: "Post added successfully",
      postID: createdPost._id
    });
  });
});





app.get("/api/posts", (req, res, next) => {
  Post.find()
  .then(documents => {
    console.log(documents);
    
    res.status(200).json({
      message: "Posts fetched successfully!",
      posts: documents
    })
    .catch(err => {
      console.log(err);
    });
  });
});

app.put("/api/posts/:id", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.connect
  });
  Post.updateOne({_id: req.params.id}, post).then(result => {
    console.log(result);
    res.status(200).json({message: "Update succesfull!"});
  })
}) 

app.delete("/api/posts/:id", (req,res,next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
   console.log(result) 
   res.status(200).json({message: 'Post deleted!'})
  })
})

module.exports = app;
