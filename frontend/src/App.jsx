import { BrowserRouter as Router, Routes, Route , Navigate} from "react-router-dom";
import Signup from "./Pages/Signup"; 
import Login from "./Pages/Login";
import Home from "./Pages/Home";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/register" />} />
        
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        
        <Route path="/register" element={user ? <Navigate to="/" /> : <Signup />} />
      </Routes>
    </Router>
  );
}


export default App;

