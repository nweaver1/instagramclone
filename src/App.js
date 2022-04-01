import React from 'react';
import './App.css';
import './Post.css';
import coat from "./pictures/coat.jpg";

// Defines the basic portrait view for the app.
function App() {
  return (
    <div className="App">
      <div id="Post-block">
        <div id="Post-header">
          <img id="User-picture" src={require("./pictures/mainUser.webp")} alt="Poster Icon"></img>
          <section id="User-info">
            <p id="User-name"><b>Nicholas Weaver</b></p>
            <p id="User-location">Murrieta, California</p>
          </section>
          <button className="P-button" id="Post-Options">...</button>
        </div>

        <img id="Post-content" src={require("./lakebg.jpeg")} alt="Beautiful Lake Post"></img>

        <section id="Post-footer">
          <PostButtons/>

          <section id="Post-info">
            <p id="Post-likes"><b>54 Likes</b></p>
            <p id="Post-description"><b>Nicholas Weaver</b>&nbsp;{"Beautiful skies!"}</p>
            <button className="P-button Inset-text" id="Comment-view-button" onClick={openModal}>View all {localStorage.length} comments...</button>
          </section>

          <div id="Comments-section">
            <br></br>
            <section id="Comments-display">
              <PreviewComments />
            </section>
            <p className="Inset-text"id="Posted-time">Posted 14 hours ago...</p>
            <form id="Comment-add" onSubmit={function () {
              submitPost("Comment-create", ("merryB" + Date.now() + Math.random(0, 255)));
              }}>
              <input id="Comment-create" placeholder='Add a comment...'>
              </input>
              <button className="P-button" id="Comment-create-button">Post</button>
            </form>
            
          </div>

          <LandscapeApp/>

        </section>
      </div>
    </div>
  );
}

// Helper function to toggle our Landscape view.
function openModal() {
  document.getElementById("Landscape-background").style.display = "block";
}

// Defines the fullscreen Landscape view. Will be hidden by default and toggled visible when the user clicks
// the "View all # comments" button.
function LandscapeApp() {
  return (
    <div id="Landscape-background">
    <div id="Landscape-container">
      <div id="Landscape-image">
        {/* <img id="Post-content" className="Landscape-content" src={require("./lakebg.jpeg")}></img> */}
      </div>
      <div id="Landscape-others">
        <div id="Post-header">
          <img id="User-picture" src={require("./pictures/mainUser.webp")} alt="Poster Icon"></img>
          <section id="User-info">
            <p id="User-name"><b>Nicholas Weaver</b></p>
            <p id="User-location">Murrieta, California</p>
          </section>
          <button className="P-button" id="Post-Options">...</button>
        </div>

        <div id="Comments-section">
              <br></br>
              <section id="Comments-display">
                <div id="Post-description">
                  <img id="User-comment-picture" src={require("./pictures/mainUser.webp")} alt="Poster Icon"></img>
                  <p id="Post-description"><b>Nicholas Weaver &nbsp;</b>{"Beautiful skies!"}</p>
                </div>
                <LandscapeComments comments={JSON.parse(localStorage.getItem("comments"))} replies={false}/>
              </section>
        </div>
        <div id="Landscape-footer">
          <PostButtons/>
          <section id="Post-info">
            <p id="Post-likes"><b>54 Likes</b></p>
          </section>
          <p className="Inset-text"id="Posted-time">Posted 14 hours ago...</p>
          <form id="Comment-add" onSubmit={function () {
            handleReply(document.getElementById("Comment-create-landscape").getAttribute("data-replyparent"), 
            document.getElementById("Comment-create-landscape").getAttribute("data-replyatuser"));
          }}>
              <input id="Comment-create-landscape" placeholder='Add a comment...' data-replyparent="" data-replyatuser="">
              </input>
              <button className="P-button" id="Comment-create-button">Post</button>
          </form>
        </div>
      </div>
    </div>
    </div>
    
  );
}

// Basic Component for the four post buttons.
function PostButtons() {
  return(
    <section id="Post-buttons">
        <button className="P-button" id="Post-like-button" >
          <img src={require("./icons/like.PNG")} alt="Like Post"></img>
        </button>
        <button className="P-button" id="Post-comment-button">
          <img src={require("./icons/chat.PNG")} alt="Chat Button"></img>
        </button>
        <button className="P-button" id="Post-share-button">
          <img src={require("./icons/send.PNG")} alt="Send Button"></img>
        </button>
        <button className="P-button" id="Post-save-button">
          <img src={require("./icons/save.PNG")} alt="Save Post"></img>
        </button>
      </section>
  )
}

// Component for the basic preview comments. Just displays the user and their comment and the like button.
class PreviewComment extends React.Component {
  constructor(props) {
    super(props)
    this.data = props["data"];
    this.state = { image: require( this.data.liked ? ("./icons/liked.PNG"):("./icons/like.PNG")) }
    this.likeInteraction = this.likeInteraction.bind(this);
  }

  // Interact with the like button. Will flip the current state of your like on the post.
  likeInteraction() {
    let comment = JSON.parse(localStorage.getItem(this.data.postId));
    if (comment.liked) {
      comment.liked = false;
      comment.likes -= 1;
      localStorage.setItem(this.data.postId, JSON.stringify(comment));

      // Use the components setState function in order to signal a re-render and update the like image.
      this.setState( {
        image: require("./icons/like.PNG")
      });
      
      this.data = comment;
    }
    else {
      comment.liked = true;
      comment.likes += 1;
      localStorage.setItem(this.data.postId, JSON.stringify(comment));

      // Use the components setState function in order to signal a re-render and update the like image.
      this.setState( {
        image: require("./icons/liked.PNG")
      });

      this.data = comment;
    }
  }
  
  render() {
    return (
      <li className="Preview-comment" id={this.data.postId} key={this.data.postId}>
        <p className="Comment-poster"><b>{this.data.user} &nbsp; </b></p>
        <p className="Comment-content">{this.data.content}</p>
        <button className="Comment-like" onClick={this.likeInteraction}>
          <img src={this.state.image} alt="Like Comment Button"></img>
        </button>
      </li>
    )
    
  }
}

// More detailed comment component used when the user is in the Landscape view. Displays all replies, likes, and the time since it was posted.
class FullComment extends React.Component {
  constructor(props) {
    super(props)
    this.data = props["data"];
    this.state = { image: require( this.data.liked ? ("./icons/liked.PNG"):("./icons/like.PNG")) }
    this.likeInteraction = this.likeInteraction.bind(this);
  }

  // Interact with the like button. Will flip the current state of your like on the post.
  likeInteraction() {
    let comment = JSON.parse(localStorage.getItem(this.props.data.postId));
    if (comment.liked) {
      comment.liked = false;
      comment.likes -= 1;
      localStorage.setItem(this.props.data.postId, JSON.stringify(comment));

      // Use the components setState function in order to signal a re-render and update the like image.
      this.setState( {
        image: require("./icons/like.PNG")
      });

      this.data = localStorage.getItem(this.props.data.postId);
    }
    else {
      comment.liked = true;
      comment.likes += 1;
      localStorage.setItem(this.props.data.postId, JSON.stringify(comment));

      // Use the components setState function in order to signal a re-render and update the like image.
      this.setState( {
        image: require("./icons/liked.PNG")
      });
      
      this.data = localStorage.getItem(this.props.data.postId);
    }
  }
  
  render() {
    let comment = JSON.parse(localStorage.getItem(this.props.data.postId));
    let replies = this.props.replies;
    let classes = this.props.replies ? "Full-comment Comment-reply" : "Full-comment";
    return (
      <li className={classes} id={comment.postId} key={comment.postId}>
        <div className="Full-comment-main">
          <img id="Comment-picture" src={comment.picture} alt="Commenter Icon"></img>
          
          <div id="Full-comment-content">
            <div id="Full-comment-row-one">
              <p id="Full-comment-body">
                <b className="Comment-poster">{comment.user}</b>
                <span className="Comment-content">&nbsp;{comment.content}</span>
                </p>
            </div>
            <div id="Full-comment-row-two">
              <p>
                <span>1d  </span>
                {
                  // This double conditional decides what should be displayed for a comments likes. It determines the correct plurar and
                  // whether or not we should render the likes counter at all.
                }
                <span> {comment.likes === 1 ? (comment.likes + " Like") : (comment.likes === 0 ? "" : (comment.likes + " Likes"))}</span>

                {
                  // If the comment is a child reply, then we will setReply with the parent's id instead. This is to follow how Instagram
                  // displays and organizes comments and replies to existing replies.
                }
                <button className="P-button"  onClick={function () {
                  setReply((replies ? comment.parentId : comment.postId), ("@" + comment.user));
                }}>Reply</button>
              </p>
            </div>
            {
              // If there are no replies, we won't display the "View Replies" button 
            }
            <div id="Full-comment-row-three" style={(comment.replies.length === 0 || this.props.replies) ?  {display:"none"} : {display:"auto"}}>
              <details id="Full-comment-details">
                <summary data-closed={`— View Replies (${Object.keys(comment.replies).length})`} data-opened="— Hide Replies"></summary>
                <LandscapeComments comments={comment.replies} replies={true}/>
              </details>
            </div>
          </div>
          
          <button className="Comment-like" onClick={this.likeInteraction}>
            <img src={this.state.image} alt="Like Comment Button"></img>
          </button>
        </div>
      </li>      
    )
    
  }
}

// Container component for all the preview comments in the normal portrait view.
class PreviewComments extends React.Component {

  render() {
    const outComments = [];
    let previewCounter = 0;

    // Generate up to 3 preview comments to show in the portrait view. Any non-parent comments are skipped.
    for (let i = 0; (i < localStorage.length) && (previewCounter < 3); i++) {
      let pid = localStorage.key(i);
      let comment = localStorage.getItem(pid);
      if (comment !== null && JSON.parse(comment).parent) {
        outComments.push(<PreviewComment data={JSON.parse(comment)} key={pid}/>);
        previewCounter += 1;
      }
    }
    
    // Simply return the generated listings within the <ul> element.
    return (
      <ul id="Comments-container">
        {outComments}
      </ul>
    )
  }
}

// Container component for all the full comments in the fullscreen landscape view.
class LandscapeComments extends React.Component {

  render() {
    const outComments = [];
    // If the comment is a parent comment, then we will generate it as normal initially, and then call <Landscape Comments/> once more for all of it's replies
    if (!this.props.replies) {
      for (let i = 0; i < localStorage.length; i++) {
        let pid = localStorage.key(i);
        let comment = localStorage.getItem(pid);
        if (comment !== null && JSON.parse(comment).parent) outComments.push(<FullComment data={JSON.parse(comment)} key={pid} replies={this.props.replies}/>);
      }
    }
    // When generating child comments, we will have replies set to false so as not to infinitely recurse in comment generation.
    else {
      for (const pid of this.props.comments) {
        let comment = localStorage.getItem(pid);
        if (comment !== null && !JSON.parse(comment).parent) outComments.push(<FullComment data={JSON.parse(comment)} key={pid} replies={this.props.replies}/>);
      }
    }

    // Simply return the generated listings within the <ul> element.
    return (
      <ul id="Comments-container">
        {outComments}
      </ul>
    )
  }
}

// Function to handle replying to a comment. When the reply button is clicked below a comment, it will set the proper fields necessary
// to create the child comment properly. It also adds an @-tag for the user you are replying to in the input field.
function setReply(parent, atUser) {
  document.getElementById("Comment-create-landscape").setAttribute("data-replyparent", parent);
  document.getElementById("Comment-create-landscape").setAttribute("data-replyatuser", atUser);
  document.getElementById("Comment-create-landscape").value = atUser + " ";
  document.getElementById("Comment-create-landscape").focus();
}

// Function to handle creating posts in the Landscape view.
function handleReply(parent="", atUser="") {
  const date = Date.now(); 

  // A unique id is generated for each post made and used as the key within our database.
  let id = ("merryB" + date + Math.random(0, 255));

  // If there is a parent comment, then we add the new post's id to the parent's list of replies.
  if(parent !== "") {
    let parentPost = JSON.parse(localStorage.getItem(parent));
    parentPost.replies.push(id);
    localStorage.setItem(parent, JSON.stringify(parentPost));
  }

  // Pass it along to the basic submission function.
  submitPost("Comment-create-landscape", id, parent, atUser);
}

// The basic post submission function. Handles database updates and post object generation.
function submitPost(input, newId, parent="", atUser="") {

  // Prevent blank posts.
  if (document.getElementById(input).value.trim() === "") {
    return;
  }

  const date = Date.now(); 
  const comment = {
    user: "merryB",
    content: document.getElementById(input).value,
    date: date,
    picture: coat,
    postId: newId,
    likes: 0,
    replies: [],
    liked: false,
    parent: (parent === ""),
    parentId: parent
  };

  // Add the new post to the database.
  localStorage.setItem(newId, JSON.stringify(comment));
}

export default App;
