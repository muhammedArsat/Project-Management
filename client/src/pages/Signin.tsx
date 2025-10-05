import SignInIcon from "../assets/signin-icon.svg";
import GoogleIcon from "../assets/google-icon.svg";
import { Mail, LockIcon, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Loader from "../components/Loader";
const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handlePasswordVisible = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <div className="flex items-center p-2 md:p-0 justify-center min-h-svh ">
      <div className="flex flex-col space-y-2 p-2 absolute left-0 top-2">
        <h1 className="md:text-white">Team Spark</h1>
        <h5 className="md:text-neutral-100 pl-2">Plan. Track. Achieve</h5>
      </div>
      <div className="hidden md:flex flex-col space-y-4 justify-center items-center  bg-action min-h-screen basis-7/12 rounded-r-lg shadow-xl text-white">
        <h3 className="text-center px-4">
          Sign in to access your projects, collaborate with your team, and keep
          every task organized and efficient.
        </h3>
        <img src={SignInIcon} alt="signin icon" className="h-92" />
      </div>
      <form
        onSubmit={() => setIsLoading(!isLoading)}
        className="flex flex-col shadow-xl space-y-4 p-4 rounded-lg md:rounded-none justify-center items-center md:min-h-screen md:basis-5/12 "
      >
        <h3>Login</h3>
        <h4 className="text-neutral-700 text-center">
          Welcome back, sign in to manage your tasks
        </h4>

        <div className="input-box w-full md:w-[70%]">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="input-base"
            placeholder="E.g, example@gmail.com"
            required
          />
          <span className="absolute top-11 left-2">
            <Mail strokeWidth={1} />
          </span>
        </div>
        <div className="input-box w-full md:w-[70%]">
          <label htmlFor="password">Password</label>
          <input
            type={isPasswordVisible ? "text" : "password"}
            className="input-base"
            placeholder="Password"
            required
          />
          <span className="absolute top-11 left-2">
            <LockIcon strokeWidth={1} />
          </span>
          <span
            className="absolute top-11 right-2 cursor-pointer"
            onClick={handlePasswordVisible}
          >
            {!isPasswordVisible ? (
              <Eye strokeWidth={1} />
            ) : (
              <EyeOff strokeWidth={1} />
            )}
          </span>
        </div>
        <div className="md:w-[70%] w-full">
          <button
            type="submit"
            className="action-button w-full"
            onClick={() => setIsLoading(!isLoading)}
          >
            {isLoading ? <Loader /> : " Sign In"}
          </button>
        </div>
        <div className="w-full md:w-[70%] flex justify-end">
          <h6 className="underline font-primary font-light text-indigo-500 cursor-pointer">
            Forget password?
          </h6>
        </div>

        <div className="w-full md:w-[70%] flex justify-center items-center border rounded-lg p-2 hover:bg-neutral-300 dark:hover:bg-neutral-700 cursor-pointer border-neutral-200 transition-all">
          <span className="flex items-center gap-2">
            <img src={GoogleIcon} alt="google icon" className="w-7 h-7" />
            Sign in with Google
          </span>
        </div>

        <div className="w-full">
          <h6 className="font-primary font-light w-full text-center">
            New to Team spark?{" "}
            <span className="text-indigo-500 underline cursor-pointer">
              Create an account
            </span>
          </h6>
        </div>
      </form>
    </div>
  );
};

export default Login;
