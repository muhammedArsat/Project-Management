import {
  User,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  Lock,
  ImageIcon,
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { signup } from "../apis/auth.apis";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

const Register = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [authForm, setAuthForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    profile: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "file" && e.target.files) {
      setAuthForm({
        ...authForm,
        profile: e.target.files[0],
      });
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setAuthForm({
        ...authForm,
        [e.target.name]: e.target.value,
      });
    }
  };

  const mutation = useMutation({
    mutationFn: (formData: FormData) => signup(formData),
    onSuccess: (data) => {
      toast.success("Signup successful");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Server error");
    },
  });

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    if (authForm.password.length < 6) {
      toast.error("Password must be more than 6 character");
      return;
    }

    if (authForm.password !== authForm.confirmPassword) {
      // setPasswordError("Confirm password is mis matched");
      toast.error("Confirm password is mis matched");
      return;
    }

    const formData = new FormData();
    formData.append("email", authForm.email);
    formData.append("name", authForm.name);
    formData.append("password", authForm.password);

    if (authForm.profile) {
      formData.append("profile", authForm.profile);
    }

    mutation.mutate(formData);
  };

  useEffect(() => {
    setTimeout(() => {
      setPasswordError("");
    }, 1500);
  }, [passwordError]);

  return (
    <div className="flex justify-center items-center min-h-svh p-2 lg:p-0">
      <div className="hidden lg:flex flex-col basis-7/12 bg-action min-h-screen rounded-r-lg  shadow-xl lg:shadow-none"></div>
      <form
        onSubmit={handleSignup}
        className="flex flex-col space-y-4 items-center p-2 lg:basis-5/12 shadow-xl lg:shadow-none w-full"
      >
        <h2>Register Here</h2>
        <h5 className="text-center">
          Create a new account to manage projects and tasks with the team
        </h5>
        <div className="w-[70%] ">
          <div className="input-box">
            <label htmlFor="profileImage">Profile Image</label>
            <div className="flex  gap-3  items-center ">
              <input
                type="file"
                accept="image/*"
                name="profileImage"
                className="input-base lg:basis-10/12"
                onChange={handleChange}
              />
              <span
                className={`absolute top-11 left-2 ${
                  imagePreview ? "top-[52px]" : "top-11"
                } `}
              >
                <ImageIcon strokeWidth={1} />
              </span>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Profile Preview"
                  className="mt-2 w-12 relative -top-1 h-12 rounded-full object-cover "
                />
              )}
            </div>
          </div>
          <div className="input-box">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="input-base"
              placeholder="E.g John Doe"
              value={authForm.name}
              onChange={handleChange}
              name="name"
              required
            />
            <span className="absolute top-11 left-2 ">
              <User strokeWidth={1} />
            </span>
          </div>
          <div className="input-box">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              className="input-base"
              placeholder="E.g, example@gmail.com"
              value={authForm.email}
              onChange={handleChange}
              required
            />
            <span className="absolute top-11 left-2 ">
              <Mail strokeWidth={1} />
            </span>
          </div>
          <div className="input-box">
            <label htmlFor="password">Password</label>
            <input
              type={isPasswordVisible ? "text" : "password"}
              className="input-base"
              placeholder="Min 6 characters"
              name="password"
              value={authForm.password}
              onChange={handleChange}
              required
            />
            <span className="absolute top-11 left-2 ">
              <Lock strokeWidth={1} />
            </span>
            <span
              className="absolute top-11 right-2 "
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              {!isPasswordVisible ? (
                <Eye strokeWidth={1} />
              ) : (
                <EyeOff strokeWidth={1} />
              )}
            </span>
            {passwordError && (
              <span className="text-left font-primary text-red-400">
                {passwordError}
              </span>
            )}
          </div>
          <div className="input-box">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="text"
              className="input-base"
              placeholder="Min 6 characters"
              value={authForm.confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
              required
            />
            <span className="absolute top-11 left-2 ">
              <ShieldCheck strokeWidth={1} />
            </span>
          </div>
          <div className="w-full mt-3">
            <button
              type="submit"
              className="action-button w-full flex items-center justify-center gap-2"
              disabled={mutation.status === "pending"}
            >
              {mutation.status === "pending" ? (
                <>
                  <Loader />
                </>
              ) : (
                "Sign up"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
