import axiosInstance from "./AxiosInstance";

interface FindUsersParams {
  page: number;
  search?: string;
  limit?: number;
  sortBy ?:string,
  orderBy?:string
}

export const findAllUsers = async ({
  page,
  search,
  limit = 10,
  sortBy,
  orderBy
}: FindUsersParams) => {
  const res = await axiosInstance.get(`/users?page=${page}&search=${search}&limit=${limit}&sortBy=${sortBy}&orderBy=${orderBy}`);
  console.log("API Response:", res.data); // Debug log
  return res.data;
};
