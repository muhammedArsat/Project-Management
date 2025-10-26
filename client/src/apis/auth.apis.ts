import axiosInstance from "./AxiosInstance";

export const signup = async (data: FormData) => {
  return axiosInstance.post("/auth/signup", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const signIn = async (data: { email: string; password: string }) => {
  return axiosInstance.post("/auth/signin", data);
};

export const userProfile = async () => {
  const res = await axiosInstance.get("/auth/user");
  return res.data;
};

export const signout = async () => {
  const res = await axiosInstance.post("/auth/signout");
  return res.data
};
