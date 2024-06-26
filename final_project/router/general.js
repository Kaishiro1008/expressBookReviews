const express = require('express');
const axios = require("axios");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username)=>{
    let userswithsamename = users.filter((user)=>{
      return users.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
}

public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (!doesExist(username)) {
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  }
  return res.status(404).json({message: "Unable to register user."});
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    //Write your code here
    res.send(JSON.stringify(books,null,4));
    //return res.status(300).json({message: "Yet to be implemented"});
  });

// Function to get the book list available in the shop
function GetBooks() {
    axios.get('http://localhost:5000/')
    .then(response => {
        console.log(response)
    })
    .catch(error => {
        console.error('Error fetching books:', error)
    })
};

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(JSON.stringify(books[isbn],null,4));
  //return res.status(300).json({message: "Yet to be implemented"});
 });

function GetBookByISBN(isbn) {
    axios.get(`http://localhost:5000/isbn/${isbn}`)
    .then(response => {
        console.log(response)
    })
    .catch(error => {
        console.error('Error fetching books:', error)
    })
};

// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  let result = new Object;
  for (let isbn in books) {
    if (books[isbn]["author"] === author){
        result[isbn] = books[isbn]
    };
  }
  res.send(JSON.stringify(result,null,4))
  //return res.status(300).json({message: "Yet to be implemented"});
});

function GetBookByAuthor(author) {
    axios.get(`http://localhost:5000/author/${author}`)
    .then(response => {
        console.log(response)
    })
    .catch(error => {
        console.error('Error fetching books:', error)
    })
};

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  let result = new Object;
  for (let isbn in books) {
    if (books[isbn]["title"] === title){
        result[isbn] = books[isbn]
    };
  }
  res.send(JSON.stringify(result,null,4))
  //return res.status(300).json({message: "Yet to be implemented"});
});

function GetBookByTitle(title) {
    axios.get(`http://localhost:5000/title/${title}`)
    .then(response => {
        console.log(response)
    })
    .catch(error => {
        console.error('Error fetching books:', error)
    })
};

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  res.send(JSON.stringify(books[isbn]["reviews"],null,4));
  //return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
