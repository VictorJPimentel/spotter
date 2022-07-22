import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

function CreatePost({ isAuth }) {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [postText, setPostText] = useState("");

  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();

  const createPost = async () => {
    await addDoc(postsCollectionRef, {
      title,
      postText,
      company,
      author: { name: auth.currentUser.displayName, photo: auth.currentUser.photoURL, id: auth.currentUser.uid },
    });
    navigate("/");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, []);

  const [wSatus, setWStatus] = useState("");
  const workCollectionRef = collection(db, "workers");


  const workPost = async (id) => {
    setWStatus(true)
    await addDoc(workCollectionRef, {
      id,
      wSatus,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
  };

  return (
    // <div className="createPostPage">
    //   <div className="container is-max-desktop cpContainer">
    //     <h1>Create A Post</h1>
    //     <div className="inputGp">
    //       <label> Title:</label>
    //       <input
    //         placeholder="Title..."
    //         onChange={(event) => {
    //           setTitle(event.target.value);
    //         }}
    //       />
    //     </div>
    //     <div className="inputGp">
    //       <label> Company:</label>
    //       <input
    //         placeholder="Company Name..."
    //         onChange={(event) => {
    //           setCompany(event.target.value);
    //         }}
    //       />
    //     </div>
    //     <div className="inputGp">
    //       <label> Post:</label>
    //       <textarea
    //         placeholder="Post..."
    //         onChange={(event) => {
    //           setPostText(event.target.value);
    //         }}
    //       />
    //     </div>
    //     <button className="button is-primary" onClick={createPost}> Submit Post</button>
    //   </div>
    // </div>

    <section class="hero is-primary is-fullheight">
    <div class="hero-body">
      <div class="container">
      <div class="box">
        <div class="columns is-centered">
          <div class="column">
            <div class="container has-text-centered">
            <h3 class="title has-text-black">Post a Job</h3>
  <hr class="login-hr"></hr>
  <p class="subtitle has-text-black">Please post to a job to be done by workers!</p>
  </div>
  
          <div class="field">
                <label for="" class="label">Title</label>
                <div class="control has-icons-left">
                  <input type="Title" placeholder="Ex: Header" class="input" required onChange={(event) => {
                setTitle(event.target.value);
              }}/>
                  <span class="icon is-small is-left">
                    <i class="fa fa-envelope"></i>
                  </span>
                </div>
              </div>
  
              <div class="field">
                <label for="" class="label">Company</label>
                <div class="control has-icons-left">
                  <input type="Title" placeholder="Ex: Google, Tesla, Twitter, Amazon, Meta" class="input" required onChange={(event) => {
                setCompany(event.target.value);
              }}/>
                  <span class="icon is-small is-left">
                    <i class="fa fa-envelope"></i>
                  </span>
                </div>
              </div>
  
              <div class="field">
                <label for="" class="label">Job  Requirements</label>
                <div class="control has-icons-left">
                  <input type="Title" placeholder="Maximum a Paragraph." class="input" required onChange={(event) => {
                setPostText(event.target.value);
              }}/>
                  <span class="icon is-small is-left">
                    <i class="fa fa-envelope"></i>
                  </span>
                </div> 
              </div>
  
          <button className="button is-primary" onClick={createPost}> Submit Post</button>
          </div>
        </div>
      </div>
      </div>
    </div>
  </section> 

  );
}

export default CreatePost;


