import React, { useEffect, useState, useCallback } from 'react'
import {getDocs, collection, deleteDoc, doc, addDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../firebase-config';


function Home({ isAuth }) {


  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts")
  const [workerList, setWorkerList] = useState("");

  const deletePost = useCallback(async (e) => {
    const postDoc = doc(db, "posts", e);
    await deleteDoc(postDoc);
  }, []);


useEffect(() => {
const getPosts = async () => {
try {
const data = await getDocs(postsCollectionRef);
setPostList(data.docs.map((doc) => ({ ...doc.data(), e: doc.id })));
const worker = await getDocs(workCollectionRef);
setWorkerList(worker.docs.map((doc) => ({...doc.data()})) );

} catch (error) {
console.log(error);
}
};
getPosts();
}, [deletePost]);

const [wSatus, setWStatus] = useState("");
const workCollectionRef = collection(db, "workers");


const workPost = async (e) => {
  setWStatus(true)
  await addDoc(workCollectionRef, {
    e,
    wSatus,
    author: { name: auth.currentUser.displayName, photo: auth.currentUser.photoURL, id: auth.currentUser.uid },
  });
};

  useEffect(() => {
    const getWorker = async () => {
      const worker = await getDocs(workCollectionRef);
      setWorkerList(worker.docs.map((doc) => ({...doc.data(), id: doc.id})) );
    };
    getWorker();
  }, [])


  const submitWork = async (e) => {
    await updateDoc(workCollectionRef, {
      wSatus: false
    });
  };


  return (
    <div className="hero-body">
      {postLists.map((post) => {
        return (
  <div class="hero-body">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-full">
          <div className="box">





          <div class="columns is-centered">
    <img className="image is-128x128" src={post.author.photo} />
</div>
<hr class="login-hr"></hr>

          <div className="columns">
  <div className="column title is-three-fifths">{post.title}</div>
  <div className="column">                {isAuth && post.author.id === auth.currentUser.uid && (
                  <button className="button is-danger"
                    onClick={() => {
                      deletePost(post.e);
                    }}
                  >
                    Delete
                  </button>
                )}</div>
                  <div className="column">  
                  <button className="button is-sucess"  onClick={() => {workPost(post.e);}}>Accept</button>
                  </div>
                
                </div>
  <div className="columns">    
  <div className="column"> 
              <h3>@{post.author.name}</h3>
              
              
              </div> </div>
              {post.postText}
            <hr></hr>


      {workerList.map((worker) => {return ( <>{worker.e === post.e && (<>
                  
                  
        <article className="media">
  <figure className="media-left">
 
      <img className="is-rounded image is-48x48" src={worker.author.photo} />
   
  </figure>
  <div className="media-content">
    <div className="content">
 
                  
                  <h5>@{worker.author.name} is working on it</h5><hr></hr>
                  
                  
              
    </div>
    </div>





    <div className="media-right">                {isAuth && worker.author.id === auth.currentUser.uid && (


<div class="file">
  <label class="file-label">
    <input onClick={() => {workPost(post.e);}} class="file-input" type="file" name="submitVideo"/>
    <span class="file-cta">
      <span class="file-label">
        Submit
      </span>
    </span>
  </label>
</div>

                )}</div>



</article>
                  
                  
                  
                  </>)}</>)})}


            </div>
            </div> 
            </div>
          </div>
          </div>
        );
      })}
    </div>
  )
}

export default Home