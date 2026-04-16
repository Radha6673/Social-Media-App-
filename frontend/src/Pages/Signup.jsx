import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const user = { username, email, password };
    try {
      await axios.post("http://localhost:5000/api/auth/register", user);
      alert("Registration Successful!");
      navigate("/login"); 
    } catch (err) {
      console.log(err.response.data);
      //alert("error: "+JSON.stringify(err.response.data));
    }
  };

  return (
    <div style={{ padding: "50px", textAlign: "center", fontFamily: "sans-serif" }}>
      <h2 style={{ color: "#1775ee" }}>Create Account</h2>
      <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: "15px", maxWidth: "300px", margin: "0 auto" }}>
        <input 
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          placeholder="Username" 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <input 
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          type="email" 
          placeholder="Email" 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          type="password" 
          placeholder="Password" 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button 
          type="submit" 
          style={{ padding: "10px", backgroundColor: "#1775ee", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
