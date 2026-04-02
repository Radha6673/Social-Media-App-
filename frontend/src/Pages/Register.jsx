import {useState} from "react";
import axios from "axios";

const Registet = () => {
  const[username , setusername] = useState("");
  const[email,setemail] = useState("");
  const[password,setpassword]=useState("");
  
  const handleregister = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post("http://localhost:5000/api/auth/register",{username email,password});
      alert("registration successfull.");
    }catch(err){
      console.log(err);
    }
  };
  
  return(){
    <div style =  {{margin:20px}}
     <h2>sign up</h2>
     <form onSubmit = {handleregister}>
       <input type="text" onChange
  }
}