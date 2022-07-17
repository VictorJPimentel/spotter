import React, { useEffect, useState } from 'react'
import {getDocs, collection, deleteDoc, doc, addDoc, collection} from 'firebase/firestore'
import { auth, db } from '../firebase-config';


function Home({ isAuth }) {

  const [wSatus, setWStatus] = useState("");
  const [postLists, setPostList] = useState([]);
  const postCollectionRef = collection(db, "posts")
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postCollectionRef);
      setPostList(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    };
    getPosts();
  })

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
  };

  const postsCollectionRef = collection(db, "workers");

  const workPost = async (id) => {
    await addDoc(postsCollectionRef, {
      id,
      wSatus,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
  };




  return (
    <div className="homePage">
      {postLists.map((post) => {
        return (
          <div className="post">
            <div className="postHeader">
              <div className="title">
                <h1> {post.title}</h1>
              </div>
              <div className="deletePost">
                {isAuth && post.author.id === auth.currentUser.uid && (
                  <button
                    onClick={() => {
                      deletePost(post.id);
                    }}
                  >
                    {" "}
                    &#128465;
                  </button>
                )}
              </div>
            </div>
            <div className="postTextContainer"> {post.postText} </div>
            <div className="bottom-part">
            <h3>@{post.author.name}</h3><button                     onClick={() => { workPost(post.id);                    }}>Accept?</button>
            </div>
            <div className="post-working">
            <h5>@Pedro is working on it</h5>
            <hr></hr>
            <h5>@Pedro is working on it</h5>
            <hr></hr>
            <h5>@Pedro is working on it</h5>
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default Home