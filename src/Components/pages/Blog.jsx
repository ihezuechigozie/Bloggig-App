import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import { Link } from "react-router-dom";

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      setPosts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchPosts();
  }, []);

  return (
    <div className="container mt-0">
     
      <div className="d-flex justify-content-between align-items-center py-3">
      <Link to="/admin-signup">
         <button className="btn btn-primary px-4 py-2">Register as Admin</button>
      </Link>
        <Link to="/Login">
         <button className="btn btn-primary px-4 py-2">Login as Admin</button>
        </Link>
        <Link to="/Dashboard">
         <button className="btn btn-primary px-4 py-2">Visit Dashboard</button>
        </Link>
      </div>
       <center>
       <h2 className="mt-3">Blog Posts</h2>
      </center>
      {posts.map(post => (
        <div key={post.id} className="card mb-3 p-3 shadow-sm">
          <h5 className="text-primary">{post.title}</h5>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Blog;
