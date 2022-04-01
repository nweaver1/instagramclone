import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import rosie from "./pictures/rosie.PNG";
import turtle from "./pictures/Turtle.webp";
import images from "./pictures/images.jpg";

// If localStorage is empty, we populate it with some basic comments!
// Deleting localStorage and then refreshing is the easiest way to reset the comments.
if (localStorage.length === 0) {
  let mauriceId = "mauriceS" + Date.now() + Math.random(0, 255);
  let ryanId = "ryanlen" + Date.now() + Math.random(0, 255);
  let laurenId = "lorco" + Date.now() + Math.random(0, 255);
  let laurenReplyId = ("lorco" + Date.now() + Math.random(0, 255));

  localStorage.setItem(mauriceId, JSON.stringify({
    user: "mauriceS",
    content: "I gotta go next time!!!",
    date: Date.now(),
    picture: images,
    postId: (mauriceId),
    likes: 99,
    replies: [laurenReplyId],
    liked: false,
    parent: true
  }));

  localStorage.setItem(ryanId, JSON.stringify({
    user: "ryanlen",
    content: "Nice.",
    date: Date.now(),
    picture: turtle,
    postId: (ryanId),
    likes: 0,
    replies: [],
    liked: false,
    parent: true
  }));

  localStorage.setItem(laurenId, JSON.stringify({
    user: "lorco",
    content: "Amazing!!!",
    date: Date.now(),
    picture: rosie,
    postId: laurenId,
    likes: 42,
    replies: [],
    liked: false,
    parent: true
  }));

  localStorage.setItem(laurenReplyId, JSON.stringify({
    user: "lorco",
    content: "Me too!!!",
    date: Date.now(),
    picture: rosie,
    postId: laurenReplyId,
    likes: 12,
    replies: [],
    liked: false,
    parent: false,
    parentId: mauriceId
  }));
}

// Render the app.
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Add an event listener to close the modal when we click off of it.
let fullModal = document.getElementById("Landscape-background");
window.onclick = function(event) {
  if (event.target === fullModal) {
    fullModal.style.display = "none";
  }
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
