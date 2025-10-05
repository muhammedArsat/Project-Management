import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "../pages/Signin";
import SignUp from '../pages/Signup';
const Routepaths = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={< SignUp/>} />
      </Routes>
    </Router>
  );
};

export default Routepaths;
