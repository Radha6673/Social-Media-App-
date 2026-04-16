import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [desc, setDesc] = useState("");
  
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;

  const fetchPosts = async () => {
    if (!user || !user._id) {
      console.log("User data is not available yet.");
      return;
    }

    try {
      console.log("Fetching timeline for ID:", user._id);
      const res = await axios.get(`http://localhost:5000/api/posts/timeline/${user._id}`);
      setPosts(res.data.sort((p1, p2) => new Date(p2.createdAt) - new Date(p1.createdAt)));
    } catch (err) {
      console.log("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []); 
  
  const handlePost = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc,
    };
    try {
      await axios.post("http://localhost:5000/api/posts", newPost);
      setDesc(""); 
      fetchPosts(); 
      alert("Post shared successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div style={{ padding: "15px", fontFamily: "sans-serif", backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", backgroundColor: "white", padding: "10px", borderRadius: "10px", marginBottom: "20px" }}>
        <h2 style={{ color: "#1775ee", margin: 0 }}>POST</h2>
        <button onClick={handleLogout} style={{ padding: "5px 10px", cursor: "pointer", border: "none", borderRadius: "5px", backgroundColor: "#eb4034", color: "white" }}>Logout</button>
      </nav>

      {/* CREATE POST BOX */}
      <div style={{ backgroundColor: "white", padding: "15px", borderRadius: "10px", boxShadow: "0px 2px 5px rgba(0,0,0,0.1)", marginBottom: "20px" }}>
        <form onSubmit={handlePost}>
          <textarea 
            placeholder={`What's on your mind, ${user.username}?`}
            style={{ width: "100%", border: "none", outline: "none", fontSize: "16px", resize: "none" }}
            rows="3"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          />
          <hr style={{ margin: "10px 0", border: "0.5px solid #f0f2f5" }} />
          <button type="submit" style={{ backgroundColor: "#1775ee", color: "white", border: "none", padding: "7px 15px", borderRadius: "5px", fontWeight: "bold", cursor: "pointer" }}>
            Share
          </button>
        </form>
      </div>

      <h3>Feed</h3>
      {posts.length === 0 ? (
        <p style={{ textAlign: "center", color: "gray" }}>No posts yet</p>
      ) : (
        posts.map((p) => (
          <div key={p._id} style={{ backgroundColor: "white", padding: "15px", borderRadius: "10px", marginBottom: "15px", boxShadow: "0px 1px 3px rgba(0,0,0,0.1)" }}>
            <p style={{ fontWeight: "bold", marginBottom: "5px", color: "#1775ee" }}>{p.userId === user._id ? "You" : "Someone"}</p>
            <p style={{ fontSize: "16px" }}>{p.desc}</p>
            <div style={{ marginTop: "10px", borderTop: "1px solid #f0f2f5", paddingTop: "10px", display: "flex", gap: "15px" }}>
              <button style={{ background: "none", border: "none", color: "#65676b", cursor: "pointer" }}>Like ({p.likes.length})</button>
              <button style={{ background: "none", border: "none", color: "#65676b", cursor: "pointer" }}>Comment</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
