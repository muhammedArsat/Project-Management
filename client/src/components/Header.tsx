import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { BellIcon, User } from "lucide-react";

const Header = () => {
  const context = useContext(AuthContext);

  

  if (!context || context.isLoading) {
    return null; // Show nothing while loading
  }
  // console.log(context.auth.profile)

  return (
    <div className="border-b border-neutral-200 dark:border-b dark:border-neutral-800 p-2 flex justify-between items-center">
      <h2 className="pl-11 md:pl-2">Team Spark</h2>
      <div className="flex justify-center items-center space-x-4">
        <BellIcon
          strokeWidth={1}
          className="bg-neutral-200 dark:bg-neutral-700 p-1 rounded-full w-8 h-8 hover:bg-neutral-100 active:bg-neutral-300 transition-all cursor-pointer"
        />
        {context?.auth.profile ? (
          <img
            src={context.auth.profile}
            alt="profile"
            loading="lazy"
            referrerPolicy="no-referrer"
            className="object-contain w-8 h-8 rounded-full cursor-pointer"
            onError={(e) => {
              e.currentTarget.style.display = "none"; // Hide the image if it fails to load
            }}
            onLoad={()=>{""}}
          />
        ) : (
          <User className="w-8 h-8 text-neutral-500" /> // Render the User icon as fallback
        )}
      </div>
    </div>
  );
};

export default Header;
