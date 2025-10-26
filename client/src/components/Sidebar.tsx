import { useContext, useState } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  FolderCode,
  SettingsIcon,
  LogOutIcon,
  Moon,
  User,
} from "lucide-react";
import {  useLocation, useNavigate } from "react-router-dom";
import { ThemeContext } from "../providers/ThemeProvider";
import { AuthContext } from "../providers/AuthProvider";
import { signout } from "../apis/auth.apis";
import toast from "react-hot-toast";
import ThemeButton from "./ThemeButton";

const Sidebar = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("toggleTheme must be used within ThemeProvider");
  }
  // const { toggleTheme, isDark } = context;
  console.log("Sidebar Rendered");
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const pathname = location.pathname;
  // console.log(pathname)

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      const res = await signout();
      if (res.success) {
        toast.success(res.message);
        navigate("/");
      }
    } catch (err) {
      toast.error(
        typeof err === "object" && err !== null && "message" in err
          ? (err as { message?: string }).message || "An error occurred"
          : String(err)
      );
    }
  };
  return (
    <div className=" ">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2  absolute top-2 left-2 z-50 bg-white dark:bg-transparent  "
        onClick={toggleSidebar}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-[54px] left-0 h-full bg-white dark:bg-neutral-800 dark:text-white shadow-lg z-40 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-[200px] w-[250px]`}
      >
        <div className="p-1 flex flex-col justify-between h-[calc(100vh-8vh)]">
          {/* Top navigation items remain same */}
          <ul className="mt-4 space-y-2 ">
            <li
              className={`hover:bg-action/70 active:bg-action/90 hover:text-white px-4 py-2 rounded flex items-center gap-2 ${
                pathname === "/dashboard" ? "bg-action text-white" : ""
              }`}
            >
              <LayoutDashboard strokeWidth={1.3} />
              Dashboard
            </li>
            <li className="hover:bg-action/70 active:bg-action/90 hover:text-white px-4 py-2  rounded flex items-center gap-2">
              <FolderCode strokeWidth={1.3} />
              Projects
            </li>
            {authContext?.auth.role === "ADMIN" && 
            <>
              <li className={`hover:bg-action/70 active:bg-action/90 hover:text-white px-4 py-2  rounded flex items-center gap-2  ${pathname === "/collaborators" ? "bg-action text-white" : ""}`} onClick={()=> navigate("/collaborators")}>
              <User strokeWidth={1.3} />
              Collaborators
            </li>
            </>

            }
            <li className="hover:bg-action/70 active:bg-action/90 hover:text-white px-4 py-2  rounded flex items-center gap-2">
              <SettingsIcon strokeWidth={1.3} />
              Settings
            </li>
          </ul>

          {/* Bottom section - Modified for better responsiveness */}
          <div className="space-y-3 pb-4">
            {/* Theme Toggle */}
            <ThemeButton />

            {/* Logout Button */}
            <button
              className="w-full font-heading cursor-pointer hover:bg-red-500/70 active:bg-red-500/90 hover:text-white px-4 py-2 rounded flex items-center gap-2"
              onClick={handleLogout}
            >
              <LogOutIcon strokeWidth={1.3} />
              <span className="">Logout</span>
            </button>

            {/* User Profile Section */}
            <div className="flex items-center border-t border-neutral-300 dark:border-neutral-700 gap-3 px-4 py-2 overflow-hidden">
              <div className="flex-shrink-0">
                <img
                  src={authContext?.auth.profile}
                  alt="profile"
                  className="rounded-full w-8 h-8 object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = "fallback-avatar-url";
                  }}
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm dark:text-neutral-300 text-neutral-700 truncate">
                  {authContext?.auth.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
