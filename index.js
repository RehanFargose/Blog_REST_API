import express from "express";
import bodyParser from "body-parser";
import cors from "cors";


const app = express();
const port = 4000;


// In-memory data store
let posts = [
  {
    id: 1,
    title: "The Rise of Decentralized Finance",
    content:
      "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
    author: "Alex Thompson",
    date: "2023-08-01T10:00:00Z",
  },
  {
    id: 2,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    content:
      "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
    author: "Mia Williams",
    date: "2023-08-05T14:30:00Z",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: "Samuel Green",
    date: "2023-08-10T09:15:00Z",
  },
];

let lastId = 3;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());

//Write your code here//

//CHALLENGE 1: GET All posts
app.get("/posts", (req, res)=>{
  // Send the posts as a json to the main server, which in turn will use them for display on the website
  res.json(posts);
});



//CHALLENGE 2: GET a specific post by id
app.get("/posts/:id", (req,res)=>{
  // Extract data received from params
  const target_id = parseInt(req.params.id);

  console.log("The specific post id is: "+target_id); 
  
  // iterate through the posts array as the post item, and check whether the index matches 
  var specificPost = posts.find((post) => post.id === target_id);
  console.log(specificPost);

  // Send back the specific required post as the response
  res.json(specificPost);

});


//CHALLENGE 3: POST a new post
app.post("/posts", (req, res)=>{
  // Increment 1st and then assign
  var newID = ++lastId;
  var newTitle = req.body.title;
  var newContent = req.body.content;
  var newAuthor = req.body.author;
  // var newDate = req.body.date;
  var newDate = new Date();


  // Create an object holding the new post
  var newPost =   {
    id: newID,
    title: newTitle,
    content: newContent,    
    author: newAuthor,
    date: newDate,
  };


  // Add this new post object to the posts list
  posts.push(newPost);
  console.log(posts);

  // Send back the updated posts list as a repsonse that includes the newly added post
  res.json(posts);
});



//CHALLENGE 4: PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res)=>{
  const target_id = parseInt(req.params.id);

  // Get the changed stuff like below parametersthings
  var changedTitle = req.body.title;
  var changedContent = req.body.content;
  var changedAuthor = req.body.author;
  const date = new Date();

  // Find existing post
  const existingPost = posts.find((post) => post.id === target_id);

  // Create an object holding the new post
  var changedPost =   {
    id: target_id,
    title: changedTitle || existingPost.title,
    content: changedContent || existingPost.content,    
    author: changedAuthor || existingPost.author,
    date: date,
  };


  // Find the post to be replaced via its id
  const searchIndex = posts.findIndex((post)=> post.id === target_id);
  // Replace the joke
  posts[searchIndex] = changedPost;
  console.log("Post has been changed(PATCH)");

  console.log(posts);

  // Send back the updated posts list as a repsonse that includes the newly added post
  res.json(posts);
});



//CHALLENGE 5: DELETE a specific post by providing the post id.
app.delete("/posts/:id", (req, res)=>{
  // Get the post id which will be used to find and delete the post
  const target_id = parseInt(req.params.id);

  // Find the post to be replaced via its id
  const searchIndex = posts.findIndex((post)=> post.id === target_id);

  console.log(posts);

  // Delete the post using splice
  // If post exists only then delete it
  if (searchIndex > -1) { // only splice array when item is found
    posts.splice(searchIndex, 1); // 2nd parameter(1) means remove one item only
    console.log("Post with id" + target_id+" has been deleted(DEL)");
    console.log("Posts List length after delete: "+ posts.length);
    // Return a json as the response 
    // Send back the updated posts list as a repsonse that includes the newly added post
    res.json(posts);
  }else{
    // If post does not exist send back some json and error code
    res.status(404).json({error: "Post with id "+target_id+" not found, Nothing Deleted"});
  }

});



app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
