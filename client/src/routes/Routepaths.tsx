import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "../pages/Signin";
import SignUp from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import Collaborators from "../pages/Collaborators";
import ProtectedRoutes from "./ProtectedRoutes";
import HeaderLayout from "../layouts/HeaderLayout";
import SidebarLayout from "../layouts/SidebarLayout";

const Routepaths = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<HeaderLayout />}>
          <Route element={<SidebarLayout />}>
            <Route
              path="/dashboard"
              element={
                <ProtectedRoutes>
                  <Dashboard />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/collaborators"
              element={
                <ProtectedRoutes>
                  <Collaborators />
                </ProtectedRoutes>
              }
            />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default Routepaths;
