import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../FirebaseConfig";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null); // Track the post being edited
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    const postList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setPosts(postList);
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    if (editingPost) {
      await updateDoc(doc(db, "posts", editingPost.id), { title, content });
      setEditingPost(null); // Reset editing state
    } else {
      await addDoc(collection(db, "posts"), { title, content });
    }
    setTitle("");
    setContent("");
    await fetchPosts();  
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setTitle(post.title);
    setContent(post.content);
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
    setTitle("");
    setContent("");
  };

  const handleDeletePost = async (id) => {
    await deleteDoc(doc(db, "posts", id));
    await fetchPosts();  
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="container mt-1 Centered">
      <h2>Admin Dashboard</h2>
      <button className="btn btn-danger" onClick={handleLogout}>Logout</button>

      <form onSubmit={handleCreatePost} className="mt-2">
        <div className="mb-3">
          <label>Title</label>
          <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Content</label>
          <textarea className="form-control" value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
        </div>
        <button type="submit" className="btn btn-success">
          {editingPost ? "Update Post" : "Create Post"}
        </button>
        {editingPost && (
          <button type="button" className="btn btn-secondary ms-2" onClick={handleCancelEdit}>
            Cancel
          </button>
        )}
      </form>

      <h3 className="mt-4">Existing Posts</h3>
      {posts.map(post => (
        <div key={post.id} className="card mt-3 p-3">
          <h5>{post.title}</h5>
          <p>{post.content}</p>
          <button className="btn btn-primary me-2" onClick={() => handleEditPost(post)}>Edit</button>
          <button className="btn btn-danger" onClick={() => handleDeletePost(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
