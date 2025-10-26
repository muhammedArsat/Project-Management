import Header from "../components/Header";
import { Outlet } from "react-router-dom";
const HeaderLayout = () => {
  return (
    <div className="flex flex-col ">
      <Header />
      <Outlet />
    </div>
  );
};

export default HeaderLayout;
