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
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
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
    <div className="createPostPage">
      <button className="button is-primary"  onClick={() => { workPost(12);}}>Accept?</button>
      <div className="container is-max-desktop cpContainer">
        <h1>Create A Post</h1>
        <div className="inputGp">
          <label> Title:</label>
          <input
            placeholder="Title..."
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label> Company:</label>
          <input
            placeholder="Company Name..."
            onChange={(event) => {
              setCompany(event.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label> Post:</label>
          <textarea
            placeholder="Post..."
            onChange={(event) => {
              setPostText(event.target.value);
            }}
          />
        </div>
        <button className="button is-primary" onClick={createPost}> Submit Post</button>
      </div>
    </div>
  );
}

export default CreatePost;